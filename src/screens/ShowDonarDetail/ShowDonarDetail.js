import React, { useState } from "react";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, DonarIndex, Pressable,Linking ,phoneNumber,copyPhoneNumber} from "react-native";
import { backArrow } from "../../themes/images";
import { map } from "../../themes/images";
import { whatsapp1 } from "../../themes/images";
import { gmail1 } from "../../themes/images";
import { phone1 } from "../../themes/images";
import { copy1 } from "../../themes/images";
import { useNavigation } from "@react-navigation/native";


function DonarDetailScreen({route}) {
  const navigation=useNavigation();
  const {item}= route.params;
  const [showContact,setShowContact]=useState(false);

 
  
  return (
    <View style={{ flex: 1, }}>

      <View style={{ height: "10%", width: '100%', backgroundColor: '#EB3738', justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ width: '85%', height: '100%', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: 7, height: 7, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('DonarScreen')}>

            <Image source={backArrow} style={{ tintColor: 'white' }} />

          </TouchableOpacity>
          <Text style={{ color: 'white', fontWeight: '400', fontSize: 22, marginLeft: '10%' }}>DONAR DETAIL</Text>
        </View>
      </View>

      <Text style={{ color: 'black', width: '80%', borderBottomWidth: 0.9, alignSelf: 'center', marginTop: '10%' }}>Name: {item.name}</Text>
      <Text style={{ color: 'black', width: '80%', borderBottomWidth: 0.9, alignSelf: 'center', marginTop: '9%' }}>Location: {item.city} </Text>
      <Text style={{ color: 'black', width: '80%', borderBottomWidth: 0.9, alignSelf: 'center', marginTop: '9%' }}>Number:  {item.contact}</Text>
      <Text style={{ color: 'black', width: '80%', borderBottomWidth: 0.9, alignSelf: 'center', marginTop: '9%' }}>Date: {item.Date} </Text>
       
      <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', marginTop: '9%', justifyContent: 'space-between' }}>
        <Text style={{ color: 'black' }}>Blood Group</Text>

        <View style={{ backgroundColor: '#EB3738', width: '10%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}> {item.bloodGroup}</Text>
        </View>
      </View>
      <TouchableOpacity style={{ width: '80%', height: "18%" , marginTop: '8%',alignSelf:'center'}}
      >
          <Image source={map} style={{width:'100%',height:'100%',borderRadius:10}}/>
      
      </TouchableOpacity>
      <View style={{height:'16%',width:'90%',alignSelf:'center',alignItems:'flex-end',flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity style={{height:'40%',width:'48%',backgroundColor:'#EB3738',borderRadius:10,alignItems:'center',justifyContent:'center'}}
        onPress={()=>setShowContact(!showContact)}>
         <Text style={{color:'white',fontWeight:'600',fontSize:15}}>CONTACT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:'40%',width:'48%',backgroundColor:'#EB3738',borderRadius:10,justifyContent:'center',alignItems:'center'}}
        onPress={()=>navigation.navigate('MessageScreen')}>
        <Text style={{color:'white',fontWeight:'600',fontSize:15}}>LEAVE A MESSAGE</Text>
        </TouchableOpacity>
      </View>
      

       { showContact && (<View style={{width:'100%',height:'28%',alignItems:'center',position:'absolute',bottom:0,alignItems:'center',elevation:2,backgroundColor:'white',elevation:3}}>
        <TouchableOpacity style={{width:'50%',height:'15%',backgroundColor:'#EB3738',borderRadius:10,marginTop:"2%",justifyContent:'center',alignItems:'center'}}
        onPress={()=>setShowContact(false)}>
          <Text style={{ color:'white',fontWeight:'600'}}>CANCEL CONTACT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height:'18%',width:'90%',flexDirection:'row',alignItems:'center'}}>
          <Image source={whatsapp1}/>
          <Text style={{marginLeft:'8%',color:'black'}}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:'18%',width:'90%',flexDirection:'row',alignItems:'center'}}>
          <Image source={gmail1}/>
          <Text style={{marginLeft:'8%',color:'black'}}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height:'18%',width:'90%',flexDirection:'row',alignItems:'center'}}>

          <Image source={phone1}/>

          <Text style={{marginLeft:'8%',color:'black'}}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height:'18%',width:'90%',flexDirection:'row',alignItems:'center'}}>
          <Image source={copy1}/>
          <Text style={{marginLeft:'8%',color:'black'}}>Copy Phone Number</Text>
        </TouchableOpacity>
        
       

      </View>
            )}

    </View>

  )
}


export default DonarDetailScreen;
