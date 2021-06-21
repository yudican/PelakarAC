import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';
import PesananAktif from '../Components/PesananAktif/PesananAktif';

export default class Pesanan extends Component {
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
      const order = snapshot.val();
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

    console.log(pesanan);

    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{
            text: 'Riwayat Pesanan',
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
        <SearchBar
          placeholder="Cari riwayat pesanan disini ..."
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
          <View style={styles.pesananAktif}>
            <FlatList
              data={pesanan}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pesananAktif: {
    paddingTop: 3,
    paddingHorizontal: 10,
    backgroundColor: '#F6F6F6',
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
