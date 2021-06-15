import React, { Component } from 'react';
// import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
import {View,TouchableOpacity,Image,ScrollView,Text,StyleSheet,TextInput,Button,ImageBackground,Dimensions} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Header, ListItem, Avatar, Card, CheckBox,Icon,SearchBar,Rating} from 'react-native-elements'
import ThemedListItem from 'react-native-elements/dist/list/ListItem';


export default class PesananLangsung extends Component {
    constructor(props){
        super(props)
        this.state={
            // search:''
            qty : '1',
            harga : 250000,
            totalHarga : 0,
            biayaAdmin:2500,
            status : 'Belum Dikonfirmasi',
            ulasan : 'Servisnya luar biasa mantap!! Tukangnya pun ramah',
            rating : 5,
            alasanPembatalan : 'Salah Pesan',
            catatan:'Sesuai Aplikasi aja ya bg'
        }
    }
    
    // handleQtyChange = (value) =>{
    //     // const qtySet = e*this.state.qty
    //     // this.setState({
    //     //     qty : qtySet
    //     // })
    //     console.log(value)
    // }
    // componentDidMount(){
    //     const qty = this.state.qty
    //     const harga = this.state.harga
    //     const totalHarga = parseInt(qty) * harga
    //     this.setState({
    //         totalHarga:totalHarga
    //     })
    //     console.log(totalHarga,qty,harga)
    // }
    
  render() {
      const totalHarga = parseInt(this.state.qty) * this.state.harga + this.state.biayaAdmin
    return (
      <View style={{flex:1}}>
          <Header
            centerComponent={{ text: 'Pesanan No.12011022', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
            backgroundColor='#5D89F7'
            leftComponent={
                <TouchableOpacity>
                    <Ionicons name="arrow-back" color="#fff" size={20}/>
                </TouchableOpacity>
            }
        />
        <ScrollView>
            <ImageBackground source={require('../Assets/Image/BerandaImage.png')} style={styles.header}>
                    {/* <Image source={Logo} style={styles.logo} /> */}
                </ImageBackground>
            <View style={styles.container}>
            
            <Card containerStyle={styles.cardContainer}>
                <View style={styles.labelTokoContainer}>
                    <TouchableOpacity>
                        <Text style={styles.labelToko}>Juan Pale</Text>
                        <Text style={{color:'rgba(0,0,0,0.4)'}}>Jl. Helvetia Raya No.8, Medan</Text>
                        <Text style={{color:'rgba(0,0,0,0.9)'}}>081278289090</Text>
                    </TouchableOpacity>
                </View>
                
                <Card.Divider></Card.Divider>
                    
                    <ListItem bottomDivider>
                        <ListItem.Content>
                        <ListItem.Title style={{fontSize:14}}>Paket Combo Cuci AC + Isi Freon AC 1/2PK R32</ListItem.Title>
                        <ListItem.Subtitle style={{fontSize:12}}>Rp.{this.state.harga}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Subtitle>Qty : </ListItem.Subtitle>
                        <ListItem.Subtitle>{this.state.qty}</ListItem.Subtitle>
                        {/* <ListItem.Subtitle>
                            <View style={{flexDirection:'row'}}>
                                <TextInput
                                    style={{width:30,borderWidth:1,height:40,borderRadius:5,fontSize:14,textAlign:'center',borderColor:'rgba(0,0,0,0.2)',margin:5}}
                                    defaultValue={this.state.qty}
                                    keyboardType="numeric"
                                    maxLength={3}
                                    onChangeText={(value)=>this.setState({qty:value})}
                                />
                            </View>
                        </ListItem.Subtitle> */}
                    </ListItem> 
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
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Subtitle>Status Pesanan : </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Subtitle style={{color:this.state.status=='Selesai'? 'green' : this.state.status=='Dibatalkan'? 'red' : 'orange'}}>{this.state.status}</ListItem.Subtitle>
                    </ListItem>
                    <Card.Divider></Card.Divider>
                    <TextInput 
                        editable={false}
                        maxLength={500}
                        multiline
                        numberOfLines={5}
                        placeholder='Tidak ada catatan'
                        onChangeText={(value)=>this.setState({catatan:value})}
                        defaultValue={'"'+this.state.catatan+'"'}
                        style={{paddingHorizontal:20,color:'black'}}
                    />
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Subtitle style={{color:'red'}}>Perhatian! Pesanan akan otomatis dibatalkan apabila belum dikonfirmasi dalam 1x24 jam</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    <Card.Divider></Card.Divider>


                    {/* {this.state.status='Sudah Selesai' && !this.state.rating==null? 
                        <View>
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Subtitle>Rating : </ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Subtitle><Rating imageSize={18} startingValue={this.state.rating} readonly style={{paddingHorizontal:18}} ratingColor='#ffdd00'/></ListItem.Subtitle>
                            </ListItem>
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Subtitle>Ulasan : </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                            <View style={{padding:20}}>
                                <Text style={{color:'rgba(0,0,0,0.7)'}}>"{this.state.ulasan}"</Text>
                            </View>
                        </View> :
                    this.state.status='Sudah Selesai' && this.state.ulasan==null? 
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Subtitle>Rating : </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Subtitle><Rating imageSize={18} startingValue={this.state.rating} readonly style={{paddingHorizontal:18}} ratingColor='#ffdd00'/></ListItem.Subtitle>
                        </ListItem> : 
                        <View></View>
                    } */}
                        {/* <ListItem>
                            <ListItem.Content>
                                <ListItem.Subtitle>Rating : </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Subtitle><Rating imageSize={18} startingValue={this.state.rating} readonly style={{paddingHorizontal:18}} ratingColor='#ffdd00'/></ListItem.Subtitle>
                        </ListItem> */}
                        {/* <ListItem>
                                <ListItem.Content>
                                    <ListItem.Subtitle>Alasan Pembatalan : </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                            <View style={{padding:20}}>
                                <Text style={{color:'rgba(0,0,0,0.7)'}}>"{this.state.alasanPembatalan}"</Text>
                            </View> */}
                    <TouchableOpacity style={styles.button3}>
                        <Text style={styles.buttonText}>Chat Pelanggan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.buttonText}>Konfirmasi Pesanan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button4}>
                        <Text style={styles.buttonText}>Tolak Pesanan</Text>
                    </TouchableOpacity>
            {/* {this.state.status=='Belum Dikonfirmasi' ? 
                <View>
                <TouchableOpacity style={styles.button2}>
                    <Text style={styles.buttonText}>Tanya Tukang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Batalkan Pesanan</Text>
                </TouchableOpacity>
                </View> : 
            this.state.status=='Dalam Proses' ? 
                <View>
                <TouchableOpacity style={styles.button2}>
                    <Text style={styles.buttonText}>Tanya Tukang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Batalkan Pesanan</Text>
                </TouchableOpacity>
                </View> :
            this.state.status=='Dibatalkan' ? 
                <TouchableOpacity style={styles.button2}>
                    <Text style={styles.buttonText}>Tanya Tukang</Text>
                </TouchableOpacity> :
            this.state.status=='Sudah Selesai' && !this.state.rating==null?
                <View>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.buttonText}>Tanya Tukang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button3}>
                        <Text style={styles.buttonText}>Beri Rating dan Ulasan</Text>
                    </TouchableOpacity>
                </View> : 
                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.buttonText}>Tanya Tukang</Text>
                    </TouchableOpacity>
            } */}
            {/* <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Batalkan Pesanan</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.button3}>
                <Text style={styles.buttonText}>Beri Rating dan Ulasan</Text>
            </TouchableOpacity> */}
            </Card>
            
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
        backgroundColor:'red',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13,
      },
      button2: {
        width:'95%',
        backgroundColor:'green',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13,
      },
      button3: {
        width:'95%',
        backgroundColor:'#ff3a03',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13,
      },
      button4: {
        width:'95%',
        backgroundColor:'red',
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