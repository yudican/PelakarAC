import React,{Component} from 'react'
import {View,TouchableOpacity,Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Header, ListItem, Avatar} from 'react-native-elements'
// import {Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base'

export default class ChatPages extends Component{
    render(){
        return(
            <View>
                <Header
                    centerComponent={{ text: 'Pesan', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
                    backgroundColor='#5D89F7'
                    rightComponent={
                      <TouchableOpacity>
                        <Ionicons name="notifications" color="#fff" size={20}/>
                      </TouchableOpacity>
                    }
                    // containerStyle={{borderBottomEndRadius:20,borderBottomStartRadius:20}}
                />
                    <TouchableOpacity>
                    <ListItem bottomDivider>
                        <Avatar source={{uri:'https://i.pinimg.com/474x/1b/b0/df/1bb0df650864f1e700a9be54d6f98842.jpg'}} 
                        rounded size='medium' titleStyle={{color:'orange'}}/>
                        <ListItem.Content>
                        <ListItem.Title>Asako Rakuda</ListItem.Title>
                        <ListItem.Subtitle>Baik kak, segera di proses</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Subtitle>19:30</ListItem.Subtitle>
                    </ListItem>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem bottomDivider>
                        <Avatar title='JP' rounded size='medium' titleStyle={{color:'orange'}} containerStyle={{borderWidth:0.2}}/>
                        <ListItem.Content>
                        <ListItem.Title>Juan Pale</ListItem.Title>
                        <ListItem.Subtitle>Butuh tangga kak?</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Subtitle>20:30</ListItem.Subtitle>
                    </ListItem>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ListItem bottomDivider>
                        <Avatar title='AP' rounded size='medium' titleStyle={{color:'orange'}}  containerStyle={{borderWidth:0.2}}/>
                        <ListItem.Content>
                        <ListItem.Title>Ari Poker</ListItem.Title>
                        <ListItem.Subtitle>Maaf Kak, pesanan tidak dapat...</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Subtitle>10:30</ListItem.Subtitle>
                    </ListItem>
                </TouchableOpacity>
            </View>
        )
    }
}