import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {BloodDonation2} from '../../../themes/images';
import { goole } from '../../../themes/images';

function SignScreen({navigation}) {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'rgb(255, 255, 255)'}}>
          <View
            style={{
              height: '25%',
              alignItems: 'center',
              backgroundColor: '#EB3738',
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              style={{marginTop: '8%'}}
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
              <Text style={{color: 'black', fontWeight: '400', fontSize: 20}}>
                LOGIN
              </Text>
            </View>
            <View style={{height: '30%', width: '90%', alignSelf: 'center'}}>
              <Text style={{fontWeight: '400', color: 'black'}}>Email</Text>
              <TextInput
                placeholder="Enter Your Email"
                style={{borderBottomWidth: 1}}
              />
            </View>
            <View style={{height: 80, width: '90%', alignSelf: 'center'}}>
              <Text style={{fontWeight: '400', color: 'black'}}>Password</Text>
              <TextInput
                placeholder="Enter Your Password"
                style={{borderBottomWidth: 1}}
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
                onPress={() => navigation.navigate('AddDonarDetailSc')}>
                <Text style={{color: 'white', fontWeight: '400'}}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: 340, marginTop: '11%'}}>
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
                style={{marginLeft: '3%'}}
              />
              <Text
                style={{color: 'black', marginLeft: '3%', fontWeight: '400'}}>
                SIGN UP WITH
              </Text>
              <Text style={{color: '#146EC1', marginLeft: '3%'}}>GOOGLE</Text>
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
              <Text style={{color: 'black'}}>NOT A MEMBER YET ?</Text>
              <TouchableOpacity
                style={{marginLeft: '3%'}}
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
    </KeyboardAvoidingView>
  );
}

export default SignScreen;
