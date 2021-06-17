import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Avatar, Header, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootContext} from '../Auth/Navigation/Context';
import {chatTime, getChatFinalData, unique} from '../Utils/helper';
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
    this.handleGetOwnChat();
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
                const newChat = dataChat.map((chat) => {
                  if (chat.receiverId === uid) {
                    this.firebaseRef
                    .ref('Pengguna/Penyedia_Jasa/' + chat.senderId)
                    .on('value', (snapshot) => {
                      const data = snapshot.val() || {};
                        const user = {
                          name: data.nama,
                          avatar: data.profile_photo,
                          _id: chat.senderId,
                        };
                        this.setState((prevState) => ({
                          chatLists: [...prevState.chatLists, {...chat, user}],
                        }));
                      });
                  }
                  
                });
              });
            }
          });
        });
      }
    });
  };

  handleGetOwnChat = async () => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef.ref('Pengguna/Chat').on('value', (snapshot) => {
      if (snapshot.val()) {
        const chatId = Object.keys(snapshot.val());
        const chatLists = Object.values(snapshot.val());

        chatId.map((idChat) => {
          chatLists.map((item) => {
            const dataChat = Object.values(item);
            const newChat = dataChat.map((chat) => {
              if(chat.receiverId === uid){
              this.firebaseRef
                .ref('Pengguna/Pelanggan/' + chat.senderId)
                .on('value', (snapshot) => {
                  const data = snapshot.val() || {};
                  const user = {
                    name: data.nama,
                    avatar: data.profile_photo,
                    _id: chat.senderId,
                  };
                  this.setState((prevState) => ({
                    chatLists: [...prevState.chatLists, {...chat, user}],
                  }));
                });
              }
              
            });
          });
        });
      }
    });
  };

  render() {
    const {navigation} = this.props;
    const {chatLists} = this.state;
    const {uid} = this.context.auth.user;
    console.log(getChatFinalData(chatLists))
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
          data={unique(getChatFinalData(chatLists))}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatDetail', {
                  user_id:
                    item.senderId == uid ? item.receiverId : item.senderId,
                })
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
