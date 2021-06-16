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
 
export default class Favorite extends Component{
constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }


  render(){
    const {navigation} = this.props;
    return (
      <View>
        <Header
          centerComponent={{ text: 'Toko Favorit', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
          backgroundColor='#5D89F7'
          leftComponent={
              <TouchableOpacity
              onPress={() => navigation.goBack()}
              >
                  <Ionicons name="arrow-back" color="#fff" size={20}/>
             </TouchableOpacity>
            }
        />
      <ScrollView>
        <Swipeable  rightButtons={rightButtons}>
        <TouchableOpacity>
            <ListItem bottomDivider>
                <Avatar title='PA' rounded size='small' titleStyle={{color:'orange'}}/>
                <ListItem.Content>
                <ListItem.Title style={{fontSize:14}}>Panama AC</ListItem.Title>
                <ListItem.Subtitle>Jl. Hang Tuah No 5, Medan</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        </Swipeable>
        <Swipeable  rightButtons={rightButtons}>
        <TouchableOpacity>
            <ListItem bottomDivider>
                <Avatar title='CA' rounded size='small' titleStyle={{color:'orange'}}/>
                <ListItem.Content>
                <ListItem.Title style={{fontSize:14}}>Central AC</ListItem.Title>
                <ListItem.Subtitle>Jl. Asia No.5 Komplek Asia Mega Mas, Medan.</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        </Swipeable>
        <Swipeable  rightButtons={rightButtons}>
        <TouchableOpacity>
            <ListItem bottomDivider>
                <Avatar source={{uri:'data:image/jpeg;base64,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'}} 
                        rounded size='small' titleStyle={{color:'orange'}}/>
                <ListItem.Content>
                <ListItem.Title style={{fontSize:14}}>AQVA AC</ListItem.Title>
                <ListItem.Subtitle>Komplek Cemara Asri Blok C No.3, Medan.</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        </Swipeable>
      </ScrollView>
      </View>
    
  );
  }
}