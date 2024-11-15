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
    ActivityIndicator
} from "react-native";
import { BloodDonation2 } from "../../themes/images";
import useStore from "../zustand/store";

function EmailScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const { forgotEmail, setForgotEmail } = useStore();

    const handleVerification = async () => {
        try {
            setLoader(true)
            const API = `https://app.infolaravel.com/api/password/send-reset`;

            if (!email) {
                return Alert.alert('Please Type Your Email');
            }

            const res = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (!res.ok) {
                console.log(res)
                return Alert.alert('Email Not Found', 'Please try again later, temporary error found');
            }
            setLoader(false)
            Alert.alert(`Message Sent To this email Successfully ${email}`);
            // console.log(res)
            setForgotEmail(email);

            navigation.navigate('VerifyEmailScreen');
        } catch (error) {
            Alert.alert('Error Found', 'Temporary Error Found. Please Try again later');
            console.error(error);
        } finally {
            setLoader(false)
        }
    };


    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.logoButton} onPress={() => navigation.navigate('SplashScreen')}>
                            <Image source={BloodDonation2} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>BLOOD IN NEED</Text>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.emailLabelContainer}>
                            <Text style={styles.emailLabel}>EMAIL</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>
                                “We only need your phone number for authentication purposes and will not contact you otherwise”
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                placeholder="Type Your Email"
                                style={styles.textInput}
                                onChangeText={(val) => setEmail(val)}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.sendCodeButton}
                                onPress={handleVerification}
                            >
                                <Text style={styles.buttonText}>Send Code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.resendContainer}>
                        <Text style={styles.resendText}>Didn't get OTP?</Text>
                        <TouchableOpacity style={styles.resendButton} onPress={() => navigation.navigate('VerifyEmailScreen')}>
                            <Text style={styles.resendLink}>Resend</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)',
    },
    header: {
        height: 200,
        alignItems: 'center',
        backgroundColor: '#EB3738',
    },
    logoButton: {
        marginTop: '8%',
    },
    headerText: {
        color: 'white',
        fontWeight: '400',
        marginTop: '2%',
        fontSize: 30,
    },
    card: {
        height: 400,
        width: '88%',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: '-5%',
        borderRadius: 15,
        elevation: 5,
    },
    emailLabelContainer: {
        height: '22%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    emailLabel: {
        color: 'black',
        fontWeight: '400',
        fontSize: 20,
    },
    infoContainer: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16
    },
    inputContainer: {
        width: '85%',
        alignSelf: 'center',
        marginTop: '7%',
    },
    inputLabel: {
        fontWeight: '400',
        color: 'black',
    },
    textInput: {
        borderBottomWidth: 1,
    },
    buttonContainer: {
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendCodeButton: {
        width: '60%',
        height: '35%',
        backgroundColor: '#EB3738',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
    },
    resendContainer: {
        height: 220,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '10%',
    },
    resendText: {
        color: 'black',
        fontWeight: '400',
    },
    resendButton: {
        marginLeft: '1%',
    },
    resendLink: {
        color: '#146EC1',
        fontWeight: '400',
    },
});

export default EmailScreen;
