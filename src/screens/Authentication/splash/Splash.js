import React, { useEffect } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { BloodDonation2 } from "../../../themes/images";
import useStore from "../../zustand/store";
import { StackActions, useNavigation } from "@react-navigation/native";

function SplashScreen() {

    const { authState, setAuthState } = useStore();

    const navigation = useNavigation();

    useEffect(() => {

        const timer = setTimeout(() => {

            if (authState) {
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
                <Text style={styles.arabicText}>
                    غَنِيٌّ حَلِيمٞ
                </Text>
                <Text style={styles.englishText}>
                    "Kind words and forgiving of faults are better than
                </Text>
                <Text style={styles.englishText}>
                    sadaqah charity followed by injury And Allah is
                </Text>
                <Text style={styles.englishText}>
                    Rich And He is Most-Forbearing."
                </Text>
            </View>
            <View style={styles.imageSection}>
                <TouchableOpacity style={styles.imageWrapper}
                    onPress={() => navigation.navigate('SignScreen')}
                >
                    <Image source={BloodDonation2} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.title_view}>
                    <Text style={styles.titleText}>BLOOD IN</Text>
                    <Text style={styles.titleText}>NEED</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EB3738',
        justifyContent: 'center',
        alignItems: 'center'


    },
    quoteSection: {
        height: '26%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        alignSelf: 'center',
        marginTop: '20%',
        marginHorizontal: '2%'
    },
    arabicText: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: '4%',
        fontSize: 16,
    },
    englishText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16
    },
    imageSection: {
        height: '74%',
        alignItems: 'center',
        marginTop: '18%',
        width: '95%',
        alignSelf: 'center',
    },
    imageWrapper: {
        width: '50%',
        height: '32%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
    },
    image: {
        height: '50%',
        width: '50%'
    },
    title_view: {
        marginVertical: '20%',
        alignItems: 'center'
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        fontStyle: 'italic',

    },
});

export default SplashScreen;
