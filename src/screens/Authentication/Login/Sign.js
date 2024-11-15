import React, { useState } from 'react';
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
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { BloodDonation2 } from '../../../themes/images';
import { goole } from '../../../themes/images';
import { StackActions, useNavigation } from '@react-navigation/native';
import useStore from '../../zustand/store';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

          console.log(userData);
          console.log('USerd ID : ', data)
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

  // const handleGoogleLogin = async () => {
  //   try {
  //     // Sign out any previous Google session
  //     await GoogleSignin.signOut();

  //     // Check if Google Play Services are available
  //     await GoogleSignin.hasPlayServices();

  //     // Sign in with Google
  //     const userInfo = await GoogleSignin.signIn();
  //     const email = userInfo?.data?.user?.email;

  //     if (!email) {
  //       Alert.alert('Error', 'Unable to retrieve email from Google login.');
  //       return;
  //     }

  //     console.log('Google login successful:', email);

  //     // Prepare API body with email and login_type
  //     const body = {
  //       email: email,
  //       login_type: 'google',
  //     };

  //     // API endpoint for login
  //     const endpoint = '/login';

  //     // Make the API call
  //     const response = await apiCall(endpoint, 'POST', body);

  //     if (response?.status === false) {
  //       Alert.alert(
  //         'Error',
  //         response?.message || 'Invalid Google login credentials.',
  //       );
  //     } else {
  //       // Store the user token or any relevant data after a successful login
  //       await AsyncStorage.setItem('userToken', JSON.stringify(response));

  //       // Navigate to the SplashScreen after successful login
  //       navigation.navigate('SplashScreen');
  //     }
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       Alert.alert('Cancelled', 'Google login was cancelled.');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       Alert.alert('In Progress', 'Google login is already in progress.');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       Alert.alert('Error', 'Google Play Services are not available.');
  //     } else {
  //       console.error('Google login error:', error);
  //       Alert.alert('Error', 'Google login failed. Please try again.');
  //     }
  //   }
  // };

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
              }}>
              <Image
                source={goole}

                //  source={require('../image/Assets/goole.png')}
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
