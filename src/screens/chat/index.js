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
import { firebase } from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';
import { backArrow } from '../../themes/images'; // Ensure the image path is correct

const Chat = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { donorId, donorUserId } = route.params;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const chatId = donorId
        ? `${donorUserId}_chat_with_${currentUser?.id}`
        : 'default_chat_id';

    const getUserData = useCallback(async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            const parsedData = JSON.parse(userData);
            setCurrentUser(parsedData?.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, []);

    const setupFCM = async () => {
        try {
            console.log("Setting up FCM...");

            // Request user permissions for notifications
            const authStatus = await messaging().requestPermission();
            console.log("FCM Authorization Status:", authStatus);

            const isAuthorized = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            console.log('isAuthorized', isAuthorized)

            if (isAuthorized) {
                // Get FCM token
                const fcmToken = await messaging().getToken();
                console.log("FCM Token:", fcmToken);
                console.log("User ID:", currentUser?.id);

                if (!fcmToken || !currentUser?.id) {
                    return console.log('Missing FCM token or User ID', fcmToken, currentUser?.id)
                }

                let token = fcmToken;
                let userId = currentUser?.id.toLocaleString();
                // console.log('typeof User Id', typeof(userId))
                try {
                    await firestore()
                        .collection('users')
                        .doc(userId)
                        .set({ fcmToken: token }, { merge: true })
                        .then(() => console.log("Test Firestore write successful."))
                        .catch((error) => console.log("Test Firestore write failed:", error));
                } catch (error) {
                    console.log("Firestore write error of Token:", error);
                }
            } else {
                console.warn("FCM Authorization denied or not granted provisionally.");
            }

            // Handle notifications while the app is in the foreground
            const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
                try {
                    console.log("Foreground Notification Received:", remoteMessage);
                    displayNotification(remoteMessage);
                } catch (err) {
                    console.error("Error handling foreground notification:", err);
                }
            });

            // Return the unsubscribe function for cleanup
            return unsubscribeOnMessage;

        } catch (error) {
            console.error("Error setting up FCM:", error);

            // Additional debugging for `relativePath.split`
            if (error.message.includes("relativePath.split")) {
                console.error("Potential misconfiguration in Firebase setup. Check the following:");
                console.error("- Ensure `google-services.json` is correctly placed in `android/app/`.");
                console.error("- Verify Firebase SDK versions are compatible.");
                console.error("- Check for missing or invalid dependencies in `build.gradle`.");
            }
        }
    };

    useEffect(() => {
        getUserData();
        setupFCM();
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
            },
        });
    };

    // Create notification channel for Android
    useEffect(() => {
        const createNotificationChannel = async () => {
            await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
                importance: notifee.AndroidImportance?.HIGH,
            });
        };

        createNotificationChannel();
    }, []);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            text: newMessage,
            sender: currentUser?.id || 'unknown',
            receiver: donorId || 'unknown',
            timestamp: Date.now(),
        };

        try {
            // Save message to Firestore
            await firestore()
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .add(messageData)
                .then(() => {
                    console.log('Message Saved in Firestore Database');
                })
                .catch(() => {
                    console.log('Error Found While Saving Message In Firestore Database')
                })

            // Send FCM notification to the receiver
            const recipientId = donorId.toLocaleString();
            const recipientSnapshot = await firestore()
                .collection('users')
                .doc(recipientId)
                .get();
            // .then((res) => {
            //     const recipientToken = res.data()?.fcmToken;
            //     console.log('recipientToken : ', recipientToken)
            //     console.log('Successfully Run Send Notification To reciever');
            // })
            // .catch(() => {
            //     console.log('Error Found While Sending Notification To reciever')
            // })
            const recipientToken = recipientSnapshot?.data()?.fcmToken;

            if (!recipientToken) {
                return console.log('Error Found While Sending Notification To reciever')
            }

            try {
                await messaging().sendMessage({
                    to: recipientToken,
                    notification: {
                        title: 'New Message',
                        body: newMessage,
                    },
                    data: {
                        chatId,
                        senderId: currentUser.id.toLocaleString(),
                    },
                });
                console.log('Done')
            } catch (error) {
                console.log('Error sending FCM message:', error);
            }

            setNewMessage('');
        } catch (error) {
            console.log('Error sending message:', error);
        }
    };

    // Render each message in the FlatList
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
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Image source={backArrow} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>ChatBox</Text>
            </View>

            {/* Chat Messages */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.messageList}
            />

            {/* Message Input */}
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
        backgroundColor: '#F0A8D2'
    },
    otherUserMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#F0F0F0',
    },
    senderId: {
        fontSize: 12,
        color: 'white',
        marginBottom: 5,
    },
    messageText: {
        fontSize: 16,
        color: 'black',
        marginVertical: 4
    },
    timestamp: {
        fontSize: 10,
        color: '#fff',
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
