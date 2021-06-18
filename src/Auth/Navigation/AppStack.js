import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Test';
import Beranda2 from '../../Pages/Beranda2';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Pesanan from '../../Pages/Pesanan';
import ChatPages from '../../Pages/Chat';
import Profil from '../../Pages/Profil';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UbahProfil from '../../Pages/UbahProfil';
import KelolaJasa from '../../Pages/KelolaJasa';
import TambahJasa from '../../Pages/TambahJasa';
import Beranda from '../../Pages/Beranda';
import ListJasaTerdekat from '../../Pages/ListJasaTerdekat';
import ListJasaRekomendasi from '../../Pages/ListJasaRekomendasi';
import ChatDetail from '../../Pages/ChatDetail';
import TokoDeatil from '../../Pages/TokoDetail';
import Favorite from '../../Pages/Favorite';
import Cart from '../../Pages/Cart';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabHome}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="UbahProfil"
        component={UbahProfil}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="KelolaJasa"
        component={KelolaJasa}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TambahJasa"
        component={TambahJasa}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ListJasaTerdekat"
        component={ListJasaTerdekat}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ListJasaRekomendasi"
        component={ListJasaRekomendasi}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="TokoDeatil"
        component={TokoDeatil}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Keranjang"
        component={Cart}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

function TabHome() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#000"
      shifting={false}
      barStyle={{backgroundColor: '#5D89F7'}}>
      <Tab.Screen
        name="Home"
        component={Beranda}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Pesanan"
        component={Pesanan}
        options={{
          tabBarLabel: 'Riwayat',
          tabBarIcon: ({color}) => (
            <Icon name="history" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatPages}
        options={{
          tabBarLabel: 'Pesan',
          tabBarIcon: ({color}) => (
            <AntDesign name="message1" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({color}) => <Icon name="user" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppStack;
