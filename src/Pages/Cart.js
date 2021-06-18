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
    if (type === 'all') {
      const data = {selectedAll: !jasa.selectedAll};
      const items = Object.keys(jasa.Data_Jasa);

      items.map((itemKey) => {
        const data = {
          isSelected: !jasa.selectedAll,
        };
        updateCart(data, itemKey, uid_penyedia, uid);
      });
      updateCart(data, jasa_id, uid_penyedia, uid, true);
    } else {
      const data = {isSelected: !jasa.isSelected};
      updateCart(data, jasa_id, uid_penyedia, uid);
    }
  }

  handleGetCart = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref(`Pengguna/Pelanggan/${uid}/Keranjang`)
      .on('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let cart = {...data};
        this.setState({
          cart,
        });
      });
  };

  updateQty = (value, jasa_id, uid_penyedia, type) => {
    const {uid} = this.context.auth.user;
    const {updateCart} = this.context.app;
    updateCart({jumlah: value}, jasa_id, uid_penyedia, uid);
  };

  render() {
    let cartKey = Object.keys(this.state.cart);
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
        {cartKey.length > 0 ? (
          cartKey.map((key) => (
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.labelTokoContainer}>
                <CheckBox
                  checked={this.state.cart[key].selectedAll}
                  onPress={() =>
                    this.handleCheckedBox(
                      this.state.cart[key],
                      'all',
                      key,
                      null,
                    )
                  }
                />
                <TouchableOpacity>
                  <Text style={styles.labelToko}>
                    {this.state.cart[key].nama}
                  </Text>
                  <Text style={{color: 'rgba(0,0,0,0.4)'}}>
                    {this.state.cart[key].merk}
                  </Text>
                </TouchableOpacity>
              </View>
              <Card.Divider></Card.Divider>
              {Object.keys(this.state.cart[key].Data_Jasa).length > 0 ? (
                Object.keys(this.state.cart[key].Data_Jasa).map((jasaKey) => (
                  <TouchableOpacity>
                    <ListItem bottomDivider>
                      <ListItem.Title>
                        <CheckBox
                          checked={
                            this.state.cart[key].Data_Jasa[jasaKey].isSelected
                          }
                          onPress={() =>
                            this.handleCheckedBox(
                              this.state.cart[key].Data_Jasa[jasaKey],
                              'single',
                              key,
                              jasaKey,
                            )
                          }
                        />
                      </ListItem.Title>
                      <ListItem.Content>
                        <ListItem.Title style={{fontSize: 14}}>
                          {this.state.cart[key].Data_Jasa[jasaKey].namaJasa}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{fontSize: 12}}>
                          Rp.{this.state.cart[key].Data_Jasa[jasaKey].hargaJasa}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Content>
                        {/* Qty : {jasa[dataKey].jumlah} */}
                        <Qty
                          onPress={(value, type) =>
                            this.updateQty(value, jasaKey, key, type)
                          }
                          valueCount={
                            this.state.cart[key].Data_Jasa[jasaKey].jumlah
                          }
                        />
                      </ListItem.Content>
                    </ListItem>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>Nothing</Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('PesananLangsung', {uid_penyedia: key})
                }>
                <Text style={styles.buttonText}>Pesan</Text>
              </TouchableOpacity>
            </Card>
          ))
        ) : (
          <Text>nothing</Text>
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
