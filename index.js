/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';

async function initializeFirebase() {
    const isFirebaseInitialized = messaging().isDeviceRegisteredForRemoteMessages;
    if (!isFirebaseInitialized) {
        await messaging().registerDeviceForRemoteMessages();
    }
    console.log('Firebase initialized successfully');
}

initializeFirebase();

AppRegistry.registerComponent(appName, () => App);
