import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const Notifications = () => {

  const route = useRoute();
  const navigation = useNavigation();

  const { userId } = route?.params;


  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {

      const API = `https://app.infolaravel.com/api/user-notifications/${userId}`

      const res = await fetch(API);

      const data = await res.json();

      // console.log(data.notofications);

      setNotifications(data.notifications);

    } catch (error) {
      console.log('Error Found : ', error)
    }
  }

  useEffect(() => {
    getNotifications();
  }, [])

  // Render each notification item
  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationCard}
      onPress={() => {
        navigation.navigate('Chat', { donorId: item.doc_id, donorUserId: item.receiver_id })
      }}
    >
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.receiverText}>Sender ID: {item.sender_id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {
        notifications ?
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            contentContainerStyle={styles.listContainer}
          />
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../Assets/image/empty.jpg')}
              style={{ width: 200, height: 200 }}
            />
          </View>
      }
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // Light background
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark text color
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Adds shadow on Android
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 8,
  },
  receiverText: {
    fontSize: 14,
    color: '#666', // Subtle color for secondary text
  },
});
