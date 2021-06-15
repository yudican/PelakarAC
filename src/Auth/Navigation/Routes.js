import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {db} from '../../database/config';
import {AuthContext} from './AuthProvider';
import Splash from '../../Splash/Splash';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = (props) => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [status, setStatus] = useState(null); // accountStatus = suspend || active || pending

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const checkAccountStatus = async () => {
    console.log(user);
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

  useEffect(() => {
    const subscriber = db.app.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [checkAccountStatus()]);

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
