import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Header, ListItem, Avatar} from 'react-native-elements';
import {RootContext} from '../Auth/Navigation/Context';
import database from '@react-native-firebase/database';
import {FlatList} from 'react-native';
import {chatTime, unique} from '../Utils/helper';
// import {Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base'

export default class ChatPages extends Component {
  static contextType = RootContext;
  firebaseRef = database();
  constructor(props) {
    super(props);

    this.state = {
      chatLists: [],
    };
  }

  componentDidMount() {
    // this.handleGetProfile();
    this.handleGetChat();
  }

  handleGetChat = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef.ref('Pengguna/Chat').on('value', (snapshot) => {
      if (snapshot.val()) {
        const chatId = Object.keys(snapshot.val());
        const chatLists = Object.values(snapshot.val());

        chatId.map((idChat) => {
          idChat.split('-').map((key) => {
            if (key === uid) {
              chatLists.map((item) => {
                const dataChat = Object.values(item);
                this.setState({
                  chatLists: dataChat,
                });
              });
            }
          });
        });
      }
    });
  };

  render() {
    const {navigation} = this.props;
    const {chatLists} = this.state;

    console.log(chatLists);
    return (
      <View>
        <Header
          centerComponent={{
            text: 'Pesan',
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

        <FlatList
          data={unique(chatLists)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatDetail', {user_id: item.receiverId})
              }>
              <ListItem bottomDivider>
                <Avatar
                  source={{
                    uri:
                      item.user.avatar ||
                      'https://i.pinimg.com/474x/1b/b0/df/1bb0df650864f1e700a9be54d6f98842.jpg',
                  }}
                  rounded
                  size="medium"
                  titleStyle={{color: 'orange'}}
                />
                <ListItem.Content>
                  <ListItem.Title>{item.user.name}</ListItem.Title>
                  <ListItem.Subtitle>{item.text}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle>
                  {chatTime(item.createdAt)}
                </ListItem.Subtitle>
              </ListItem>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
