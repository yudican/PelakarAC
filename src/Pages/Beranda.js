import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, Header, Icon, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import {RootContext} from '../Auth/Navigation/Context';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native';
import PesananAktif from '../Components/PesananAktif/PesananAktif';
import {limitData, orderData} from '../Utils/helper';
// import Carousel from '../Components/Carousel/Component/Carousel'
// import {dummyData} from '../Components/Carousel/data/data'

export default class Beranda extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pesanan: [],
    };
  }

  componentDidMount() {
    // this.handleGetProfile();
    this.handleGetPesanan();
  }

  handleGetPesanan = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef.ref('Pengguna/Pesanan').on('value', (snapshot) => {
      const order = snapshot.val() || {};
      const orderData = Object.values(order);

      const orders = orderData.filter(
        (itemOrder) => itemOrder.uidPelanggan === uid,
      );
      this.setState({pesanan: []});

      if (orders.length > 0) {
        orders.map((item) => {
          this.firebaseRef
            .ref('Pengguna/Penyedia_Jasa/' + item.uidPenyedia)
            .on('value', (snapshots) => {
              const seller = snapshots.val();
              // const items = Object.values(item)
              // console.log("data item" + items);
              this.setState((prevState) => ({
                pesanan: [
                  ...prevState.pesanan,
                  {
                    ...item,
                    merk: seller.merk,
                    uid_penyedia: item.uidPenyedia,
                  },
                ],
              }));
            });
        });
      }
    });
  };
  render() {
    const {pesanan} = this.state;
    const {navigation} = this.props;
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
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Notifikasi')}>
              <Ionicons name="notifications" color="#fff" size={20} />
            </TouchableOpacity>
          }
        />

        <Card containerStyle={{borderRadius: 12}}>
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() =>
                this.props.navigation.navigate('ListJasaTerdekat')
              }>
              <Icon reverse name="location" type="evilicon" color="#EC5C3F" />
              <Text style={{textAlign: 'center'}}>Terdekat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() =>
                this.props.navigation.navigate('ListJasaRekomendasi')
              }>
              <Icon reverse name="tag" type="evilicon" color="orange" />
              <Text style={{textAlign: 'center'}}>Rekomendasi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Favorite')}>
              <Icon reverse name="favorite" type="material" color="red" />
              <Text style={{textAlign: 'center'}}>Favorit</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Text style={styles.label}>Pesanan Aktif</Text>
        <ScrollView>
          <View style={styles.pesananAktif}>
            <FlatList
              data={limitData(orderData(pesanan))}
              renderItem={({item}) => (
                <PesananAktif
                  title={item.merk}
                  status={item.status}
                  date={item.noOrder}
                  onPress={() =>
                    navigation.navigate('PesananDetail', {
                      uid_penyedia: item.uid_penyedia,
                      noOrder: item.noOrder,
                    })
                  }
                />
              )}
            />
          </View>
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            right: 15,
            position: 'absolute',
            bottom: 10,
            zIndex: 1,
          }}>
          <Icon
            raised
            name="shoppingcart"
            type="antdesign"
            color="#F18F37"
            onPress={() => this.props.navigation.navigate('Keranjang')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pesananAktif: {
    paddingHorizontal: 8,
    backgroundColor: '#F6F6F6',
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  categoryBtn: {
    flex: 1,
    marginHorizontal: 0,
    alignItems: 'center',
    marginRight: 60,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'TitilliumWeb-Bold',
    color: 'green',
    marginLeft: 20,
    paddingBottom: 10,
  },
});
