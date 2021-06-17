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
              .ref('Pengguna/Pelanggan/' + userUid)
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
              .ref('Pengguna/Pelanggan/' + userUid)
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
        addToCart: async (uid_jasa,uid, newData, penyedia_id, dataJasa) => {
          try {
            await db.app
              .database()
              .ref(`Pengguna/Pelanggan/${uid}/Keranjang/${penyedia_id}`)
              .set(newData)
              .then((newData) => {

                db.app
                .database()
                .ref(`Pengguna/Pelanggan/${uid}/Keranjang/${penyedia_id}/Data_jasa/${uid_jasa}`)
                .push(dataJasa)
                ToastAndroid.showWithGravityAndOffset(
                  'Jasa Berhasil Ditambah Keranjang',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              });
          } catch (e) {
            ToastAndroid.showWithGravityAndOffset(
              'Terjadi Kesalahan',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        },
        PushToCartJasa : async (data, uid, penyedia_id, uid_jasa) => {
          try {
            await db.app
              .database()
              .ref(`Pengguna/Pelanggan/${uid}/Keranjang/${penyedia_id}/Data_Jasa/${uid_jasa}`)
              .push(data)
              .then((data) => {
                
                ToastAndroid.showWithGravityAndOffset(
                  'Jasa penyedia Berhasil Ditambah Keranjang',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              });
          } catch (e) {
            console.log("push to cart" +e)
            ToastAndroid.showWithGravityAndOffset(
              'Terjadi Kesalahan',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        },
        addToFavorite: async (data, penyedia_id, uid) => {
          try {
            await db.app
              .database()
              .ref(`Pengguna/Pelanggan/${uid}/Favorite/${penyedia_id}`)
              .set(data)
              .then((data) => {
                ToastAndroid.showWithGravityAndOffset(
                  'Jasa Berhasil Ditambah Favorite',
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              });
          } catch (e) {
            ToastAndroid.showWithGravityAndOffset(
              'Terjadi Kesalahan',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
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
        sendChat: async (messages, uid) => {
          await db.app
            .database()
            .ref(`Pengguna/Chat/${uid}/${uuid.v4()}`)
            .set(messages)
            .then((data) => {
              console.log(data);
            });
        },
        getPerusahaan: async () => {
          db.ref('/pengguna/Pelanggan').on('value', (querySnapShot) => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let jasa = {...data};
            this.setState({
              jasa,
            });
            console.log(jasa);
          });
        },
      }}>
      {children}
    </AppContext.Provider>
  );
};
