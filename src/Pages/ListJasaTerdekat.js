import React, { Component } from 'react';
// import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
import {View,TouchableOpacity,Image,ScrollView,Text,StyleSheet,TextInput,Button,ImageBackground,Dimensions} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Header, ListItem, Avatar, Card, CheckBox,Icon,SearchBar} from 'react-native-elements'
import { RootContext } from '../Auth/Navigation/Context';
import database from '@react-native-firebase/database';

export default class ListJasaTerdekat extends Component {
static contextType = RootContext;
firebaseRef = database();
    
    constructor(props){
        super(props)
        this.state={
            search:'',
            jasa : []
        }
    }

    componentDidMount() {
    this.handleGetPenyediaJasa()
  }

  handleGetPenyediaJasa = async () => {
    this.firebaseRef.ref('/Pengguna/Penyedia_Jasa').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let jasa = {...data};
      this.setState({
        jasa,
      });
    });
  };

//   handleGetJasa = async (id_jasa) => {
//     const data = []
//     await this.firebaseRef
//       .ref('Pengguna/Data_Jasa/'+id_jasa)
//       .on('value', (snapshot) => {
//         let jasa= Object.values(snapshot.val());
//         data.push(jasa)        
//       });

//       return data
//   };

    
    
  render() {

    let jasaKey = Object.keys(this.state.jasa);

    jasaKey.map((key) => {
          
        console.log(this.state.jasa[key].Data_Jasa)
    })
    
    return (
      <View style={{flex:1}}>
          <Header
            centerComponent={{ text: 'Terdekat', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
            backgroundColor='#5D89F7'
            leftComponent={
                <TouchableOpacity>
                    <Ionicons name="arrow-back" color="#fff" size={20}/>
                </TouchableOpacity>
            }
        />
            <SearchBar
                    placeholder="Cari Toko Atau Jasa..."
                    onChangeText={(value)=>this.setState({search:value},console.log(this.state.search))}
                    value={this.state.search}
                    lightTheme
                    showLoading
                    inputStyle={{height:40, borderRadius:15, fontSize:16}}
                    inputContainerStyle={{borderRadius:15,height:30,backgroundColor:'white'}}
                />
            <ScrollView>
            <ImageBackground source={require('../Assets/Image/BerandaImage.png')} style={styles.header}>
                    {/* <Image source={Logo} style={styles.logo} /> */}
                </ImageBackground>

            <View style={styles.container}>
            {jasaKey.length > 0 ? (
                jasaKey.map(key => (
                    
                   <Card containerStyle={styles.cardContainer}>
                    <View style={styles.labelTokoContainer}>
                        <TouchableOpacity>
                            <Text style={styles.labelToko}>{this.state.jasa[key].nama}</Text>
                            <Text style={{color:'rgba(0,0,0,0.4)'}}>{this.state.jasa[key].alamat}</Text>
                            <Text style={{color:'rgba(0,0,0,0.9)'}}>Jam Operasi : 10.00 - 20.00</Text>
                        </TouchableOpacity>
                    </View>
                <Card.Divider></Card.Divider>
                {Object.keys(this.state.jasa[key].Data_Jasa).length > 0 ? (
                    Object.keys(this.state.jasa[key].Data_Jasa).map((dataKey) => (
                    <TouchableOpacity>
                    <ListItem bottomDivider>
                        <ListItem.Title> 
                        </ListItem.Title>
                        <ListItem.Content>
                        <ListItem.Title style={{fontSize:14}}>{this.state.jasa[key].Data_Jasa[dataKey].namaJasa}</ListItem.Title>
                        <ListItem.Subtitle style={{fontSize:12}}>Rp.75.000</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Subtitle>
                        <Icon
                            raised
                            name='shoppingcart'
                            size={16}
                            type='antdesign'
                            color='#F18F37'
                            onPress={() => console.log('This Is Shopping Cart')} />
                        </ListItem.Subtitle>
                    </ListItem> 
                </TouchableOpacity>
                )
                )) : (
                    <Text>Nothing</Text>
                ) 
                }
                
                    
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Lihat Toko</Text>
                    </TouchableOpacity>
                    
            </Card> 
                ))
            ) : (
                <Text>noting</Text>
            ) }
            
                
            
            </View>
            </ScrollView>
      </View>
    );
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container : {
        flex:1,
        height:'100%'
    },
    labelToko : {
        fontSize:16,
        fontWeight:'bold'
    },
    cardContainer :{
        borderRadius:15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginTop: -windowHeight * 0.07,
    }, 
    cardContainer2 :{
        borderRadius:15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    labelTokoContainer : {
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    button: {
        width:'95%',
        backgroundColor:'green',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13,
      },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    },
    header: {
        width: windowWidth,
        height: windowHeight * 0.3,
        paddingHorizontal: 30,
        paddingTop: 10,
      },
})