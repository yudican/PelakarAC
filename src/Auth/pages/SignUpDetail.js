import {Icon, Picker} from 'native-base';
import React, {Component} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Card} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import {RootContext} from '../Navigation/Context';

const libraryOptions = {
  mediaType: 'photo',
  quality: 1,
  includeBase64: true,
};

export default class SignupDetail extends Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        nama: '',
        alamat: '',
        no_telp: '',
        provinsi: 'Sumatera Utara',
        kota: 'Medan',
        profile_photo: '',
        status: 'active',
      },
      file: {},
      provinsiList: [
        'Sumatera Utara',
        'Sumatera Selatan',
        'Sumatera Barat',
        'DKI Jakarta',
      ],
      kotaList: {
        SumateraUtara: [
          'Medan',
          'Pematang Siantar',
          'Tanjung Balai',
          'Tebing Tinggi',
          'Gunung Sitoli',
        ],
        SumateraSelatan: [
          'Kabupaten Banyuasin',
          'Kabupaten Empat Lawang',
          'Kota Palembang',
          'Kota Prabumulih',
        ],
        SumateraBarat: [
          'Bukit Tinggi',
          'Padang',
          'Padang Panjang',
          'Pariaman',
          'Payakumbuh',
          'Sawahlunto',
          'Solok',
        ],
        DKIJakarta: ['Kembang', 'Menteng', 'Kebayoran Baru', 'Cakung', 'Koja'],
      },
      keyKotaList: '',
    };
  }

  handleOnChangeProvinsi(prov) {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        provinsi: prov,
      },
    }));
  }
  handleOnChangeKota(kota) {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        kota,
      },
    }));
  }

  handleOnChangeText = (type, value) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [type]: value,
      },
    }));
  };

  handleSubmit = async () => {
    const {formData} = this.state;
    const {uid} = this.context.auth.user;
    const {registerDetail} = this.context.auth;

    registerDetail(formData, uid, this.props.navigation);
  };

  handleImageProfileSelected = async (data) => {
    const {uid} = this.context.auth.user;
    const {uploadImage} = this.context.app;
    if (data.assets.length > 0) {
      const file = data.assets[0].uri;
      const url = await uploadImage(file, `${uid}.jpg`, 'User/Profile');
      this.handleOnChangeText('profile_photo', url);
    }
  };

  render() {
    const {
      nama,
      alamat,
      no_telp,
      provinsi,
      kota,
      profile_photo,
    } = this.state.formData;
    return (
      <View style={styles.container}>
        {/* <ImageBackground source={require('../../Assets/Image/BerandaImage.png')} style={styles.header}>
                </ImageBackground> */}

        <View style={{alignItems: 'stretch', padding: '5%'}}>
          <Text style={{color: 'white'}}>Selamat Datang</Text>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Lengkapi Profilmu
          </Text>
        </View>

        <Card containerStyle={styles.cardContainer}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  launchImageLibrary(
                    libraryOptions,
                    this.handleImageProfileSelected,
                  )
                }>
                <Avatar
                  title="PA"
                  titleStyle={{color: 'orange'}}
                  source={{
                    uri:
                      profile_photo ||
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/120px-User-avatar.svg.png',
                  }}
                  size="large"
                  rounded
                  containerStyle={{marginTop: '5%', borderWidth: 0.1}}
                />
              </TouchableOpacity>
            </View>
            {/* <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'TitilliumWeb-Regular'}}>Lengkapi Datamu</Text> */}
            <View style={styles.containersignup}>
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Nama"
                placeholderTextColor="#ffffff"
                selectionColor="#fff"
                ref={(input) => (this.nama = input)}
                onSubmitEditing={() => this.merk.focus()}
                defaultValue={nama}
                onChangeText={(value) => this.handleOnChangeText('nama', value)}
              />

              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="No Handphone"
                keyboardType="number-pad"
                placeholderTextColor="#ffffff"
                ref={(input) => (this.noTelp = input)}
                defaultValue={no_telp}
                onChangeText={(value) =>
                  this.handleOnChangeText('no_telp', value)
                }
              />

              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Alamat"
                placeholderTextColor="#ffffff"
                defaultValue={alamat}
                onChangeText={(value) =>
                  this.handleOnChangeText('alamat', value)
                }
              />
              <Text>Provinsi</Text>
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#bdc3c7',
                  overflow: 'hidden',
                  width: '95%',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  marginVertical: 10,
                  fontSize: 14,
                }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Pilih Provinsi"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  backgroundColor="rgba(0,0,0)"
                  style={{color: 'white', padding: 0}}
                  borderRadius={15}
                  selectedValue={provinsi}
                  onValueChange={this.handleOnChangeProvinsi.bind(this)}>
                  {this.state.provinsiList.map((data) => (
                    <Picker.Item label={data} value={data} />
                  ))}
                </Picker>
              </View>
              <Text>Kota</Text>
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#bdc3c7',
                  overflow: 'hidden',
                  width: '95%',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  marginVertical: 10,
                  fontSize: 14,
                }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Pilih Kota"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  backgroundColor="rgba(0,0,0)"
                  style={{color: 'white', padding: 0}}
                  borderRadius={15}
                  selectedValue={kota}
                  onValueChange={this.handleOnChangeKota.bind(this)}>
                  {provinsi == 'Sumatera Utara'
                    ? this.state.kotaList.SumateraUtara.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))
                    : provinsi == 'Sumatera Selatan'
                    ? this.state.kotaList.SumateraSelatan.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))
                    : provinsi == 'Sumatera Barat'
                    ? this.state.kotaList.SumateraBarat.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))
                    : this.state.kotaList.DKIJakarta.map((data) => (
                        <Picker.Item label={data} value={data} />
                      ))}
                </Picker>
              </View>
              <Card.Divider></Card.Divider>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleSubmit()}>
                <Text style={styles.buttonText}>Daftar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Card>
      </View>
    );
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5D89F7',
    flex: 1,
    alignItems: 'center',
    // justifyContent :'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  loginButton: {
    color: '#5D89F7',
    fontSize: 16,
    fontWeight: '500',
  },
  containersignup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 12,
  },

  inputBox: {
    width: '95%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
    color: 'white',
    marginVertical: 10,
  },
  button: {
    width: '95%',
    backgroundColor: 'green',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  button2: {
    width: '95%',
    backgroundColor: '#F18F37',
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
  cardContainer: {
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  map: {
    height: 200,
  },
  mapContainer: {
    flex: 1,
    position: 'absolute',
  },
});
