import React, {createContext, useState} from 'react';
import {db} from '../../database/config';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, navigation) => {
          try {
            await db.app
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then((res) => {
                console.log(res, email, password);
              });
          } catch (e) {
            Alert.alert(
              'Login Gagal',
              'Periksan kembali email dan password anda',
            );
          }
        },
        register: async (email, password, rePassword, navigation) => {
          if (password == rePassword) {
            try {
              await db.app
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                  db.app
                    .database()
                    .ref('Pengguna/Pelanggan/' + res.user.uid)
                    .set({
                      email: email,
                      status: 'pending',
                    })
                    .then((data) => {
                      Alert.alert('Selamat', 'Anda berhasil mendaftar');
                      navigation.replace('Signupdetail');
                    });
                });
            } catch (e) {
              alert(
                'Email sudah terdaftar atau tidak memenuhi syarat , mohon cek kembali',
              );
            }
          } else {
            Alert.alert('Daftar Gagal', 'Masukkan ulang password salah');
          }
        },
        registerDetail: async (data, userUid, navigation) => {
          try {
            await db.app
              .database()
              .ref('Pengguna/Pelanggan/' + userUid)
              .update(data)
              .then((data) => {
                Alert.alert('Berhasil', 'Data Berhasil Disimpan');
                navigation.replace('Home');
              });
          } catch (e) {
            Alert.alert('Error', 'Data yang anda masukkan tidak sesuai');
          }
        },
        logout: async (navigation = null) => {
          try {
            await db.app
              .auth()
              .signOut()
              .then(() => {
                setUser(null);
                navigation.replace('Login');
              });
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
