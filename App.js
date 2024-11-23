import React, { useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from './src/screens/Authentication/splash/Splash';
import SignScreen from './src/screens/Authentication/Login/Sign';
import SignUpScreen from './src/screens/Authentication/signUp/SignUp1';
import EmailScreen from './src/screens/WEmail/WEmail';
import HomeScreen from './src/screens/Home/Home';
import DonarScreen from './src/screens/DonarList/ShowDonars';
import AddDonarDetailSc from './src/screens/AddDonorDetail/AddDonarDetail';
import ProfileScreen from './src/screens/profileD/ProfileD';
import VerifyEmailScreen from './src/screens/VEmail/VEmail';
import NScreen from './src/screens/Npass/Npass';
import DonarDetailScreen from './src/screens/ShowDonarDetail/ShowDonarDetail';
import MessageScreen from './src/screens/Message/Message';
import NotificationScreen from './src/screens/Notification/Notification';
import ShowRequestMessageScreen from './src/screens/ShowRequestMessage/ShowRequestMessage';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicy/PrivacyPolicy';
import Chat from './src/screens/chat';
import { GoogleLoginWebView } from './src/screens/googl-login';
import Notifications from './src/screens/notifications';

const App = () => {
  const Stack = createNativeStackNavigator();

  // Create a ref for navigation
  const navigationRef = useRef();

  useEffect(() => {
    const handleDeepLink = (event) => {
      const url = event.url || '';
      const parsed = new URL(url);

      // Example: myapp://auth?token=abc123
      const path = parsed.pathname; // "/auth"
      const token = parsed.searchParams.get('token'); // "abc123"

      if (path === '/auth' && token && navigationRef.current) {
        // Navigate to HomeScreen when token exists
        console.log('Token:', token);
        navigationRef.current.navigate('HomeScreen');
      }
    };

    // Listen for deep links
    const subscription = Linking.addListener('url', handleDeepLink);

    // Check if the app was opened with a deep link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove(); // Clean up listener
  }, []);

  const linking = {
    prefixes: ['myapp://'],
    config: {
      screens: {
        SplashScreen: '',
        SignScreen: 'signin',
        SignUpScreen: 'signup',
        HomeScreen: 'home',
        DonarScreen: 'donars',
        DonarDetailScreen: 'donar-detail',
        Chat: 'chat',
        MessageScreen: 'messages',
        AddDonarDetailSc: 'add-donar',
        NotificationScreen: 'notifications',
        ShowRequestMessageScreen: 'request-message',
        ProfileScreen: 'profile',
        PrivacyPolicyScreen: 'privacy-policy',
        Notifications: 'notifications',
      },
    },
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignScreen" component={SignScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GoogleLoginWebView" component={GoogleLoginWebView} options={{ headerShown: false }} />
        <Stack.Screen name="EmailScreen" component={EmailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NScreen" component={NScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DonarScreen" component={DonarScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DonarDetailScreen" component={DonarDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddDonarDetailSc" component={AddDonarDetailSc} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ShowRequestMessageScreen" component={ShowRequestMessageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
