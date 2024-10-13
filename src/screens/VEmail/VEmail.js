import React from "react";
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { BloodDonation2 } from "../../themes/images";
 
function VerifyEmailScreen({ navigation }) {

    return (
      
          <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView style={{flex:1}}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: 200, alignItems: 'center', backgroundColor: '#EB3738', justifyContent:'flex-start'}}>

                <TouchableOpacity style={{ marginTop: '8%' }}
                    onPress={() => navigation.navigate('SplashScreen')}>
                    <Image source={BloodDonation2} />
                    
                </TouchableOpacity>
                <Text style={{ color: 'white', fontWeight: '400', marginTop: '2%', fontSize: 30 }}>BLOOD IN NEED</Text>

            </View>
            <View style={{ height: 370, width: '88%', backgroundColor: '#FFFFFF', alignSelf: 'center',  marginTop: '-9%', borderRadius: 15, elevation: 5 }}>
            <View style={{ height: '22%', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Text style={{ color: 'black', fontWeight: '400', fontSize: 20 }}>EMAIL VERIFICATION</Text>
                </View>
                <View style={{width:'100%',alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'black'}}>Enter the OTP we have send to your</Text>
                    <Text style={{color:'black'}}>Email : mrmajeedali530@gmail.com</Text>
                     
                </View>
                <View style={{flexDirection:'row', width:'85%', alignSelf:'center', alignItems:'center', justifyContent:'space-between', height:'25%'}}>
    <View style={{width:40, height:40, borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius:6, borderColor:'#EB3738'}}>
        <TextInput style={{textAlign: 'center'}} placeholder="4"/>
    </View>
    <View style={{width:40, height:40, borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius:6, borderColor:'#EB3738'}}>
        <TextInput style={{textAlign: 'center'}} placeholder="6"/>
    </View>
    <View style={{width:40, height:40, borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius:6, borderColor:'#EB3738'}}>
        <TextInput style={{textAlign: 'center'}} placeholder="9"/>
    </View>
    <View style={{width:40, height:40, borderWidth:1, justifyContent:'center', alignItems:'center', borderRadius:6, borderColor:'#EB3738'}}>
        <TextInput style={{textAlign: 'center'}} placeholder="6"/>
    </View>
</View>

                
              
                <View style={{ height: '40%', justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity style={{ width: '60%', height: '35%', backgroundColor: '#EB3738', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
  
                    onPress={()=>navigation.navigate('NScreen')}>
                        <Text style={{ color: 'white', fontWeight: '400' }}>Verify Code</Text>
                    </TouchableOpacity>
                </View>

             </View>
             <View style={{height:230,flexDirection:'column',justifyContent:'space-around',alignItems:'center',marginTop:'15%'}}>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'black',fontWeight:'400'}}>Valid for 4 Mintus :</Text>
                <TouchableOpacity style={{marginLeft:'1%'}}>
                <Text style={{color:'black',fontWeight:'400'}}>02:00</Text>
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'black',fontWeight:'400'}}>Time Out or InValid OTP ?</Text>
                <TouchableOpacity style={{marginLeft:'1%'}}
                onPress={()=>navigation.navigate('EmailScreen')}>
                <Text style={{color:'black',fontWeight:'600'}}>Resend</Text>
                </TouchableOpacity>
                </View>
               
             </View>
        </View>
      

        </ScrollView>
        </KeyboardAvoidingView>  

    




    )
}
export default VerifyEmailScreen;