import database from '@react-native-firebase/database';
import React, {Component} from 'react';
// import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Header, ListItem, Rating} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';
import Qty from '../Components/Atoms/Qty';

export default class PesananLangsung extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      // search:''
      qty: '1',
      harga: 250000,
      totalHarga: 0,
      biayaAdmin: 2500,
      catatan: '',
      alamatAlternatif: '',
      data: {},
      jasa: [],
      user: {},
    };
  }

  componentDidMount() {
    this.handleGetJasa();
    this.handleGetUser();
    this.getAdminFee();
  }

  handleGetJasa = async () => {
    const {uid_penyedia} = this.props.route.params;
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref(`Pengguna/Pelanggan/${uid}/Keranjang/${uid_penyedia}`)
      .on('value', (snapshot) => {
        const data = snapshot.val() || {};
        if (data) {
          let jasaKey = Object.keys(data.Data_Jasa);
          this.setState((prevState) => ({
            totalHarga: 0,
          }));
          jasaKey.map((dataKey) => {
            if (data.Data_Jasa[dataKey]?.isSelected) {
              this.setState((prevState) => ({
                data,
                jasa: data.Data_Jasa,
                totalHarga:
                  parseInt(prevState.totalHarga) +
                  parseInt(data.Data_Jasa[dataKey].hargaJasa) *
                    parseInt(data.Data_Jasa[dataKey].jumlah) +
                  parseInt(prevState.biayaAdmin),
              }));
            }
          });
        }
      });
  };

  getAdminFee = async () => {
    await this.firebaseRef
      .ref(`Pengguna/Pengaturan`)
      .on('value', (snapshot) => {
        const data = snapshot.val() || {};
        if (data) {
          this.setState({biayaAdmin: data.biayaAdmin});
        }
      });
  };

  handleGetUser = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref(`Pengguna/Pelanggan/${uid}`)
      .on('value', (snap) => {
        const users = snap.val() || {};
        this.setState({
          user: users,
        });
      });
  };

  updateQty = (value, jasa_id, type, harga) => {
    const {uid} = this.context.auth.user;
    const {uid_penyedia} = this.props.route.params;
    const {updateCart} = this.context.app;

    // if (type === 'minus') {
    //   this.setState((prevState) => ({
    //     totalHarga: parseInt(prevState.totalHarga) - harga,
    //   }));
    // }
    updateCart({jumlah: value}, jasa_id, uid_penyedia, uid);
  };

  createOrder = () => {
    const {uid} = this.context.auth.user;
    const {uid_penyedia} = this.props.route.params;
    const {addOrderRequest, addNotification} = this.context.app;
    const {
      catatan,
      biayaAdmin,
      totalHarga,
      data,
      alamatAlternatif,
      user,
    } = this.state;
    const trxId = 'TRX-' + new Date().getTime();
    const noOrder = trxId;
    const dataOrder = {
      noOrder: trxId,
      catatan: catatan,
      biayaAdmin: biayaAdmin,
      totalHarga: totalHarga,
      tanggalPesan: new Date().getTime(),
      alamatAlternatif: alamatAlternatif,
      status: 'Belum Dikonfirmasi',
      rating: 0,
      ulasan: '',
      uidPelanggan: uid,
      uidPenyedia: uid_penyedia,
    };

    const notificationData = {
      noOrder: trxId,
      title: `Pesanan Masuk ${trxId}`,
      waktu: new Date().getTime(),
      nama: user.nama,
      profile_photo: user.profile_photo,
      isRead: false,
    };

    addOrderRequest(dataOrder, this.state.jasa, uid, uid_penyedia, trxId);
    addNotification(notificationData, uid_penyedia);
    this.firebaseRef
      .ref(`Pengguna/Pelanggan/${uid}/Keranjang/${uid_penyedia}`)
      .remove();

    this.props.navigation.navigate('PesananDetail', {uid_penyedia, noOrder});
  };

  render() {
    const {data, jasa, totalHarga} = this.state;
    let jasaKey = Object.keys(jasa);
    const {navigation, route} = this.props;
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: data.merk,
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 17,
            },
          }}
          backgroundColor="#5D89F7"
          leftComponent={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" color="#fff" size={20} />
            </TouchableOpacity>
          }
        />
        <ScrollView>
          <ImageBackground source={{uri: data.spanduk}} style={styles.header}>
            {/* <Image source={Logo} style={styles.logo} /> */}
          </ImageBackground>
          <View style={styles.container}>
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.labelTokoContainer}>
                <TouchableOpacity>
                  <Text style={styles.labelToko}>{data.merk}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#ffd500',
                        fontWeight: '700',
                        fontSize: 16,
                      }}>
                      4.7/5
                    </Text>
                    <Rating
                      imageSize={18}
                      startingValue={4.7}
                      readonly
                      fractions={1}
                      style={{paddingHorizontal: 18}}
                      ratingColor="#ffdd00"
                    />
                  </View>
                  <Text style={{color: 'rgba(0,0,0,0.4)'}}>{data.alamat}</Text>
                  <Text style={{color: 'rgba(0,0,0,0.9)'}}>
                    Jam Operasi : 10.00 - 20.00
                  </Text>
                </TouchableOpacity>
              </View>

              <Card.Divider></Card.Divider>
              <ScrollView>
                {jasaKey.length > 0 &&
                  jasaKey.map((dataKey) => (
                    <ListItem bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title style={{fontSize: 14}}>
                          {jasa[dataKey].namaJasa}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{fontSize: 12}}>
                          Rp.{jasa[dataKey].hargaJasa}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Content>
                        {/* Qty : {jasa[dataKey].jumlah} */}
                        <Qty
                          onPress={(value, type) =>
                            this.updateQty(
                              value,
                              dataKey,
                              type,
                              jasa[dataKey].hargaJasa,
                            )
                          }
                          valueCount={jasa[dataKey].jumlah}
                        />
                      </ListItem.Content>
                      {/* <ListItem.Subtitle>
                        <View style={{flexDirection: 'row'}}>
                          <TextInput
                            style={{
                              width: 30,
                              borderWidth: 1,
                              height: 40,
                              borderRadius: 5,
                              fontSize: 14,
                              textAlign: 'center',
                              borderColor: 'rgba(0,0,0,0.2)',
                              margin: 5,
                            }}
                            defaultValue={jasa[dataKey].jumlah}
                            keyboardType="numeric"
                            maxLength={3}
                            onChangeText={(value) =>
                              this.updateQty(value, dataKey)
                            }
                          />
                        </View>
                      </ListItem.Subtitle> */}
                    </ListItem>
                  ))}
                <Card.Divider></Card.Divider>
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Subtitle>Biaya Admin : </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Subtitle>
                    Rp. {this.state.biayaAdmin}
                  </ListItem.Subtitle>
                </ListItem>
                <Card.Divider></Card.Divider>
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Subtitle>Total Harga : </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Title>Rp. {totalHarga}</ListItem.Title>
                </ListItem>
              </ScrollView>
              <Card.Divider></Card.Divider>
              <TextInput
                editable
                maxLength={500}
                multiline
                numberOfLines={5}
                placeholder="Tulis Catatan (Opsional)"
                onChangeText={(value) => this.setState({catatan: value})}
                defaultValue={this.state.catatan}
                style={{paddingHorizontal: 20}}
              />
              <Card.Divider></Card.Divider>
              <TextInput
                editable
                maxLength={500}
                multiline
                numberOfLines={5}
                placeholder="Tulis Alamat Detail (Opsional)"
                onChangeText={(value) =>
                  this.setState({alamatAlternatif: value})
                }
                defaultValue={this.state.alamatAlternatif}
                style={{paddingHorizontal: 20}}
              />
              <Card.Divider></Card.Divider>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.createOrder()}>
                <Text style={styles.buttonText}>Pesan</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  labelToko: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    borderRadius: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: -windowHeight * 0.07,
  },
  cardContainer2: {
    borderRadius: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  labelTokoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '95%',
    backgroundColor: '#ff3a03',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
});
