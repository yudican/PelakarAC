import React,{Component} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity,ScrollView,Dimensions,Text} from 'react-native'
import {Avatar,Header,Icon} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ChatDetail extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Asako Rakuda', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:18} }}
                    backgroundColor='#5D89F7'
                    containerStyle={{height:'10%'}}
                    leftComponent={
                        <View style={styles.headerContainer}>
                            <TouchableOpacity>
                                <Ionicons name="arrow-back" color="#fff" size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingHorizontal:10}}>
                                <Avatar source={{uri:'https://i.pinimg.com/474x/1b/b0/df/1bb0df650864f1e700a9be54d6f98842.jpg'}} 
                                rounded size={30} titleStyle={{color:'orange'}}/>
                            </TouchableOpacity>
                        </View>
                    }
                />
                <View style={styles.containerChatFunction}>
                    <TextInput
                        placeholder="Ketik pesan disini..."
                        style={styles.textInputBox}
                        multiline
                        maxLength={1000}
                        textAlignVertical= {'top'}
                        textBreakStrategy={'highQuality'}

                        numberOfLines={5}
                    />
                    <TouchableOpacity style={styles.sendButton}>
                        <Icon
                            name='send'
                            type='ionicons'
                            color='#5D89F7'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles=StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    textInputBox:{
        borderColor:'rgba(0,0,0,0.4)',
        borderWidth:0.3,
        borderRadius:20,
        width:'80%',
        height:35,
        marginHorizontal:10,
        marginVertical:7
    },
    sendButton : {
        paddingHorizontal:10,
        alignItems:'center',
        marginVertical:7
    },
    containerChatFunction :{
        flexDirection:'row',
        backgroundColor:'#fff',
        bottom:0,
        position:'absolute',
        width:'100%',
        height:50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        borderTopColor:'rgba(0,0,0,0.2)',
        borderWidth:0.3
    },
    fotoButton:{

    },
    headerContainer : {
        flexDirection:'row'
    }
})