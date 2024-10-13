import React from "react";
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { backArrow } from "../../themes/images";
import { BloodDonation2 } from "../../themes/images";
function PrivacyPolicyScreen({ navigation }) {

    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)',justifyContent:'space-between' }}>
            <View style={{ height: '25%', backgroundColor: '#EB3738',width:'100%'}}>
               <TouchableOpacity style={{width:'90%',alignSelf:'center',marginTop:"3%"}}
               onPress={()=>navigation.navigate('ProfileScreen')}>
                <Image source={backArrow}/>

               </TouchableOpacity>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{ marginTop: '1%' }}
                    onPress={() => navigation.navigate('SplashScreen')}>
                    <Image source={BloodDonation2} />

                </TouchableOpacity>
                <Text style={{ color: 'white', fontWeight: '400', marginTop: '3%', fontSize: 30 }}>BLOOD IN NEED</Text>
                </View>
            </View>
            <View style={{width:"85%",height:'60%',alignSelf:'center'}}>
                <Text style={{color:'black',fontSize:25,fontWeight:'bold'}}>PRIVACY POLICY</Text>
                <ScrollView>
                <Text style={{flexWrap:'wrap',fontSize:16,color:'black'}}
                multipleline>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                 deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus 
                 error sit voluptatem accusantium
                 doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                 
                 veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque 
                porro quisquam est,
                   qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                    non numquam eius modi tempora incidunt ut labore et dolore
                    magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
                 quis nostrum exercitationem ullam corporis
                 . Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                 deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus 
                 error sit voluptatem accusantium
                 doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                 
                 veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                  consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque 
                porro quisquam est,
                   qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                    non numquam eius modi tempora incidunt ut labore et dolore
                    magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
                 quis nostrum exercitationem ullam corporis
                   
               </Text>
               </ScrollView>
            </View>
            <View style={{height:'10%',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontWeight:'800',fontSize:16}}>@ 2015-2024 BLOOD IN NEED</Text>
            </View>
            
        </View>

  
    )
}
export default PrivacyPolicyScreen;