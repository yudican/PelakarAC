import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {TouchableHighlight} from 'react-native';
// import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Card,
  Header,
  Icon,
  ListItem,
  Rating,
  SearchBar,
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class TokoDeatil extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      favorit: false,
      data: {},
      jasa: [],
      Data_jasa: {},
    };
  }

  componentDidMount() {
    this.handleGetFavorite();
    this.handleGetJasa();
  }

  handleGetJasa = async () => {
    const {uid_penyedia} = this.props.route.params;
    await this.firebaseRef
      .ref('Pengguna/Penyedia_Jasa/' + uid_penyedia)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          this.setState({
            data,
            jasa: data.Data_Jasa,
          });
        }
      });
  };

  handleGetFavorite = async () => {
    const {uid} = this.context.auth.user;
    const {uid_penyedia} = this.props.route.params;
    await this.firebaseRef
      .ref('Pengguna/Pelanggan/' + uid + '/Favorite/' + uid_penyedia)
      .on('value', (querySnapShot) => {
        let data = querySnapShot.val();
        if (data) {
          this.setState({
            favorit: true,
          });
        }
      });
  };

  handleFavoritBtn() {
    const {uid_penyedia} = this.props.route.params;
    if (this.state.favorit) {
      this.handleRemoveFavorite(uid_penyedia);
      this.setState({
        favorit: false,
      });
    } else {
      this.handleAddToFavorite(uid_penyedia);
      this.setState({
        favorit: true,
      });
    }
  }

  handleAddToCart = async (jasa, jasa_id) => {
    const {uid} = this.context.auth.user;
    const {addToCart, addJasaToCart} = this.context.app;
    const {uid_penyedia} = this.props.route.params;
    const {data} = this.state;
    const user = {
      merk: data.merk,
      nama: data.nama,
      alamat: data.alamat,
    };

    await this.firebaseRef
      .ref(`Pengguna/Pelanggan/${uid}/Keranjang/${uid_penyedia}/Data_Jasa`)
      .once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          addJasaToCart(jasa, jasa_id, uid_penyedia, uid);
          this.firebaseRef.ref().off();
        } else {
          addToCart(user, jasa, jasa_id, uid_penyedia, uid);
          this.firebaseRef.ref().off();
        }
      });
    // addToCart(user, jasa, jasa_id, uid_penyedia, uid);
  };

  handleRemoveFavorite = async (id) => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref('Pengguna/Pelanggan/' + uid + '/Favorite/' + id)
      .remove();
  };

  handleAddToFavorite = async (penyedia) => {
    const {uid} = this.context.auth.user;
    const {addToFavorite} = this.context.app;

    await this.firebaseRef
      .ref('Pengguna/Penyedia_Jasa/' + penyedia)
      .on('value', (snapshot) => {
        const data = snapshot.val();
        const newData = {
          nama: data.nama,
          alamat: data.alamat,
          spanduk: data.spanduk,
          no_telp: data.no_telp,
          merk: data.merk,
        };
        addToFavorite(newData, penyedia, uid);
      });
  };
  render() {
    const {data, jasa} = this.state;
    let jasaKey = jasa ? Object.keys(jasa) : {};
    const {navigation, route} = this.props;
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: data.nama,
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
        <SearchBar
          placeholder="Cari jasa di toko ini..."
          onChangeText={(value) =>
            this.setState({search: value}, console.log(this.state.search))
          }
          value={this.state.search}
          lightTheme
          showLoading
          inputStyle={{height: 40, borderRadius: 15, fontSize: 16}}
          inputContainerStyle={{
            borderRadius: 15,
            height: 30,
            backgroundColor: 'white',
          }}
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
                  <Text style={{color: 'rgba(0,0,0,0.4)', marginVertical: 5}}>
                    {data.alamat}
                  </Text>
                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text
                      style={{
                        color: '#ffd500',
                        fontWeight: '700',
                        fontSize: 12,
                      }}>
                      4.7/5
                    </Text>
                    <Rating
                      imageSize={14}
                      startingValue={4.7}
                      readonly
                      fractions={1}
                      style={{paddingHorizontal: 18}}
                      ratingColor="#ffdd00"
                    />
                  </View>

                  {/* <Text style={{color: 'rgba(0,0,0,0.9)'}}>
                    Jam Operasi : 10.00 - 20.00
                  </Text> */}
                </TouchableOpacity>

                <Icon
                  name={this.state.favorit ? 'favorite' : 'favorite-border'}
                  type="material"
                  color="red"
                  onPress={() => this.handleFavoritBtn()}
                  size={20}
                  raised
                  containerStyle={{right: 0, position: 'absolute'}}
                />
              </View>

              <Card.Divider></Card.Divider>
              {jasaKey.length > 0 ? (
                jasaKey.map((dataKey) => (
                  <TouchableOpacity>
                    <ListItem bottomDivider>
                      <ListItem.Title></ListItem.Title>
                      <ListItem.Content>
                        <ListItem.Title style={{fontSize: 14}}>
                          {jasa[dataKey].namaJasa}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{fontSize: 12}}>
                          Rp. {jasa[dataKey].hargaJasa}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Subtitle>
                        <Icon
                          raised
                          name="shoppingcart"
                          size={16}
                          type="antdesign"
                          color="#F18F37"
                          onPress={() =>
                            this.handleAddToCart(jasa[dataKey], dataKey)
                          }
                        />
                      </ListItem.Subtitle>
                    </ListItem>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>Nothing</Text>
              )}
            </Card>
          </View>
        </ScrollView>
        <Button
          label={'Hubungi Penyedia Jasa'}
          fillColor={'#2980b9'}
          onPress={() =>
            navigation.navigate('ChatDetail', {
              user_id: route.params.uid_penyedia,
            })
          }
        />
      </View>
    );
  }
}

const Button = ({label, fillColor, onPress}) => {
  return (
    <TouchableHighlight underlayColor={'#fff'} onPress={onPress}>
      <View style={{marginHorizontal: wp(3)}}>
        <View
          style={{
            backgroundColor: fillColor,
            paddingVertical: hp(1.5),
            marginBottom: hp(2),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: hp(1),
          }}>
          <Text style={{color: '#fff', fontSize: hp(2)}}>{label}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
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
    marginBottom: '5%',
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
    backgroundColor: 'green',
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
