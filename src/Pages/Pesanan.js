import React, { Component } from 'react'
import {View, Text, TouchableOpacity,RefreshControl,ScrollView,StyleSheet,Picker} from 'react-native'
import {Header,Card,ListItem,Icon,SearchBar} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PesananAktif from '../Components/PesananAktif/PesananAktif'

export default class Pesanan extends Component{
    constructor(props){
        super(props)
        this.state={
            search:''
        }

    }
    render(){
        
        return(
            <View style={{flex:1}}>
                <Header
                    centerComponent={{ text: 'Riwayat Pesanan', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
                    backgroundColor='#5D89F7'
                    rightComponent={
                      <TouchableOpacity>
                        <Ionicons name="notifications" color="#fff" size={20}/>
                      </TouchableOpacity>
                    }
                    // containerStyle={{borderBottomEndRadius:20,borderBottomStartRadius:20}}
                />
                <SearchBar
                    placeholder="Cari riwayat pesanan disini ..."
                    onChangeText={(value)=>this.setState({search:value},console.log(this.state.search))}
                    value={this.state.search}
                    lightTheme
                    showLoading
                    inputStyle={{height:40, borderRadius:15, fontSize:16}}
                    inputContainerStyle={{borderRadius:15,height:30,backgroundColor:'white'}}
                />
                <ScrollView>
                    <View style={styles.pesananAktif}>
                        <PesananAktif title="Asako Rakuda" status="Dalam Proses" date="19/07/2021"/>
                        <PesananAktif title="Ananda Jumpshot" status="Sudah Selesai" date="20/08/2020"/>
                        <PesananAktif title="Ari Poker" status="Dibatalkan" date="12/07/2020"/>
                        <PesananAktif title="Juan Pale" status="Sudah Selesai" date="10/05/2020"/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pesananAktif: {
        paddingTop:3,
        paddingHorizontal: 10,
        backgroundColor: '#F6F6F6',
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      },
})