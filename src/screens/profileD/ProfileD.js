import React, { useState, useEffect } from "react";

import { ActivityIndicator, Alert, Image, ImageBackground, PermissionsAndroid, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { backArrow } from "../../themes/images";
import { BloodDonation2 } from "../../themes/images";
import { profile02 } from "../../themes/images";
import { StackActions, useNavigation } from "@react-navigation/native";
import useStore from "../zustand/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileInput from "../../components/ProfileInput";
import DocumentPicker, { types } from 'react-native-document-picker';

function ProfileScreen() {

    const navigation = useNavigation();

    const { authState, setAuthState } = useStore();

    const [userData, setUserData] = useState({});
    const [userLogo, setUserLogo] = useState('');
    const [filepath, setfilePath] = useState('');
    const [localPath, setLocalPath] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('')
    const [loader, setLoader] = useState(false)

    const getUserDetail = async () => {

        try {
            const res = await AsyncStorage.getItem('user');

            const data = await JSON.parse(res);

            const userId = data.user.id;

            const API = `https://app.infolaravel.com/api/user/${userId}`

            const apiResponse = await fetch(API);

            const userData = await apiResponse.json();

            // console.log('User Detail',userData.data)

            setUserData(userData.data);
        } catch (error) {
            console.log('Error while fetching User Detail')
        }

    }


    const selectAvatar = async () => {
        try {
            const response = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });

            const uri = response[0].uri;
            await AsyncStorage.setItem('imageUri', JSON.stringify(uri));
            setLocalPath(uri);

        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                Alert.alert('Selection cancelled');
            } else {
                console.error('Error selecting file:', error);
                Alert.alert('Error', 'Something went wrong while selecting an image.');
            }
        } finally {
            setLoader(false)
        }
    };

    const handleSignOut = async () => {
        setAuthState(false);
        const data = JSON.stringify({
            userStatus: false
        })
        await AsyncStorage.setItem('user', data)
        navigation.dispatch(StackActions.replace('SignScreen'))
    }

    const handleUpdate = async () => {
        try {
            setLoader(true)
            const formData = new FormData();

            // Append fields to FormData
            formData.append('name', name || userData?.name);
            formData.append('email', email || userData?.email);
            formData.append('phone', phone || userData?.phone);
            formData.append('city', city || userData?.city);

            if (localPath) {
                const fileName = localPath.split('/').pop();
                formData.append('image', {
                    uri: localPath,
                    name: fileName,
                    type: 'image/jpeg',
                });
            }

            const response = await fetch(`https://app.infolaravel.com/api/user/update/${userData.id}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!response.ok) {
                setLoader(false)
                const errorResponse = await response.json();
                console.error('API Error:', errorResponse);
                return Alert.alert('Update Failed', errorResponse.message || 'Please try again.');
            }

            const data = await response.json();
            console.log('Update Successful:', data);

            Alert.alert('Success', 'User details updated successfully!');
        } catch (error) {
            setLoader(false)
            console.error('Network Error:', error);
            Alert.alert('Error', 'Something went wrong. Please check your network connection.');
        } finally {
            setLoader(false)
        }
    };



    useEffect(() => {
        getUserDetail();
        const loadImage = async () => {
            const storedUri = await AsyncStorage.getItem('imageUri');
            if (storedUri) {
                setLocalPath(JSON.parse(storedUri));
            }
        };
        loadImage();
    }, [])


    return (
        <>
            <ScrollView style={{ backgroundColor: 'rgb(255, 255, 255)', paddingBottom: 50 }}>
                <View style={{ height: 250, backgroundColor: '#EB3738', width: '100%' }}>
                    <TouchableOpacity style={{ width: '90%', alignSelf: 'center', marginTop: "3%" }}
                        onPress={() => navigation.navigate('HomeScreen')}>
                        <Image source={backArrow} style={{ tintColor: 'white' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ marginTop: '1%' }}
                            onPress={() => navigation.navigate('SplashScreen')}>
                            <Image source={BloodDonation2} />

                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontWeight: '400', marginTop: '2%', fontSize: 30 }}>BLOOD IN NEED</Text>
                    </View>
                </View>

                <View style={{
                    width: '88%',
                    backgroundColor: '#FFFFFF',
                    alignSelf: 'center',
                    marginTop: '-8%',
                    borderRadius: 15,
                    elevation: 5
                }}>
                    {
                        localPath ?
                            <TouchableOpacity style={{ height: 150, justifyContent: 'center', alignItems: 'center', width: 150, backgroundColor: 'rgba(0, 0, 0, 0.2)', alignSelf: 'center', marginTop: '3%', borderRadius: 75, elevation: 6 }}
                                onPress={selectAvatar}
                            >
                                <Image source={{ uri: localPath }} style={{ width: 150, height: 150, borderRadius: 75, }} resizeMode="cover" />


                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={{ height: 150, justifyContent: 'center', alignItems: 'center', width: 150, backgroundColor: 'rgba(0, 0, 0, 0.2)', alignSelf: 'center', marginTop: '3%', borderRadius: 75, elevation: 6 }}
                                onPress={selectAvatar}
                            >
                                {
                                    userLogo ?
                                        <Image source={{ uri: userLogo }} style={{ width: 150, height: 150, borderRadius: 75 }} resizeMode="cover" />
                                        :
                                        <Image source={profile02} style={{ tintColor: '#EB3738', width: 100, height: 100 }} />
                                }

                            </TouchableOpacity>
                    }
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',
                        gap: 12,
                        paddingVertical: 16
                    }}>
                        {/* <Text style={{ borderBottomWidth: 1, marginTop: "10%" }}>
                        {userData.name}
                    </Text>
                    <Text style={{ borderBottomWidth: 1, marginTop: "10%", fontWeight: '800' }}>
                        {userData.city}
                    </Text>
                    <Text style={{ borderBottomWidth: 1, marginTop: "10%", fontWeight: '800' }}>
                        {userData.phone}
                    </Text> */}
                        <ProfileInput
                            placeholder={userData?.name === null ? 'Unknown' : userData?.name}
                            title={'User Name'}
                            onChangeText={(val) => setName(val)}
                        />
                        <ProfileInput
                            placeholder={userData.email}
                            title={'EMail'}
                            editable={false}
                        />
                        <ProfileInput
                            placeholder={userData?.city === null ? 'Unknown' : userData?.city}
                            title={'City'}
                            onChangeText={(val) => setCity(val)}
                        />
                        <ProfileInput
                            placeholder={userData?.phone}
                            title={'Phone Number'}
                            onChangeText={(val) => setPhone(val)}
                            keyboardType={'numeric'}
                        />
                    </View>


                    <TouchableOpacity
                        style={{
                            width: '90%',
                            height: 56,
                            borderWidth: 2,
                            borderColor: '#EB3738',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            alignSelf: 'center',
                            marginVertical: 16
                        }}
                        onPress={handleUpdate}
                    >
                        <Text style={{ color: 'red', fontWeight: '400', fontSize: 16 }}>
                            Update
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: '90%',
                            height: 56,
                            backgroundColor: '#EB3738',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            alignSelf: 'center',
                            marginVertical: 16
                        }}
                        onPress={handleSignOut}
                    >
                        <Text style={{ color: 'white', fontWeight: '400', fontSize: 16 }}>LOGOUT</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={{
                    width: '90%',
                    height: 56,
                    backgroundColor: '#EB3738',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    alignSelf: 'center',
                    marginVertical: 24
                }}
                // onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: '400',
                        fontSize: 16,
                    }}>
                        PRIVACY POLICY
                    </Text>
                </TouchableOpacity>
                <Text style={{
                    fontWeight: '800',
                    fontSize: 16,
                    marginVertical: 12,
                    textAlign: 'center'
                }}>
                    @ 2015-2024 BLOOD IN NEED
                </Text>


                {/* 
            {uploadpic && (<View style={{ position: 'absolute', bottom: 0, height: '30%', width: '100%', justifyContent: 'space-around', elevation: 20, backgroundColor: 'green' }}>
                <TouchableOpacity style={{ width: '70%', height: '20%', backgroundColor: '#EB3738', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}
                    onPress={cancelupload}>
                    <Text style={{ color: 'white', fontWeight: '400' }}>CANCEL UPLOAD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '70%', height: '20%', backgroundColor: '#EB3738', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}
                    onPress={takephotofromcamera}>
                    <Text style={{ color: 'white', fontWeight: '400' }}>TAKE PHOTO FROM CAMERA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '70%', height: '20%', backgroundColor: '#EB3738', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}
                    onPress={choosefromgallery}>
                    <Text style={{ color: 'white', fontWeight: '400' }}>CHOOSE FROM GALLERY</Text>
                </TouchableOpacity>

            </View>
            )} */}


                {
                    loader &&
                    <View style={{
                        // flex: 1,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <ActivityIndicator size={100} color={'red'} />
                    </View>
                }
            </ScrollView>
        </>

    )
}
export default ProfileScreen;