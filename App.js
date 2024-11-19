
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/Authentication/splash/Splash';
import SignScreen from './src/screens/Authentication/Login/Sign';
import SignUpScreen from './src/screens/Authentication/signUp/SignUp1';
import EmailScreen from './src/screens/WEmail/WEmail';
import HomeScreen from './src/screens/Home/Home';
import DonarScreen from './src/screens/DonarList/ShowDonars';

import AddDonarDetailSc from './src/screens/AddDonorDetail/AddDonarDetail';


import ProfileScreen from './src/screens/profileD/ProfileD';

//import EshaDetailScreen from './src/screens/EshaDonorDetail/EshaDonarDetail';
import VerifyEmailScreen from './src/screens/VEmail/VEmail';
import NScreen from './src/screens/Npass/Npass';
import DonarDetailScreen from './src/screens/ShowDonarDetail/ShowDonarDetail';
import MessageScreen from './src/screens/Message/Message';
import NotificationScreen from './src/screens/Notification/Notification';
import ShowRequestMessageScreen from './src/screens/ShowRequestMessage/ShowRequestMessage';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicy/PrivacyPolicy';
import Chat from './src/screens/chat';
import { useEffect } from 'react';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { GoogleLoginWebView } from './src/screens/googl-login';
import Notifications from './src/screens/notifications';

const App = () => {
  const Stack = createNativeStackNavigator();

  // useEffect(() => {
  //   // OneSignal.setAppId('d6d6b0c9-2709-4299-8fd1-6c6e8cb3d527');

  //   OneSignal?.setLogLevel(LogLevel.Verbose);

  //   OneSignal?.setAppId('d6d6b0c9-2709-4299-8fd1-6c6e8cb3d527'); 

  //   OneSignal?.promptForPushNotificationsWithUserResponse(response => {
  //     console.log('User response to push notification permission:', response);
  //   });

  //   OneSignal?.setNotificationOpenedHandler(notification => {
  //     console.log('OneSignal: Notification opened:', notification);
  //   });

  //   OneSignal?.setNotificationReceivedHandler(notification => {
  //     console.log('OneSignal: Notification received:', notification);
  //   });

  //   OneSignal?.addEventListener('notificationOpened', event => {
  //     console.log('OneSignal: Notification clicked:', event);
  //   });

  //   return () => {
  //     OneSignal?.removeEventListener('notificationOpened');
  //   };



  // }, []);



  // async function setupFirebase() {
  //   try {
  //     // Request permissions
  //     const authStatus = await messaging().requestPermission();
  //     // console.log('Authorization status:', authStatus);

  //     // Get FCM token
  //     const token = await messaging().getToken();
  //     // console.log('FCM Token:', token);

  //     // Handle foreground messages
  //     messaging().onMessage(async (remoteMessage) => {
  //       console.log('FCM Message received in foreground:', remoteMessage);

  //       // Show a notification
  //       await notifee.displayNotification({
  //         title: remoteMessage.notification?.title || 'New Notification',
  //         body: remoteMessage.notification?.body || 'You have a new message.',
  //         android: {
  //           channelId: 'default',
  //         },
  //       });
  //     });
  //   } catch (error) {
  //     console.error('Error setting up FCM:', error);
  //   }
  // }


  // useEffect(() => {
  //   // initializeFCM();
  //   setupFirebase();
  //   notifee.registerForegroundService(() => {
  //     return new Promise(() => { });
  //   });
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignScreen' component={SignScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GoogleLoginWebView" component={GoogleLoginWebView} options={{ headerShown: false }} />
        <Stack.Screen name='EmailScreen' component={EmailScreen} options={{ headerShown: false }} />
        <Stack.Screen name='VerifyEmailScreen' component={VerifyEmailScreen} options={{ headerShown: false }} />
        <Stack.Screen name='NScreen' component={NScreen} options={{ headerShown: false }} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='DonarScreen' component={DonarScreen} options={{ headerShown: false }} />
        <Stack.Screen name='DonarDetailScreen' component={DonarDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }} />

        <Stack.Screen name='MessageScreen' component={MessageScreen} options={{ headerShown: false }} />
        <Stack.Screen name='AddDonarDetailSc' component={AddDonarDetailSc} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ShowRequestMessageScreen" component={ShowRequestMessageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>

  )


}
export default App;
