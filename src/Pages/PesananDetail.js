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

export default class PesananDetail extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      // search:''
      uidPenyedia : '',
      noOder : '',
      penyedia_jasa : '',
      no_telpon : '',
      alamat : '',
      image : '',
      qty: '1',
      harga: 0,
      totalHarga: 0,
      biayaAdmin: null,
      status: 'Belum Dikonfirmasi',
      ulasan: '',
      rating : null,
      alasanPembatalan: 'Salah Pesan',
      catatan: '',
      dataJasa: [],
    };
  }

  componentDidMount() {
    this.handleGetOrder();
    // this.handleGetPesanan();
  }

  handleGetOrder = async () => {
    const {uid_penyedia, noOrder} = this.props.route.params;
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref(`Pengguna/Pesanan/${noOrder}`)
      .on('value', (snapshot) => {
        const data = snapshot.val() || {};
        if (data) {
          let jasaKey = Object.keys(data.Jasa);
          this.firebaseRef
                .ref(`Pengguna/Penyedia_Jasa/${uid_penyedia}`)
                .on('value', (snap) => {
                    const dataPenyedia = snap.val() ? snap.val() : {};

                  
                  
                  this.setState({
                      uidPenyedia : uid_penyedia,
                      noOder : noOrder,
                      totalHarga : data.totalHarga,
                      biayaAdmin : data.biayaAdmin,
                      status : data.status,
                      rating : data.rating,
                      ulasan : data.ulasan,
                      dataJasa: data.Jasa,
                      penyedia_jasa : dataPenyedia.nama,
                      alamat : dataPenyedia.alamat,
                      no_telpon : dataPenyedia.no_telp,
                      image : dataPenyedia.spanduk,
                      catatan : data.catatan,
                      ulasan : data.ulasan,
                      alasanPembatalan : data.alasanPembatalan
        
                    });
                  
                })

          
          
        }
      });
  };



  render() {
    // const totalHarga = parseInt(this.state.totalharga) + parseInt(this.state.biayaAdmin);
    const {navigation, route} = this.props;
    let {status, rating } = this.state;
    const total = Object.values(this.state.dataJasa).reduce((t, {jumlah}) => t + jumlah, 0)
    let jasaKey = Object.keys(this.state.dataJasa);

    console.warn(this.props.route.params)
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: `Pesanan No.${this.state.noOder}`,
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
          <ImageBackground
            source={{uri : this.state.image}}
            style={styles.header}>
            {/* <Image source={Logo} style={styles.logo} /> */}
          </ImageBackground>
          <View style={styles.container}>
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.labelTokoContainer}>
                <TouchableOpacity>
                  <Text style={styles.labelToko}>{this.state.penyedia_jasa}</Text>
                  <Text style={{color: 'rgba(0,0,0,0.4)'}}>
                    {this.state.alamat}
                  </Text>
                  <Text style={{color: 'rgba(0,0,0,0.9)'}}>{this.state.no_telpon}</Text>
                </TouchableOpacity>
              </View>

              <Card.Divider></Card.Divider>

              <ListItem bottomDivider>
                <ListItem.Content>
                  
                    {jasaKey.map((data) => (
                         <ListItem.Title style={{fontSize: 14}}>
                           {this.state.dataJasa[data].namaJasa}
                         </ListItem.Title>
                    ))}
                    
                 
                  <ListItem.Subtitle style={{fontSize: 12}}>
                    Rp.{this.state.totalHarga}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle>Qty : </ListItem.Subtitle>
                <ListItem.Subtitle>{total}</ListItem.Subtitle>
              </ListItem>
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
                <ListItem.Title>Rp. {this.state.totalHarga}</ListItem.Title>
              </ListItem>
              <Card.Divider></Card.Divider>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Subtitle>Status Pesanan : </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle
                  style={{
                    color:
                      this.state.status == 'Sudah Selesai'
                        ? 'green'
                        : this.state.status == 'Dibatalkan'
                        ? 'red'
                        : 'orange',
                  }}>
                  {this.state.status}
                </ListItem.Subtitle>
              </ListItem>
              <Card.Divider></Card.Divider>
              <TextInput
                editable={false}
                maxLength={500}
                multiline
                numberOfLines={5}
                placeholder="Tidak ada catatan"
                onChangeText={(value) => this.setState({catatan: value})}
                defaultValue={'"' + this.state.catatan + '"'}
                style={{paddingHorizontal: 20, color: 'black'}}
              />
      
              <Card.Divider></Card.Divider>

              {this.state.status='Sudah Selesai' && !this.state.rating==0 ?  (
                        <View>
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Subtitle>Rating : </ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Subtitle><Rating imageSize={18} startingValue={this.state.rating} readonly style={{paddingHorizontal:18}} ratingColor='#ffdd00'/></ListItem.Subtitle>
                            </ListItem>
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Subtitle>Ulasan : </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                            <View style={{padding:20}}>
                                <Text style={{color:'rgba(0,0,0,0.7)'}}>"{this.state.ulasan}"</Text>
                            </View>
                        </View> ) :(
                    this.state.status='Sudah Selesai' && this.state.ulasan==0 ? ( 
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Subtitle>Rating : </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Subtitle><Rating imageSize={18} startingValue={this.state.rating} readonly style={{paddingHorizontal:18}} ratingColor='#ffdd00'/></ListItem.Subtitle>
                        </ListItem> ):( 
                        <View></View>
                        )
                        )}
                        
                        {status === 'Dibatalkan' && (
                          <View>
                            <ListItem>
                                  <ListItem.Content>
                                      <ListItem.Subtitle>Alasan Pembatalan : </ListItem.Subtitle>
                                  </ListItem.Content>
                            </ListItem>
                            <View style={{padding:20}}>
                                <Text style={{color:'rgba(0,0,0,0.7)'}}>"{this.state.alasanPembatalan}"</Text>
                            </View>
                          </View>
                        )}
                        
              
              

              { status === 'Belum Dikonfirmasi' && (
                <View>
                <TouchableOpacity style={styles.button2} onPress={() =>
                  navigation.navigate('ChatDetail', {
                    user_id: route.params.uid_penyedia,
                  })
                }>
                    <Text style={styles.buttonText}>Tanya Tukang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('BatalkanPesanan', 
                    this.props.route.params
                )}>
                    <Text style={styles.buttonText}>Batalkan Pesanan</Text>
                </TouchableOpacity>
                </View> 
              )}

              { status === 'Dalam Proses' && (
                <View>
                <TouchableOpacity style={styles.button2} onPress={() =>
                  navigation.navigate('ChatDetail', {
                    user_id: route.params.uid_penyedia,
                  })
                }>
                    <Text style={styles.buttonText}>Tanya Tukang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('BatalkanPesanan', 
                    this.props.route.params
                )}>
                    <Text style={styles.buttonText}>Batalkan Pesanan</Text>
                </TouchableOpacity>
                </View> 
              )}
              {status === 'Dibatalkan' && (
                  <TouchableOpacity
                style={styles.button3}
                onPress={() =>
                  navigation.navigate('ChatDetail', {
                    user_id: route.params.uid_penyedia,
                  })
                }>
                <Text style={styles.buttonText}>Tanya Tukang</Text>
              </TouchableOpacity>
              )}
              {status === 'Sudah Selesai' && rating === 0 ? (
                 <View>
                    <TouchableOpacity style={styles.button2} onPress={() =>
                  navigation.navigate('ChatDetail', {
                    user_id: route.params.uid_penyedia,
                  })
                }>
                        <Text style={styles.buttonText}>Tanya Tukang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('TulisUlasan' , this.props.route.params)}>
                        <Text style={styles.buttonText}>Beri Rating dan Ulasan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button3}
                      onPress={() => navigation.navigate('Komplain', this.props.route.params)}
                    >
                        <Text style={styles.buttonText}>Komplain</Text>
                    </TouchableOpacity>
                </View>
              ) : null}

              {status === 'Sudah Selesai' && rating > 0 ? (
                 <View>
                    <TouchableOpacity style={styles.button2} onPress={() =>
                  navigation.navigate('ChatDetail', {
                    user_id: route.params.uid_penyedia,
                  })
                }>
                        <Text style={styles.buttonText}>Tanya Tukang</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.button3}
                      onPress={() => navigation.navigate('Komplain', this.props.route.params)}
                    >
                        <Text style={styles.buttonText}>Komplain</Text>
                    </TouchableOpacity>
                </View>
              ) : null}
        
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
    backgroundColor: 'red',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  button2: {
    width: '95%',
    backgroundColor: 'green',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  button3: {
    width: '95%',
    backgroundColor: '#ff3a03',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  button4: {
    width: '95%',
    backgroundColor: 'red',
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
