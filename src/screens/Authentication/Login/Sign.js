import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Platform
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { BloodDonation2 } from '../../../themes/images';
import { goole } from '../../../themes/images';
import { StackActions, useNavigation } from '@react-navigation/native';
import useStore from '../../zustand/store';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { handleGoogle } from '../../googl-login';
import {
  GoogleOneTapSignIn,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

function SignScreen() {

  const navigation = useNavigation();

  const { authState, setAuthState } = useStore()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleUserLogin = async () => {

    try {
      if (!email || !password) {
        Alert.alert('Both Fields are required')
      } else {

        setLoading(true)
        const res = await fetch(
          "https://app.infolaravel.com/api/app-login",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          }
        )

        if (res.ok) {
          setLoading(false)

          const data = await res.json();

          const userData = JSON.stringify({
            user: data?.data?.user,
            userStatus: true,
            token: data.data.token
          })

          await AsyncStorage.setItem('user', userData)

          // console.log(userData);
          // console.log('USerd ID : ', data)
          Alert.alert('Login Successfully');

          navigation.dispatch(StackActions.replace('HomeScreen'))
        } else {
          setLoading(false)
          Alert.alert('Invalid Credentials')
        }
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }

  }


  const handleGoogle = async () => {

    try {
      const API = `https://app.infolaravel.com/api/auth/google/redirect`;

      const res = await fetch(API, { method: 'GET' });
      const result = await res.json();

      if (result?.url) {

        Linking.openURL(result.url);
      } else {
        console.error('No URL received from API.');
      }
    } catch (error) {
      console.log('Error found on login with Google:', error);
    }
  };

  // useEffect(() => {
  //   const handleOpenURL = (event) => {
  //     const { url } = event;
  //     const queryParams = new URLSearchParams(url.split('?')[1]);
  //     const token = queryParams.get('token');

  //     if (token) {
  //       Alert.alert('Google Authentication', `Received token: ${token}`);
  //       // Do something with the token, e.g., store it or make an API call
  //     } else {
  //       console.error('No token found in the URL.');
  //     }
  //   };

  //   // Subscribe to the URL event listener
  //   Linking.addEventListener('url', handleOpenURL);

  //   // Handle the initial URL (if the app was launched via a link)
  //   Linking.getInitialURL().then((url) => {
  //     if (url) handleOpenURL({ url });
  //   });

  //   // Clean up the event listener
  //   return () => {
  //     Linking.removeEventListener('url', handleOpenURL);
  //   };
  // }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)' }}>
          <View
            style={{
              height: '25%',
              alignItems: 'center',
              backgroundColor: '#EB3738',
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              style={{ marginTop: '8%' }}
            >
              <Image source={BloodDonation2} />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontWeight: '400',
                marginTop: '2%',
                fontSize: 30,
              }}>
              BLOOD IN NEED
            </Text>
          </View>
          <View
            style={{
              height: 335,
              width: '88%',
              backgroundColor: '#FFFFFF',
              alignSelf: 'center',
              marginTop: '-8%',
              borderRadius: 15,
              elevation: 5,
            }}>
            <View
              style={{
                height: '15%',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={{ color: 'black', fontWeight: '400', fontSize: 20 }}>
                LOGIN
              </Text>
            </View>
            <View style={{ height: '30%', width: '90%', alignSelf: 'center' }}>
              <Text style={{ fontWeight: '400', color: 'black' }}>Email</Text>
              <TextInput
                placeholder="Enter Your Email"
                style={{ borderBottomWidth: 1 }}
                onChangeText={val => setEmail(val)}
              />
            </View>
            <View style={{ height: 80, width: '90%', alignSelf: 'center' }}>
              <Text style={{ fontWeight: '400', color: 'black' }}>Password</Text>
              <TextInput
                placeholder="Enter Your Password"
                style={{ borderBottomWidth: 1 }}
                onChangeText={val => setPassword(val)}
              />
            </View>
            <View
              style={{
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '60%',
                  height: 50,
                  backgroundColor: '#EB3738',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={handleUserLogin}>
                <Text style={{ color: 'white', fontWeight: '400' }}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 340, marginTop: '11%' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EmailScreen')}>
              <Text
                style={{
                  alignItems: 'center',
                  color: '#146EC1',
                  alignSelf: 'center',
                }}>
                FORGOT PASSWORD
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '70%',
                alignSelf: 'center',
                backgroundColor: '#D9D9D9',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '3%',
              }}
              onPress={handleGoogle}
            >
              <Image
                source={goole}
                style={{ marginLeft: '3%' }}
              />
              <Text
                style={{ color: 'black', marginLeft: '3%', fontWeight: '400' }}>
                SIGN UP WITH
              </Text>
              <Text style={{ color: '#146EC1', marginLeft: '3%' }}>GOOGLE</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '5%',
              }}>
              <Text style={{ color: 'black' }}>NOT A MEMBER YET ?</Text>
              <TouchableOpacity
                style={{ marginLeft: '3%' }}
                onPress={() => navigation.navigate('SignUpScreen')}>
                <Text
                  style={{
                    color: '#146EC1',
                    marginLeft: '0%',
                    fontWeight: '400',
                  }}>
                  SIGN UP{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {
        loading &&
        <View style={styles.absolute}>
          <ActivityIndicator color={'red'} size={200} />
        </View>
      }
    </KeyboardAvoidingView>
  );
}

export default SignScreen;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(120,120,120,0.6)'
  }
})
