import React, { useState } from "react";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, DonarIndex } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { backArrow } from "../../themes/images";

function ShowRequestMessageScreen({ navigation }) {

  return (
    <View style={{ flex: 1, }}>

      <View style={{ height: "10%", width: '100%', backgroundColor: '#EB3738', justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ width: '85%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: 7, height: 7, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('NotificationScreen')}>

            <Image source={backArrow} style={{ tintColor: 'white' }} />

          </TouchableOpacity>
          <Text style={{ color: 'white', fontWeight: '400', fontSize: 22, marginLeft: '10%' }}>REQUEST MESSAGE</Text>

        </View>
      </View>

      <View style={{ width: '90%', alignSelf: 'center', marginTop: '5%', elevation: 1, height: '75%', backgroundColor: 'white' }}>


        <Text
          multiline
          style={{ color: "black", width: '88%', alignSelf: 'center', marginTop: '4%' }}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

          This is a standard placeholder text commonly used in the design and typesetting industry. It's meant to mimic the structure of real written text but doesn't convey any specific meaning.
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

          This is a standard placeholder text commonly used in the design and typesetting industry. It's meant to mimic the structure of real written text but doesn't convey any specific meaning.


        </Text>

      </View>


      <View style={{ width: '88%', height: '4%', marginTop: '5%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ alignSelf: 'center' }}>@ 2015-2024 BlOOD IN NEED</Text>
      </View>








    </View>

  )
}


export default ShowRequestMessageScreen;
