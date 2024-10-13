import React, { useState } from "react";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, DonarIndex, Pressable, Linking, phoneNumber, copyPhoneNumber } from "react-native";
import { backArrow } from "../../themes/images";
import { map } from "../../themes/images";
function AddDonarDetailSc({ navigation }) {

  const [selectedGroup, setSelectedGroup] = useState(null);

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
          <TextInput placeholder="TYPE YOUR NAME " style={{ fontSize: 10 }} />
        </View>
        <Text style={{ marginTop: "8%", color: 'black', fontSize: 10 }}>City</Text>
        <View style={{ height: "11%", width: '100%', borderBottomWidth: 0.5 }}>
          <TextInput placeholder="TYPE YOUR CITY " style={{ fontSize: 10 }} />
        </View>
        <Text style={{ marginTop: "8%", color: 'black', fontSize: 10 }}>PHONE</Text>
        <View style={{ height: "11%", width: '100%', borderBottomWidth: 0.5 }}>
          <TextInput placeholder="TYPE PHONE NUMBER " style={{ fontSize: 10 }} />
        </View>
        <Text style={{ marginTop: "8%", color: 'black', fontSize: 10 }}>LAST DONATE DATE</Text>
        <View style={{ height: "11%", width: '100%', borderBottomWidth: 0.5 }}>
          <TextInput placeholder="12/12/2023" style={{ fontSize: 10 }} />
        </View>

      </View>

       <View>
        <Text style={{color:'black',width:'80%',marginTop:'1%',alignSelf:'center'}}>Blood Groups</Text>
       </View>
       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 ,width:'86%',alignSelf:'center'}}>
        {BloodGroup.map((group) => (
          <TouchableOpacity
            key={group.id}
            onPress={() => setSelectedGroup(group.id)}
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
            <Text style={{color: selectedGroup === group.id ? 'white' : '#EB3738',fontSize:12,fontWeight:'600'}}>{group.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{color:'black',width:'80%',alignSelf:'center'}}>Location</Text>
      <TouchableOpacity style={{ width: '80%', height: "15%", marginTop: '1%', alignSelf: 'center',justifyContent:'center' }}>
        <Image   
        source={map}

       // source={require('../image/Assets/map.png')}

         style={{ width: '100%', height: '100%', borderRadius: 10 }} />

      </TouchableOpacity>
      <View style={{width:"80%",height:100,alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
       <TouchableOpacity style={{width:"80%",height:'30%',backgroundColor:'red',justifyContent:'center',alignItems:'center'}}
       onPress={()=>navigation.navigate('HomeScreen')}>
        <Text style={{color:'white',fontWeight:'800',fontSize:15}}>SAVE</Text>
       </TouchableOpacity>
      </View>



    </View>

  )
}


export default AddDonarDetailSc;
