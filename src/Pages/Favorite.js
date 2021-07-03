import React, {Component} from 'react';
import Swipeable from 'react-native-swipeable';
import {Text, TouchableHighlight, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Header, ListItem, Avatar, Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {RootContext} from '../Auth/Navigation/Context';
import database from '@react-native-firebase/database';

const rightButtons = [
  <TouchableHighlight>
    <Icon reverse name="trash" type="ionicon" color="red" size={22} />
  </TouchableHighlight>,
];

export default class Favorite extends Component {
  static contextType = RootContext;
  firebaseRef = database();

  constructor(props) {
    super(props);
    this.state = {
      favorite: {},
    };
  }

  componentDidMount() {
    this.handleGetFavorite();
  }

  handleGetFavorite = async () => {
    const {uid} = this.context.auth.user;
    console.log('uid', uid);
    await this.firebaseRef
      .ref('Pengguna/Pelanggan/' + uid + '/Favorite')
      .on('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let favorite = {...data};
        this.setState({
          favorite,
        });
        // console.log('User data: ', querySnapShot.val());
      });
  };

  handleRemoveFavorite = async (id) => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref('Pengguna/Pelanggan/' + uid + '/Favorite/' + id)
      .remove();
  };

  render() {
    const {navigation} = this.props;
    let favoriteKey = Object.keys(this.state.favorite);

    return (
      <View>
        <Header
          centerComponent={{
            text: 'Toko Favorit',
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
          {favoriteKey.length > 0 ? (
            favoriteKey.map((key) => (
              <Swipeable
                rightButtons={rightButtons}
                onRightActionRelease={() => this.handleRemoveFavorite(key)}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TokoDeatil', {uid_penyedia: key})
                  }>
                  <ListItem bottomDivider>
                    <Avatar
                      source={{uri: this.state.favorite[key].spanduk}}
                      rounded
                      size="small"
                      titleStyle={{color: 'orange'}}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={{fontSize: 14}}>
                        {this.state.favorite[key].merk}
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        {this.state.favorite[key].alamat}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                </TouchableOpacity>
              </Swipeable>
            ))
          ) : (
            <View style={{alignItems: 'center', paddingTop: '5%'}}>
              <Text style={{color: 'rgba(0,0,0,0.5)'}}>
                --Tidak Ada Favorit--
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
