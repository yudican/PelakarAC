import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {db} from '../../database/config';
import {AuthContext} from './AuthProvider';
import Splash from '../../Splash/Splash';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';

const Routes = (props) => {
  const {user, setUser, statusUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [status, setStatus] = useState(statusUser); // accountStatus = suspend || active || pending

  const onAuthStateChanged = (user) => {
    setUser(user);
    checkAccountStatus(user);
    user && requestUserPermission(user.uid);
    if (initializing) setInitializing(false);
  };

  const checkAccountStatus = async (user) => {
    if (user) {
      await db.app
        .database()
        .ref(`Pengguna/Pelanggan/${user.uid}`)
        .once('value', (querySnapShot) => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          setStatus(data.status);
        });
    }
  };

  const requestUserPermission = async (uid) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await db.app
          .database()
          .ref(`Pengguna/Pelanggan/${uid}`)
          .update({fcmToken});
      }
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const {body, title} = remoteMessage.notification;
      Notifications.postLocalNotification({
        body,
        title,
        fireDate: new Date(),
      });
    });
    const subscriber = db.app.auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, [statusUser]);

  if (initializing) return <Splash />;

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack initialRouteName={'Login'} />
      </NavigationContainer>
    );
  }

  if (status === null) return <Splash />;

  if (status == 'pending') {
    return (
      <NavigationContainer>
        <AuthStack initialRouteName={'Signupdetail'} />
      </NavigationContainer>
    );
  }

  if (status == 'suspend') {
    return (
      <NavigationContainer>
        <AuthStack initialRouteName={'SignUpRejected'} />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Routes;
