import React,{Component} from 'react'
import Swipeable from 'react-native-swipeable'
import {Text,TouchableHighlight, View, TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Header, ListItem, Avatar,Icon} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
 
const rightButtons = [
  <TouchableHighlight>
    <Icon
      reverse
      name='trash'
      type='ionicon'
      color='red'
      size={22}
    />
  </TouchableHighlight>,
];
 
export default class Notifikasi extends Component{
  render(){
    return (
      <View>
        <Header
          centerComponent={{ text: 'Notifikasi', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
          backgroundColor='#5D89F7'
          leftComponent={
              <TouchableOpacity>
                  <Ionicons name="arrow-back" color="#fff" size={20}/>
             </TouchableOpacity>
            }
        />
      <ScrollView>
        <Swipeable  rightButtons={rightButtons}>
        <TouchableOpacity>
            <ListItem bottomDivider>
                <Avatar title='AT' rounded size='small' titleStyle={{color:'orange'}}/>
                <ListItem.Content>
                <ListItem.Title style={{fontSize:14}}>Adi Teguh</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:10}}>Pesanan Masuk</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle style={{fontSize:10}}>10 menit yang lalu</ListItem.Subtitle>
            </ListItem>
        </TouchableOpacity>
        </Swipeable>
        <Swipeable  rightButtons={rightButtons}>
        <TouchableOpacity>
            <ListItem bottomDivider>
            <Avatar source={{uri:'https://i.pinimg.com/474x/1b/b0/df/1bb0df650864f1e700a9be54d6f98842.jpg'}} 
                        rounded size='small' titleStyle={{color:'orange'}}/>
                <ListItem.Content>
                <ListItem.Title style={{fontSize:14}}>Asako Rakuda</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:10}}>Pesanan telah diselesaikan</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle style={{fontSize:10}}>20/07/2021</ListItem.Subtitle>
            </ListItem>
        </TouchableOpacity>
        </Swipeable>
        <Swipeable  rightButtons={rightButtons}>
        <TouchableOpacity>
            <ListItem bottomDivider>
                <Avatar source={{uri:'https://i.pinimg.com/474x/1b/b0/df/1bb0df650864f1e700a9be54d6f98842.jpg'}} 
                        rounded size='small' titleStyle={{color:'orange'}}/>
                <ListItem.Content>
                <ListItem.Title style={{fontSize:14}}>Asako Rakuda</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:10}}>Pesanan Masuk</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle style={{fontSize:10}}>19/07/2021</ListItem.Subtitle>
            </ListItem>
        </TouchableOpacity>
        </Swipeable>
        <View style={{alignItems:'center', paddingTop:'5%'}}>
          <Text style={{color:'rgba(0,0,0,0.5)'}}>--Tidak Ada Notifikasi Lagi--</Text>
        </View> 
      </ScrollView>
      </View>
    
  );
  }
}