import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
// import {Container,Item,Input,Button,Text,Fab} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Header,
  Card,
  ListItem,
  Icon,
  SearchBar,
  Button,
} from 'react-native-elements';
import PesananAktif from '../Components/PesananAktif/PesananAktif';

export default class Beranda2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusPembayaran: 'Perlu Dibayar',
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: 'Beranda',
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 17,
            },
          }}
          backgroundColor="#5D89F7"
          rightComponent={
            <TouchableOpacity>
              <Ionicons name="notifications" color="#fff" size={20} />
            </TouchableOpacity>
          }
          // containerStyle={{borderBottomEndRadius:20,borderBottomStartRadius:20}}
        />
        <ScrollView>
          <ImageBackground
            source={require('../Assets/Image/BerandaImage.png')}
            style={styles.header}>
            {/* <Image source={Logo} style={styles.logo} /> */}
          </ImageBackground>
          <Card
            containerStyle={
              ({position: 'absolute', width: '90%'}, styles.containerCard)
            }>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Pendapatan Bulan Ini : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>Rp.1.300.000</ListItem.Subtitle>
            </ListItem>
            <Card.Divider></Card.Divider>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>Biaya Admin Bulan ini : </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle>Rp.30.000</ListItem.Subtitle>
            </ListItem>
            <Card.Divider></Card.Divider>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>
                  Status Pembayaran Admin Bulan Ini :{' '}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Subtitle
                style={{
                  color:
                    this.state.statusPembayaran === 'Lunas'
                      ? 'green'
                      : this.state.statusPembayaran === 'Perlu Dibayar'
                      ? 'orange'
                      : 'red',
                }}>
                {this.state.statusPembayaran}
              </ListItem.Subtitle>
            </ListItem>
          </Card>

          <View style={styles.pesananAktif}>
            <Text style={styles.label}>Pesanan Belum Dikonfirmasi</Text>
            <PesananAktif
              title="Adi Teguh"
              status="Belum Dikonfirmasi"
              date="19/07/2021"
            />
            <PesananAktif
              title="Budi Pratama"
              status="Belum Dikonfirmasi"
              date="19/07/2021"
            />
            <PesananAktif
              title="Cici Novita"
              status="Belum Dikonfirmasi"
              date="19/07/2021"
            />
            <PesananAktif
              title="Daniel Posama"
              status="Belum Dikonfirmasi"
              date="19/07/2021"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  containerCard: {
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
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  logo: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.06,
  },
  hello: {
    marginTop: windowHeight * 0.03,
  },
  selamat: {
    fontSize: 24,
    fontFamily: 'TitilliumWeb-Regular',
  },
  username: {
    fontSize: 22,
    fontFamily: 'TitilliumWeb-Bold',
  },
  layanan: {
    paddingLeft: 30,
    paddingTop: 15,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'TitilliumWeb-Bold',
    color: 'orange',
  },
  iconCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  pesananAktif: {
    paddingHorizontal: 25,
    backgroundColor: '#F6F6F6',
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  categoryBtn: {
    flex: 1,
    marginHorizontal: 0,
    alignItems: 'center',
    marginRight: 60,
  },
});
