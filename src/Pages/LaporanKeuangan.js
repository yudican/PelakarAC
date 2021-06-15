import React,{Component,useState} from 'react'
import {View,TextInput, Text, TouchableOpacity, ScrollView, StyleSheet ,Dimensions, Button} from 'react-native'
import {Header, Card, ListItem, Image} from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import {DatePicker} from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
    container:{
        flex:1,
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
export default class LaporanKeuangan extends Component{
    constructor(props){
        super(props)
        this.state={
            date:new Date(1598051730000),
            show:false,
            coba:''
        }
    }
    
    onChangeDate = (selectedDate) =>{
        this.setState({
            date : selectedDate
        })
        console.log(selectedDate)
    }
    handleShowDate(){
        if(this.state.show==false)
        {
            this.setState({
                show:true
            })
        }
        else{
            this.setState({
                show:false
            })
        }
    }

    render(){
        // const [date, setDate] = useState(new Date(1598051730000));
        // const [mode, setMode] = useState('date');
        // const [show, setShow] = useState(false);


        // const onChange = (event, selectedDate) => {
        //     const currentDate = selectedDate || date;
        //     setShow(Platform.OS === 'ios');
        //     setDate(currentDate);
        // };
          
        // const showMode = (currentMode) => {
        //     setShow(true);
        //     setMode(currentMode);
        // };
        
        // const showDatepicker = () => {
        //     showMode('date');
        //   };
        return(
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Laporan Keuangan', style: { color: 'white',fontFamily:'arial',fontWeight:'bold',fontSize:17} }}
                    backgroundColor='#5D89F7'
                    leftComponent={
                        <TouchableOpacity>
                            <Ionicons name="arrow-back" color="#fff" size={20}/>
                        </TouchableOpacity>
                        }
                />
                <ScrollView>
                <Card containerStyle={styles.cardContainer}>
                    <Card.Title style={{color:'green'}}>Keuangan Hari Ini</Card.Title>
                    <Card.Divider></Card.Divider>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Pendapatan : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>Rp. 750000</ListItem.Subtitle>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Total Transaksi : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>4</ListItem.Subtitle>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Total Biaya Admin : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>Rp. 10000</ListItem.Subtitle>
                    </ListItem>
                </Card>
                <Card containerStyle={styles.cardContainer}>
                    <Card.Title style={{color:'#ff602b'}}>Keuangan Bulan Ini</Card.Title>
                    <Card.Divider></Card.Divider>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Pendapatan : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>Rp. 5250000</ListItem.Subtitle>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Total Transaksi : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>25</ListItem.Subtitle>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Total Biaya Admin : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>Rp. 62500</ListItem.Subtitle>
                    </ListItem>
                </Card>
                <Card containerStyle={styles.cardContainer}>
                    <Card.Title style={{color:'#2b99ff'}}>Keuangan Tahun Ini</Card.Title>
                    <Card.Divider></Card.Divider>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Pendapatan : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>Rp. 22500000</ListItem.Subtitle>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Total Transaksi : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>142</ListItem.Subtitle>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Total Biaya Admin : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>Rp. 355000</ListItem.Subtitle>
                    </ListItem>
                </Card>

                <Card containerStyle={styles.cardContainer}>
                    <Card.Title>Filter Laporan</Card.Title>
                    <Card.Divider></Card.Divider>
                        <View>
                        <Button  title="Pilih Tanggal" onPress={this.handleShowDate.bind(this)}/>
                        </View>
                        {/* <View>
                            <Button onPress={showTimepicker} title="Show time picker!" />
                        </View> */}
                        {this.state.show===true? 
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={(value)=>console.log(value)}
                            />:<View></View>}
                            {/* <View>
                                <Text>
                                    {this.state.coba}
                                </Text>
                            </View> */}
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Pendapatan : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>Rp. 22500000</ListItem.Subtitle>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Total Transaksi : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>142</ListItem.Subtitle>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Total Biaya Admin : </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Subtitle>Rp. 355000</ListItem.Subtitle>
                    </ListItem>
                    {/* <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Lihat Detail</Text>
                    </TouchableOpacity> */}
                </Card>
                </ScrollView>
            </View>
        )
    }
}