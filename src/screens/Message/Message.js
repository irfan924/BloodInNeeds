import React, { useState } from "react";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View,StyleSheet, ScrollView,DonarIndex } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { backArrow } from "../../themes/images";

function MessageScreen({ navigation }) {

  return (
    <View style={{ flex: 1, }}>

      <View style={{ height: "10%", width: '100%', backgroundColor: '#EB3738', justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ width: '85%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: 7, height: 7, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('DonarScreen')}>
            <Image source={backArrow} style={{ tintColor: 'white' }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width:'88%',height:'50%',alignSelf:'center',backgroundColor:'white',marginTop:'10%',elevation:10}}>
        <TextInput 
         multiline
        placeholder="TYPE YOUR MESSAGE HERE" 
        placeholderTextColor="#A9A9A9"
        style={{width:'95%',alignSelf:'center',alignSelf:'center',fontStyle:'italic'}}>

        </TextInput>

      </View>
      <View style={{width:'88%',height:'25%',marginTop:'9%',justifyContent:'space-between',alignSelf:'center'}}>
       <TouchableOpacity style={{justifyContent:'center',alignItems:'center',backgroundColor:'#EB3738',width:'40%',height:'17%',alignSelf:'center',borderRadius:10}}
       onPress={()=>navigation.navigate('HomeScreen')}>
        <Text style={{color:'white',fontWeight:'400',fontSize:20}}>SUBMIT</Text>
       
       </TouchableOpacity>
       <Text style={{alignSelf:'center'}}>@ 2015-2024 BlOOD IN NEED</Text>
      </View>
     

       
     


    </View>

  )
}


export default MessageScreen;
