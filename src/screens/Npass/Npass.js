import React from "react";
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BloodDonation2 } from "../../themes/images";

function NScreen({ navigation }) {

    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView style={{flex:1}}>
        <View style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)'}}>
            <View style={{ height: 200, alignItems: 'center', backgroundColor: '#EB3738', justifyContent:'flex-start'}}>

                <TouchableOpacity style={{ marginTop: '8%' }}
                    onPress={() => navigation.navigate('SplashScreen')}>
                    <Image source={BloodDonation2} />
                </TouchableOpacity>
                <Text style={{ color: 'white', fontWeight: '400', marginTop: '2%', fontSize: 30 }}>BLOOD IN NEED</Text>

            </View>
            <View style={{ height: 400, width: '88%', backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: '-10%', borderRadius: 15, elevation: 5 }}>
            <View style={{ height: '22%', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Text style={{ color: 'black', fontWeight: '400', fontSize: 20 }}>NEW PASSWORD</Text>
                </View>
                <View style={{width:'100%',alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'black'}}>Write Your New Password Here</Text>
                    
                     
                </View>
                <View style={{  width: '85%', alignSelf: 'center' ,marginTop:'7%'}}>
                    <Text style={{ fontWeight: '400', color: 'black' }}>Password</Text>
                    <TextInput placeholder="Type Your New Password" style={{ borderBottomWidth: 1 }} />
                </View>
                
              
                <View style={{ height: '35%', justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity style={{ width: '60%', height: '35%', backgroundColor: '#EB3738', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                    onPress={()=>navigation.navigate('SignScreen')}>
                        <Text style={{ color: 'white', fontWeight: '400' }}>CONFIRM</Text>
                    </TouchableOpacity>
                </View>

             </View>
  
            
        </View>

        </ScrollView>
           </KeyboardAvoidingView>









    )
}
export default NScreen;
