import React, { useState } from 'react';
import { Linking, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const handleGoogle = async () => {

    try {
        const API = `https://app.infolaravel.com/api/auth/google/redirect`;

        const res = await fetch(API, { method: 'GET' });
        const result = await res.json();

        if (result?.url) {
            // Open the URL in the app or browser
            if (Platform.OS === 'android' || Platform.OS === 'ios') {
                // Navigate to the WebView screen with the URL
                navigation.navigate('GoogleLoginWebView', { url: result.url });
            } else {
                // Open in external browser
                Linking.openURL(result.url);
            }
        } else {
            console.error('No URL received from API.');
        }
    } catch (error) {
        console.log('Error found on login with Google:', error);
    }
};

// Component to handle WebView and navigation
const GoogleLoginWebView = ({ route }) => {
    const { url } = route?.params; // Get URL from navigation params
    const navigation = useNavigation();

    const onNavigationStateChange = (navState) => {
        // Check if the URL contains the callback that indicates completion
        if (navState.url.includes('HomeScreen')) {
            // Close WebView and navigate to the home screen
            navigation.navigate('HomeScreen');
        }
    };

    return (
        <WebView
            source={{ uri: url }}
            onNavigationStateChange={onNavigationStateChange}
            startInLoadingState={true}
            javaScriptEnabled={true}
        />
    );
};

export { handleGoogle, GoogleLoginWebView };
