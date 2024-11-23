import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backArrow } from '../../themes/images'; // Ensure the image path is correct

const Chat = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { donorId, donorUserId } = route.params;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const chatId = donorId ? donorId?.toLocaleString() : 'default_chat_id'

    const getUserData = useCallback(async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            const parsedData = JSON.parse(userData);
            setCurrentUser(parsedData?.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, []);

    // const setupFCM = async () => {
    //     try {
    //         const authStatus = await messaging().requestPermission();
    //         const isAuthorized =
    //             authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //             authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //         console.log('FCM Authorization Status:', authStatus);

    //         if (isAuthorized) {
    //             const fcmToken = await messaging().getToken();
    //             console.log('FCM Token:', fcmToken);

    //             if (fcmToken && currentUser?.id) {
    //                 await firestore()
    //                     .collection('users')
    //                     .doc(currentUser?.id.toString())
    //                     .set({ fcmToken }, { merge: true });
    //             }

    //             messaging().onTokenRefresh(async (newToken) => {
    //                 console.log('FCM Token Refreshed:', newToken);
    //                 await firestore()
    //                     .collection('users')
    //                     .doc(currentUser?.id.toString())
    //                     .set({ fcmToken: newToken }, { merge: true });
    //             });
    //         } else {
    //             Alert.alert('Notification Permission', 'Please enable notifications for this app.');
    //         }

    //         // Foreground notifications
    //         messaging().onMessage(async (remoteMessage) => {
    //             console.log('Foreground Notification Received:', remoteMessage);
    //             displayNotification(remoteMessage);
    //         });

    //         // Background/killed state notifications
    //         messaging().onNotificationOpenedApp((remoteMessage) => {
    //             console.log('Notification Opened:', remoteMessage);
    //             handleNotificationNavigation(remoteMessage);
    //         });

    //         const initialNotification = await messaging().getInitialNotification();
    //         if (initialNotification) {
    //             console.log('Initial Notification:', initialNotification);
    //             handleNotificationNavigation(initialNotification);
    //         }
    //     } catch (error) {
    //         console.error('Error setting up FCM:', error);
    //     }
    // };

    useEffect(() => {
        getUserData();
        // setupFCM();

        const unsubscribe = firestore()
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((querySnapshot) => {
                const parsedMessages = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(parsedMessages);
            });

        return () => unsubscribe();
    }, [chatId, getUserData]);
    const displayNotification = async (remoteMessage) => {
        await notifee.displayNotification({
            title: remoteMessage.notification?.title || 'New Message',
            body: remoteMessage.notification?.body || 'You have a new message!',
            android: {
                channelId: 'default',
                smallIcon: 'ic_launcher', // Replace with your app's small icon
                pressAction: {
                    id: 'default',
                    launchActivity: 'default',
                },
            },
        });
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            text: newMessage,
            sender: currentUser?.id || 'unknown',
            receiver: donorId || 'unknown',
            timestamp: Date.now(),
        };

        try {
            await firestore()
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .add(messageData);

            const recipientId = donorUserId;

            if (recipientId) {
                try {
                    const response = await fetch('https://app.infolaravel.com/api/send-notification', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            message: newMessage,
                            sender_id: currentUser.id,
                            receiver_id: recipientId,
                            doc_id: donorId,
                        }),
                    });

                    if (!response.ok) {
                        return Alert.alert('Error While Sending Notification', `Status: ${response.status}`);
                    }
                    await AsyncStorage.setItem('senderIds', JSON.stringify({
                        sender_id: currentUser.id,
                        receiver_id: recipientId,
                    }))
                    const result = await response.json();
                    // console.log('Notification sent successfully:', result);
                } catch (error) {
                    // console.error('Error while sending notification:', error);
                    Alert.alert('Error', 'Something went wrong. Please try again.');
                }

            } else {
                console.warn('Recipient FCM token not found.');
            }
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    const renderMessage = ({ item }) => {
        const isCurrentUser = item.sender === currentUser?.id;
        const formattedTime = item.timestamp
            ? new Date(item.timestamp).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })
            : 'N/A';

        return (
            <View
                style={[
                    styles.messageContainer,
                    isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
                ]}
            >
                <Text style={styles.senderId}>
                    {isCurrentUser ? 'You' : `User: ${item.sender}`}
                </Text>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>{formattedTime}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={backArrow} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>ChatBox</Text>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.messageList}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Write a message"
                    placeholderTextColor="#fff"
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F95454',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 16,
    },
    backButton: {
        justifyContent: 'center',
    },
    backIcon: {
        tintColor: 'white',
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 25,
        color: 'white',
        marginLeft: 20,
    },
    messageList: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexGrow: 1,
    },
    messageContainer: {
        marginVertical: 5,
        maxWidth: '75%',
        padding: 10,
        borderRadius: 10,
    },
    currentUserMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#F0A8D2',
    },
    otherUserMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#F0F0F0',
    },
    senderId: {
        fontSize: 12,
        color: '#555',
        marginBottom: 5,
    },
    messageText: {
        fontSize: 16,
        color: 'black',
    },
    timestamp: {
        fontSize: 10,
        color: '#555',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    textInput: {
        flex: 1,
        backgroundColor: '#F0A8D0',
        borderRadius: 20,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    sendButtonText: {
        color: '#F95454',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Chat;
