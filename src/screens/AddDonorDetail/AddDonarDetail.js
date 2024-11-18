import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, DonarIndex, Pressable, Linking, phoneNumber, copyPhoneNumber, Alert, ActivityIndicator } from "react-native";
import { backArrow } from "../../themes/images";
import { map } from "../../themes/images";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
function AddDonarDetailSc() {

  const navigation = useNavigation();

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [blood_group, setBlood_Group] = useState('');
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({})


  const BloodGroup = [
    { id: '1', name: 'A+' },
    { id: '2', name: 'B+' },
    { id: '3', name: 'O+' },
    { id: '4', name: 'AB+' },
    { id: '5', name: 'A-' },
    { id: '6', name: 'B-' },
    { id: '7', name: 'O-' },
    { id: '8', name: 'AB-' },

  ];

  const getUserData = async () => {
    try {

      const res = await AsyncStorage.getItem('user');

      const result = await JSON.parse(res);

      setUserData(result.user)
      // console.log(result.user)

    } catch (error) {
      console.log('Error Found at Screen AddDonorDetail while getting User Data', error)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const handleNewDonar = async () => {
    const API = "https://app.infolaravel.com/api/app/donors-create";

    if (!name || !city || !phone || !date || !blood_group) {
      Alert.alert('All Fields are required!');
      return;
    }

    setLoader(true);

    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          city: city.trim(),
          phone: phone.trim(),
          date: date.trim(),
          blood_group: blood_group.trim(),
          user_id: userData.id
        })
      });


      if (response.ok) {
        try {

          // console.log(userData.id)
          const data = await response.json();
          Alert.alert('Success.', 'Donors Detail Added Successfully');
          // console.log(data)
          navigation.navigate('DonarScreen');

        } catch (jsonError) {

          console.log('JSON Parsing Error:', jsonError);
          Alert.alert('Error', 'Unexpected response format from server.');
        }
      } else {

        console.log('Server Response Error:', response);
        Alert.alert('Error Found.', 'Please Write Date in this Format : 0000-00-00');

      }
    } catch (error) {

      console.log('Fetch Error:', error);
      Alert.alert('Try Again!', 'Temporary Error Found. Please Try Again Later.');

    } finally {

      setLoader(false);
    }
  };



  return (
    <View style={{ flex: 1, }}>

      <View style={{ height: 90, width: '100%', backgroundColor: '#EB3738', justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ width: '85%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: 7, height: 7, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('DonarScreen')}>
            <Image source={backArrow} style={{ tintColor: 'white' }} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontWeight: '400', fontSize: 22, marginLeft: '10%' }}>DONAR DETAIL</Text>
        </View>
      </View>

      <View style={{ width: '80%', height: 320, alignSelf: 'center', marginTop: "1%" }}>
        <Text style={{ marginTop: "8%", color: 'black', fontSize: 10 }}>Full NAME</Text>
        <View style={{ height: "11%", width: '100%', borderBottomWidth: 0.5 }}>
          <TextInput
            placeholder="TYPE YOUR NAME "
            style={{ fontSize: 10 }}
            value={name}
            onChangeText={val => setName(val)}
          />
        </View>
        <Text style={{ marginTop: "8%", color: 'black', fontSize: 10 }}>City</Text>
        <View style={{ height: "11%", width: '100%', borderBottomWidth: 0.5 }}>
          <TextInput
            placeholder="TYPE YOUR CITY "
            style={{ fontSize: 10 }}
            value={city}
            onChangeText={val => setCity(val)}
          />
        </View>
        <Text style={{ marginTop: "8%", color: 'black', fontSize: 10 }}>PHONE</Text>
        <View style={{ height: "11%", width: '100%', borderBottomWidth: 0.5 }}>
          <TextInput
            placeholder="TYPE PHONE NUMBER "
            style={{ fontSize: 10 }}
            value={phone}
            onChangeText={val => setPhone(val)}
            keyboardType='phone-pad'
          />
        </View>
        <Text style={{ marginTop: "8%", color: 'black', fontSize: 10 }}> DATE</Text>
        <View style={{ height: "11%", width: '100%', borderBottomWidth: 0.5 }}>
          <TextInput
            placeholder="2023-12-12"
            style={{ fontSize: 10 }}
            value={date}
            onChangeText={val => setDate(val)}
          />
        </View>

      </View>

      <View>
        <Text style={{ color: 'black', width: '80%', marginTop: '1%', alignSelf: 'center' }}>Blood Groups</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10, width: '86%', alignSelf: 'center' }}>
        {BloodGroup.map((group) => (
          <TouchableOpacity
            key={group.id}
            onPress={() => { setSelectedGroup(group.id); setBlood_Group(group.name) }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 35,
              height: 20,
              borderWidth: 1,
              borderColor: selectedGroup === group.id ? '#EB3738' : 'red',
              backgroundColor: selectedGroup === group.id ? '#EB3738' : 'white',
              margin: 5,
              borderRadius: 5
            }}>
            <Text style={{ color: selectedGroup === group.id ? 'white' : '#EB3738', fontSize: 12, fontWeight: '600' }}>{group.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ color: 'black', width: '80%', alignSelf: 'center' }}>Location</Text>
      {/* <TouchableOpacity style={{ width: '80%', height: "15%", marginTop: '1%', alignSelf: 'center', justifyContent: 'center' }}>
        <Image
          source={map}

          // source={require('../image/Assets/map.png')}

          style={{ width: '100%', height: '100%', borderRadius: 10 }} />

      </TouchableOpacity> */}
      <View style={{ width: "80%", height: 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ width: "80%", height: '30%', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}
          onPress={handleNewDonar}>
          <Text style={{ color: 'white', fontWeight: '800', fontSize: 15 }}>SAVE</Text>
        </TouchableOpacity>
      </View>

      {
        loader &&
        <View style={styles.absolute}>
          <ActivityIndicator color={'red'} size={200} />
        </View>
      }

    </View>

  )
}


export default AddDonarDetailSc;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(120,120,120,0.6)'
  }
})
