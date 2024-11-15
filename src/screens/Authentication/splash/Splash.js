import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { BloodDonation2 } from "../../../themes/images";
import useStore from "../../zustand/store";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen() {

    const { authState, setAuthState } = useStore();

    const [user, setUser] = useState(false);

    const navigation = useNavigation();


    useEffect(() => {

        const timer = setTimeout(async() => {
            const res =  await AsyncStorage.getItem('user')
            const data = await JSON.parse(res);
            if (data?.userStatus === true) {
                navigation.dispatch(StackActions.replace('HomeScreen'));
            } else {
                navigation.dispatch(StackActions.replace('SignScreen'))
            }

        }, 3000);

    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.quoteSection}>
                <Text style={styles.arabicText}>
                    ۞قَوۡلٞ مَّعۡرُوفٞ وَمَغۡفِرَةٌ خَيۡرٞ مِّن صَدَقَةٖ يَتۡبَعُهَآ أَذٗىۗ وَٱللَّهُ غَنِيٌّ حَلِيمٞ
                </Text>
                <Text style={styles.englishText}>
                    "Kind words and forgiving of faults are better than sadaqah charity followed by injury And Allah is Rich And He is Most-Forbearing."
                </Text>
            </View>
            {/* <View style={styles.imageSection}> */}
            <View style={{flex:1}}>
                <TouchableOpacity style={styles.imageWrapper}
                    onPress={() => navigation.navigate('SignScreen')}
                >
                    <Image source={BloodDonation2} style={styles.image} />
                </TouchableOpacity>

            </View>
            {/* <View style={styles.title_view}> */}
            <View style={{flex: 1}}>
                <Text style={styles.titleText}>BLOOD IN</Text>
                <Text style={styles.titleText}>NEED</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EB3738',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 36,
        paddingTop: 100,
    },
    quoteSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        alignSelf: 'center',
    },
    arabicText: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: '4%',
        fontSize: 18,
        paddingHorizontal: 16,
        letterSpacing: 0.5,
        textAlign: 'center',
        lineHeight: 28
    },
    englishText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.5,
        paddingHorizontal: 14,
        textAlign: 'center'
    },
    imageSection: {
        height: '74%',
        alignItems: 'center',
        marginTop: '18%',
        width: '95%',
        alignSelf: 'center',
    },
    imageWrapper: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    image: {
        height: '50%',
        width: '50%'
    },
    title_view: {
        alignItems: 'center'
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 34,
        textAlign: 'center'
    },
});

export default SplashScreen;
