import React,{Component} from 'react'
import {View,TextInput, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions} from 'react-native'
import {Header, Card, ListItem, Image} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    cardContainer : {
        borderRadius:15,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    textInputContainer :{
        borderRadius:20,
        paddingHorizontal:20,
        backgroundColor:'rgba(0,0,0,0.1)',
        marginTop:20
    },
    button : {
        width:'100%',
        backgroundColor:'green',
        borderRadius: 25,
        marginVertical:15,
        paddingVertical: 13,
    },
    button2 : {
        width:'100%',
        backgroundColor:'#f57327',
         borderRadius: 25,
          paddingVertical: 13,
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
    },
})

export default class PembayaranAdm extends Component { 
    render(){
        return(
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Pembayaran', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
                    backgroundColor='#5D89F7'
                    leftComponent={
                        <TouchableOpacity>
                            <Ionicons name="arrow-back" color="#fff" size={20}/>
                        </TouchableOpacity>
                        }
                />
                <ScrollView>
                <Card containerStyle={styles.cardContainer}>
                    <Card.Title>Upload Bukti Pembayaran</Card.Title>
                    <Card.Divider></Card.Divider>
                    <Image
                            source={{ uri: 'https://1.bp.blogspot.com/-MOHGve9IHeQ/XHvEjRpgyhI/AAAAAAAAIyQ/06yF5OyDDHQEwAqbc9SnzW7Sq0rx_RMdwCLcBGAs/s1600/IMG_20181120_064248_565.jpg' }}
                            style={{ width: '100%', height: 200 }}
                        />
                    <Card.Divider></Card.Divider>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.buttonText}>Pilih Gambar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Posting</Text>
                    </TouchableOpacity>
                </Card>
                <Card containerStyle={styles.cardContainer}>
                    <Card.Title>Info</Card.Title>
                    <Card.Divider></Card.Divider>
                    <Text style={{fontSize:14,marginBottom:15}}>Transfer ke nomor rekening dibawah ini : </Text>
                    <Text style={{color:'rgba(0,0,0,0.7)'}}>BCA : 0540820198</Text>
                    <Text style={{color:'rgba(0,0,0,0.7)'}}>Maybank : 10039475739</Text>
                    <Text style={{marginBottom:15,color:'rgba(0,0,0,0.7)'}}>BNI : 01923848391</Text>
                    <Card.Divider></Card.Divider>
                    <Text style={{color:'rgba(0,0,0,0.5)'}}>
                        Status pembayaran akan diperbaharui dalam waktu maksimal 1x24 jam. Apabila ketika sudah membayar namun status pembayaran belum diperbaharui, 
                        mohon hubungi admin melalui email : 
                    </Text>
                    <Text>
                        tukangac.app@gmail.com
                    </Text>
                </Card>
                </ScrollView>
            </View>
        )
    }
}