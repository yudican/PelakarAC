import React, { Component } from 'react';
import {View,TouchableOpacity,Image,ScrollView,Text,StyleSheet,TextInput,Button,ImageBackground,Dimensions} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Header, ListItem, Avatar, Card, CheckBox,Icon,SearchBar,Rating,AirbnbRating} from 'react-native-elements'

import database from '@react-native-firebase/database'
import {RootContext} from '../Auth/Navigation/Context';
import { FlatList } from 'react-native';


export default class Komplain extends Component{
    firebaseRef = database();
    static contextType = RootContext;


    constructor(props){
        super(props)
        this.state={
            // search:''
            qty : '1',
            harga : 0,
            totalHarga : 0,
            biayaAdmin: 0,
            penyedia_jasa : '',
            alamat : '',
            no_telpon : '',
            komplain:'',
            image : '',
            jasa : [],
            user : []
        }
    }

    componentDidMount() {
        this.handleGetOrder()
        this.handleGetUser()
    }

    handleGetOrder = async () => {
    const {uid_penyedia, noOrder} = this.props.route.params;
    console.warn(uid_penyedia)
    const {uid} = this.context.auth.user;
    await this.firebaseRef
      .ref(`Pengguna/Pesanan/${noOrder}`)
      .on('value', (snapshot) => {
        const data = snapshot.val() ? snapshot.val() : {};
        if (data) {
          let jasaKey = Object.keys(data.Jasa);
          this.firebaseRef
                .ref(`Pengguna/Penyedia_Jasa/${uid_penyedia}`)
                .on('value', (snap) => {
                    const dataPenyedia = snap.val() ? snap.val() : {};

                  this.setState({
                      
                      totalHarga : data.totalHarga,
                      biayaAdmin : data.biayaAdmin,
                      penyedia_jasa : dataPenyedia.nama,
                      image : dataPenyedia.spanduk,
                      alamat : dataPenyedia.alamat,
                      no_telpon : dataPenyedia.no_telp,
                      jasa:Object.values(data.Jasa)
                    });
                  
                })
        }
      });
  };


   handleGetUser = async()  => {
    const {uid} = this.context.auth.user;
    await this.firebaseRef
                .ref(`Pengguna/Pelanggan/${uid}`)
                .on('value', (snap) => {
                  const users = snap.val() || {};
                  this.setState({
                    user : users
                  })
                })
  }

  handlePosting = async () => {
    const {uid_penyedia, noOrder} = this.props.route.params;
    const {uid} = this.context.auth.user;
    const {addNotification} = this.context.app;
    
    await this.firebaseRef
      .ref(`Pengguna/Komplain/${uid_penyedia}`)
      .set({
        komplain: this.state.komplain,
        uid_pelanggan : uid,
        uid_penyedia : uid_penyedia,
        tanggal : new Date().getTime(),
        status : 'Pelanggan'

      })

      const {user} = this.state

        const notificationData = {
        noOrder: noOrder,
        title: this.state.komplain,
        waktu: new Date().getTime(),
        nama: user.nama,
        profile_photo: user.profile_photo,
        isRead: false,
        };

        
        addNotification(notificationData, uid_penyedia);
        
        this.props.navigation.goBack()
  }
    // ratingUpdate(rating){
    //     this.setState({
    //         rating: rating
    //     })
    // }

    render(){
        const { navigation } = this.props;
        const { totalHarga ,jasa} = this.state;

        console.warn(this.state.komplain)
        return(
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Pesanan No.12011022', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
                    backgroundColor='#5D89F7'
                    leftComponent={
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" color="#fff" size={20}/>
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <ImageBackground source={require('../Assets/Image/Toko1.jpg')} style={styles.header}>
                    </ImageBackground>
                    <View style={styles.container}>
                        <Card containerStyle={styles.cardContainer}>
                            <View style={styles.labelTokoContainer}>
                                <TouchableOpacity>
                                    <Text style={styles.labelToko}>{this.state.penyedia_jasa}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#ffd500',fontWeight:'700',fontSize:16}}>4.7/5</Text>
                                        <Rating imageSize={18} startingValue={4.7} readonly fractions={1} style={{paddingHorizontal:18}} ratingColor='#ffdd00'/>
                                    </View>
                                    <Text style={{color:'rgba(0,0,0,0.4)'}}>{this.state.alamat}</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <Card.Divider></Card.Divider>
                                
                                 <FlatList data={jasa} renderItem={({item}) => (
                                    <ListItem bottomDivider>
                                    <ListItem.Content>
                                    <ListItem.Title style={{fontSize:14}}>{item.namaJasa}</ListItem.Title>
                                    <ListItem.Subtitle style={{fontSize:12}}>Rp.{item.hargaJasa}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Subtitle>Qty : </ListItem.Subtitle>
                                    <ListItem.Subtitle>{item.jumlah}</ListItem.Subtitle>
                                   
                                </ListItem> 
                                )}/>
                                <Card.Divider></Card.Divider>
                                <ListItem>
                                    <ListItem.Content>
                                        <ListItem.Subtitle>Biaya Admin : </ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Subtitle>Rp. {this.state.biayaAdmin}</ListItem.Subtitle>
                                </ListItem>
                                <Card.Divider></Card.Divider>
                                <ListItem>
                                    <ListItem.Content>
                                        <ListItem.Subtitle>Total Harga : </ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Title>Rp. {totalHarga}</ListItem.Title>
                                </ListItem>
                                <Card.Divider></Card.Divider>
                                <TextInput 
                                    editable
                                    maxLength={1000}
                                    multiline
                                    numberOfLines={5}
                                    placeholder='Tulis Komplain'
                                    onChangeText={(value)=>this.setState({komplain:value})}
                                    defaultValue={this.state.komplain}
                                    style={{paddingHorizontal:20}}
                                />
                                <Card.Divider></Card.Divider>
                                <TouchableOpacity style={styles.button} onPress={() => this.handlePosting()}>
                                    <Text style={styles.buttonText}>Posting</Text>
                                </TouchableOpacity>
                        </Card>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles=StyleSheet.create({
    container:{
        flex:1,
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