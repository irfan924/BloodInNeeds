import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { BloodDonation2 } from "../../themes/images";
import useStore from "../zustand/store";
import ProfileInput from "../../components/ProfileInput";

function VerifyEmailScreen({ navigation }) {

    const { forgotEmail, setForgotEmail } = useStore();
    const [loader, setLoader] = useState(false)

    // const et1 = useRef();
    // const et2 = useRef();
    // const et3 = useRef();
    // const et4 = useRef();
    // const [f1, setF1] = useState('');
    // const [f2, setF2] = useState('');
    // const [f3, setF3] = useState('');
    // const [f4, setF4] = useState('')

    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');

    const handleVerification = async () => {
        try {
            if (!otp || !password || !password_confirmation) {
                return Alert.alert('Missing Fields', 'Please fill in all the required fields.');
            }
    
            if (password !== password_confirmation) {
                return Alert.alert('Password Mismatch', 'Password and confirmation do not match.');
            }
    
            setLoader(true);
    
            const API = `https://app.infolaravel.com/api/password/verify-reset`;
    
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: otp,
                    password: password,
                    password_confirmation: password_confirmation,
                    email: forgotEmail,
                }),
            });
    
            if (!response.ok) {
                console.log('Password Change Error:', await response.json());
                setLoader(false);
                return Alert.alert(
                    'Reset Failed',
                    'An error occurred while resetting your password. Please try again.'
                );
            }
    
            setLoader(false);
            Alert.alert('Success', 'Password reset successful!');
            console.log('Server Response:', await response.json());
    
            navigation.navigate('SignScreen');
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please check your network and try again.');
            console.error('Error:', error);
            setLoader(false);
        } finally {
            setLoader(false);
        }
    };
    


    return (

        <ScrollView style={{ backgroundColor: '#fff' }} >
            <View >
                <View style={{ height: 250, alignItems: 'center', backgroundColor: '#EB3738', justifyContent: 'flex-start' }}>

                    <TouchableOpacity style={{ marginTop: '8%' }}
                        onPress={() => navigation.navigate('SplashScreen')}>
                        <Image source={BloodDonation2} />

                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontWeight: '400', marginTop: '2%', fontSize: 30 }}>BLOOD IN NEED</Text>

                </View>
                <View style={{ height: 450, width: '88%', backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: '-9%', borderRadius: 15, elevation: 5, padding: 16, gap: 12, marginBottom: 20 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 20 }}>EMAIL VERIFICATION</Text>
                    </View>
                    <View style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'black' }}>Enter the OTP we have send to your</Text>
                        <Text style={{ color: 'black' }}>Email : {forgotEmail}</Text>

                    </View>
                    {/* <View style={{ flexDirection: 'row', width: '85%', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', height: '25%' }}>
                            <View style={{ width: 40, height: 40, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 6, borderColor: '#EB3738' }}>
                                <TextInput
                                    style={{ textAlign: 'center' }}
                                    placeholder="4"
                                    ref={et1}
                                    onChangeText={(val) => {
                                        setF1(val)
                                        if (val?.length >= 1) {
                                            et2.current.focus();
                                        }
                                    }}
                                    keyboardType='number-pad'
                                />
                            </View>
                            <View style={{ width: 40, height: 40, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 6, borderColor: '#EB3738' }}>
                                <TextInput
                                    style={{ textAlign: 'center' }}
                                    placeholder="6"
                                    ref={et2}
                                    onChangeText={(val) => {
                                        setF2(val)
                                        if (val?.length >= 1) {
                                            et3.current.focus();
                                        }
                                    }}
                                    keyboardType='number-pad'
                                />
                            </View>
                            <View style={{ width: 40, height: 40, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 6, borderColor: '#EB3738' }}>
                                <TextInput
                                    style={{ textAlign: 'center' }}
                                    placeholder="9"
                                    ref={et3}
                                    onChangeText={(val) => {
                                        setF3(val)
                                        if (val?.length >= 1) {
                                            et4.current.focus();
                                        }
                                    }}
                                    keyboardType='number-pad'
                                />
                            </View>
                            <View style={{ width: 40, height: 40, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 6, borderColor: '#EB3738' }}>
                                <TextInput
                                    style={{ textAlign: 'center' }}
                                    placeholder="6"
                                    ref={et4}
                                    onChangeText={(val) => {
                                        setF4(val)
                                        if (val?.length >= 1) {
                                            et3.current.focus();
                                        }
                                    }}
                                    keyboardType='number-pad'
                                />
                            </View>
                        </View> */}

                    <View style={{ gap: 16 }}>
                        <ProfileInput
                            title={'Your OTP'}
                            placeholder={'Enter Your OTP'}
                            keyboardType={'numeric'}
                            onChangeText={(val) => {
                                setOtp(val)
                            }}
                        />
                        <ProfileInput
                            title={'New Password'}
                            placeholder={'Enter New Password'}
                            onChangeText={(val) => {
                                setPassword(val)
                            }}
                        />
                        <ProfileInput
                            title={'Confirm Password'}
                            placeholder={'Enter Confirm Password'}
                            onChangeText={(val) => {
                                setPassword_confirmation(val);
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{ width: '60%', height: 56, backgroundColor: '#EB3738', justifyContent: 'center', alignItems: 'center', borderRadius: 5, alignSelf: 'center' }}

                        onPress={handleVerification}>
                        <Text style={{ color: 'white', fontWeight: '400' }}>Verify Code</Text>
                    </TouchableOpacity>

                </View>
                {/* <View style={{ height: '10%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: 16 }}>
                    <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontWeight: '400' }}>Valid for 4 Mintus :</Text>
                            <TouchableOpacity style={{ marginLeft: '1%' }}>
                                <Text style={{ color: 'black', fontWeight: '400' }}>02:00</Text>
                            </TouchableOpacity>
                        </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontWeight: '400' }}>Time Out or InValid OTP ?</Text>
                        <TouchableOpacity style={{ marginLeft: '1%' }}
                        // onPress={() => navigation.navigate('EmailScreen')}
                        >
                            <Text style={{ color: 'black', fontWeight: '600' }}>Resend</Text>
                        </TouchableOpacity>
                    </View>

                </View> */}


            </View>
            {
                loader &&
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}
                >
                    <ActivityIndicator size={200} color={'white'} />
                </View>
            }
        </ScrollView>






    )
}
export default VerifyEmailScreen;