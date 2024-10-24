import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from "react-native";
import { BloodDonation2 } from "../../../themes/images";
import { useNavigation } from "@react-navigation/native";

function SignUpScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false)

    const handleUserRegistration = async () => {

        try {
            if (email || password || confirmPassword || phone) {

                if (password.length < 8) {
                    return Alert.alert('Password must be 8 characters')
                }

                if (password === confirmPassword) {

                    setLoading(true)
                    const res = await fetch(
                        "https://app.infolaravel.com/api/app-register",
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password,
                                confirm_password: confirmPassword,
                                phone: phone
                            })
                        }
                    )

                    console.log(res)

                    setLoading(false)

                    if (res.ok) {

                        navigation.navigate('SignScreen')

                    } else {
                        Alert.alert('Email has been already taken')
                    }

                } else {
                    Alert.alert('Password and Re-Type Password did not match')
                    setLoading(false)
                }

            }
            else {
                Alert.alert('All Fields are required')
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.mainContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.logoButton}
                            onPress={() => navigation.navigate('SplashScreen')}>
                            <Image source={BloodDonation2} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>BLOOD IN NEED</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.signupHeader}>
                            <Text style={styles.signupText}>SIGNUP</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                placeholder="Type Your Email"
                                style={styles.textInput}
                                onChangeText={val => setEmail(val)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Phone</Text>
                            <TextInput
                                placeholder="Type Your Phone"
                                style={styles.textInput}
                                onChangeText={val => setPhone(val)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                placeholder="Type Your Password"
                                style={styles.textInput}
                                onChangeText={val => setPassword(val)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Re-Type  Password</Text>
                            <TextInput
                                placeholder="Re-Type  Your Password"
                                style={styles.textInput}
                                onChangeText={val => setConfirmPassword(val)}
                            />
                        </View>

                        <View style={styles.signupButtonContainer}>
                            <TouchableOpacity
                                style={styles.signupButton}
                                onPress={handleUserRegistration}>
                                <Text style={styles.signupButtonText}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>IF YOU HAVE ACCOUNT</Text>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => navigation.navigate('SignScreen')}
                        >
                            <Text style={styles.loginButtonText}>LOGIN</Text>
                        </TouchableOpacity>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)'
    },
    header: {
        height: 230,
        alignItems: 'center',
        backgroundColor: '#EB3738',
        justifyContent: 'flex-start'
    },
    logoButton: {
        marginTop: '7%'
    },
    headerText: {
        color: 'white',
        fontWeight: '400',
        marginTop: '2%',
        fontSize: 30
    },
    formContainer: {
        height: 480,
        width: '88%',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: '-12%',
        borderRadius: 15,
        elevation: 5
    },
    signupHeader: {
        height: '6%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    signupText: {
        color: 'black',
        fontWeight: '400',
        fontSize: 20
    },
    inputContainer: {
        height: '20%',
        width: '90%',
        alignSelf: 'center'
    },
    inputLabel: {
        fontWeight: '400',
        color: 'black'
    },
    textInput: {
        borderBottomWidth: 1
    },
    signupButtonContainer: {
        height: '14%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupButton: {
        width: '60%',
        height: '50%',
        backgroundColor: '#EB3738',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    signupButtonText: {
        color: 'white',
        fontWeight: '400'
    },
    loginContainer: {
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '8%'
    },
    loginText: {
        color: 'black',
        fontWeight: '600'
    },
    loginButton: {
        marginLeft: "1%"
    },
    loginButtonText: {
        color: '#146EC1',
        fontWeight: '600'
    },
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
});

export default SignUpScreen;
