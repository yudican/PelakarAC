import React, {createContext, useState} from 'react';
import {db} from '../../database/config';
import {Alert, ToastAndroid} from 'react-native';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  return (
    <AppContext.Provider
      value={{
        updateProfile: async (data, userUid, navigation) => {
          try {
            await db.app
              .database()
              .ref('Pengguna/Penyedia_Jasa/' + userUid)
              .update(data)
              .then((data) => {
                ToastAndroid.showWithGravityAndOffset(
                  'Profile Berhasil Diupdate',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
                navigation.navigate('Home', {screen: 'Profil'});
              });
          } catch (e) {
            Alert.alert('Error', 'Terjadi Kesalahan');
          }
        },
        updateSpanduk: async (data, userUid) => {
          try {
            await db.app
              .database()
              .ref('Pengguna/Penyedia_Jasa/' + userUid)
              .update(data)
              .then((data) => {
                ToastAndroid.showWithGravityAndOffset(
                  'Spanduk Berhasil Diupdate',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              });
          } catch (e) {
            Alert.alert('Error', 'Terjadi Kesalahan');
          }
        },
        tambahJasa: async (data, navigation) => {
          try {
            await db.app
              .database()
              .ref('Pengguna/Data_Jasa/' + uuid.v4())
              .set(data)
              .then((data) => {
                ToastAndroid.showWithGravityAndOffset(
                  'Jasa Berhasil Ditambah',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
                navigation.navigate('KelolaJasa');
              });
          } catch (e) {
            Alert.alert('Error', 'Terjadi Kesalahan');
          }
        },
        uploadImage: async (uri, fileName, path) => {
          const imageRef = storage().ref(`${path}/${fileName}`);
          await imageRef
            .putFile(uri.replace('file:///', 'file:/'), {
              contentType: 'image/jpg',
            })
            .then((res) => console.log(res))
            .catch((error) => {
              console.log(error);
            });
          const url = await imageRef.getDownloadURL().catch((error) => {
            throw error;
          });

          return url;
        },

        getPerusahaan : async () => {         
          db.ref('/pengguna/penyedia_jasa').on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jasa = {...data};
            this.setState({
              jasa
            });
            console.log(jasa)
          });
        }

      }}>
      {children}
    </AppContext.Provider>
  );
};
