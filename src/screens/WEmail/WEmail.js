import React from "react";
import { 
    Image, 
    KeyboardAvoidingView, 
    ScrollView, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    StyleSheet 
} from "react-native";
import { BloodDonation2 } from "../../themes/images";

function EmailScreen({ navigation }) {

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
                            <Text style={styles.infoText}>“We only need your phone number for authentication</Text>
                            <Text style={styles.infoText}>purposes and will not contact you otherwise”</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput 
                                placeholder="Type Your Email" 
                                style={styles.textInput} 
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.sendCodeButton} 
                                onPress={() => navigation.navigate('VerifyEmailScreen')}
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
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        color: 'black',
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
