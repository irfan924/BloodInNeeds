import React, { useState } from "react";

import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import { backArrow } from "../../themes/images";
import { BloodDonation2 } from "../../themes/images";
import { profile02 } from "../../themes/images";
import { StackActions, useNavigation } from "@react-navigation/native";
import useStore from "../zustand/store";

function ProfileScreen() {

    const navigation = useNavigation();

    const { authState, setAuthState } = useStore();

    const [uploadpic, setUpLoadPic] = useState(false);
    const takephotofromcamera = () => {
        console.warn('Take Photo From Camera')
    }
    const choosefromgallery = () => {
        console.warn('Choose From Gallery')
    }
    const cancelupload = () => {
        setUpLoadPic(false)
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)' }}>
            <View style={{ height: '27%', backgroundColor: '#EB3738', width: '100%' }}>
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
            <View style={{ height: '45%', width: '88%', backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: '-8%', borderRadius: 15, elevation: 5 }}>
                <TouchableOpacity style={{ height: '32%', justifyContent: 'center', alignItems: 'center', width: '38%', backgroundColor: 'rgba(0, 0, 0, 0.2)', alignSelf: 'center', marginTop: '3%', borderRadius: 200 }}
                    onPress={() => setUpLoadPic(!uploadpic)}>
                    <Image source={profile02} style={{ tintColor: '#EB3738' }} />

                </TouchableOpacity>
                <View style={{ height: '40%', width: '90%', alignSelf: 'center' }}>
                    <Text style={{ borderBottomWidth: 1, marginTop: "10%" }}>Ariyan</Text>
                    <Text style={{ borderBottomWidth: 1, marginTop: "10%", fontWeight: '800' }}>Karachi</Text>
                    <Text style={{ borderBottomWidth: 1, marginTop: "10%", fontWeight: '800' }}>03214394530</Text>
                    <Text></Text>
                </View>



                <View style={{ height: '15%', justifyContent: 'center', alignItems: 'center', marginTop: "5%" }}>

                    <TouchableOpacity
                        style={{ width: '50%', height: '62%', backgroundColor: '#EB3738', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                        onPress={() => {
                            setAuthState(false);
                            navigation.dispatch(StackActions.replace('SignScreen'))
                        }}>
                        <Text style={{ color: 'white', fontWeight: '400', fontSize: 16 }}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ height: '20%', flexDirection: 'column', alignItems: 'center', marginTop: '8%' }}>
                <TouchableOpacity style={{ width: '50%', height: '22%', backgroundColor: '#EB3738', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                    onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
                    <Text style={{ color: 'white', fontWeight: '400', fontSize: 16 }}>PRIVACY POLICY</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: '800', fontSize: 16, marginTop: "23%" }}>@ 2015-2024 BLOOD IN NEED</Text>

            </View>


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
            )}



        </View>


    )
}
export default ProfileScreen;