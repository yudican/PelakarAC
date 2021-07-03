import database from '@react-native-firebase/database';
import React, {Component} from 'react';
// import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, CheckBox, Header, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';
import Qty from '../Components/Atoms/Qty';

export default class Cart extends Component {
  firebaseRef = database();
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      itemSelected: [],
      cart: [],
    };
  }

  componentDidMount() {
    this.handleGetCart();
  }

  handleCheckedBox(jasa, type, uid_penyedia, jasa_id = null) {
    const {uid} = this.context.auth.user;
    const {updateCart} = this.context.app;
    if (jasa) {
      if (type === 'all') {
        const data = {selectedAll: !jasa.selectedAll};

        jasa.map((itemKey) => {
          const data = {
            isSelected: !jasa.selectedAll,
          };
          updateCart(data, itemKey.uid, uid_penyedia, uid);
        });
        updateCart(data, jasa_id, uid_penyedia, uid, true);
      } else {
        const data = {isSelected: !jasa.isSelected};
        updateCart(data, jasa_id, uid_penyedia, uid);
      }
    }
  }

  handleGetCart = async () => {
    const {uid} = this.context.auth.user;

    await this.firebaseRef
      .ref(`Pengguna/Pelanggan/${uid}/Keranjang`)
      .on('value', (querySnapShot) => {
        if (querySnapShot.val()) {
          const carts = Object.keys(querySnapShot.val());
          const data = Object.values(querySnapShot.val());
          carts &&
            carts.map((key, i) => {
              const jasaKey = Object.keys(data[i].Data_Jasa);
              const jasa = Object.values(data[i].Data_Jasa);
              const dataJasa = jasaKey.map((key) => {
                return {
                  uid: key,
                  data: data[i].Data_Jasa[key],
                };
              });

              this.firebaseRef
                .ref('Pengguna/Penyedia_Jasa/' + key)
                .on('value', (snapshot) => {
                  const user = snapshot.val();
                  this.setState({cart: []});
                  this.setState((prevState) => ({
                    cart: [
                      ...prevState.cart,
                      {_uid: key, ...data[i], user, jasa: dataJasa},
                    ],
                  }));
                });
            });
        }
      });
  };

  updateQty = (value, jasa_id, uid_penyedia, type) => {
    const {uid} = this.context.auth.user;
    const {updateCart} = this.context.app;
    updateCart({jumlah: value}, jasa_id, uid_penyedia, uid);
  };

  render() {
    const {cart} = this.state;
    const {navigation} = this.props;
    return (
      <View>
        <Header
          centerComponent={{
            text: 'Keranjang',
            style: {
              color: 'white',
              fontFamily: 'arial',
              fontWeight: 'bold',
              fontSize: 17,
            },
          }}
          backgroundColor="#5D89F7"
          leftComponent={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="arrow-back" color="#fff" size={20} />
            </TouchableOpacity>
          }
        />
        {cart.length > 0 ? (
          cart.map((item) => (
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.labelTokoContainer}>
                <CheckBox
                  checked={item.selectedAll}
                  onPress={() =>
                    this.handleCheckedBox(item.jasa, 'all', item._uid, null)
                  }
                />
                <TouchableOpacity>
                  <Text style={styles.labelToko}>{item.user.nama}</Text>
                  <Text style={{color: 'rgba(0,0,0,0.4)'}}>
                    {item.user.merk}
                  </Text>
                </TouchableOpacity>
              </View>
              <Card.Divider></Card.Divider>
              {item.jasa.length > 0 ? (
                item.jasa.map(({data, uid}) => (
                  <TouchableOpacity>
                    <ListItem bottomDivider>
                      <ListItem.Title>
                        <CheckBox
                          checked={data.isSelected}
                          onPress={() =>
                            this.handleCheckedBox(
                              data,
                              'single',
                              item._uid,
                              uid,
                            )
                          }
                        />
                      </ListItem.Title>
                      <ListItem.Content>
                        <ListItem.Title style={{fontSize: 14}}>
                          {data.namaJasa}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{fontSize: 12}}>
                          Rp.{data.hargaJasa}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Content>
                        {/* Qty : {jasa[dataKey].jumlah} */}
                        <Qty
                          onPress={(value, type) =>
                            this.updateQty(value, uid, item._uid, type)
                          }
                          valueCount={data.jumlah}
                        />
                      </ListItem.Content>
                    </ListItem>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={{alignItems: 'center', paddingTop: '5%'}}>
                  <Text style={{color: 'rgba(0,0,0,0.5)'}}>
                    --Keranjang Kosong--
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('PesananLangsung', {
                    uid_penyedia: item._uid,
                  })
                }>
                <Text style={styles.buttonText}>Pesan</Text>
              </TouchableOpacity>
            </Card>
          ))
        ) : (
          <View style={{alignItems: 'center', paddingTop: '5%'}}>
            <Text style={{color: 'rgba(0,0,0,0.5)'}}>--Keranjang Kosong--</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelToko: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    borderRadius: 15,
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
});
