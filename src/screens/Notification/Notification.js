import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { backArrow, rightarrow2 } from "../../themes/images";

function NotificationScreen({ navigation }) {
   const [selectedDonarIndex, setSelectedDonarIndex] = useState(null);

   const DonarList = [
    {id : '1', name: 'Hunain Ali', city: 'Karachi', number: '0305-3917729', bloodGroup: 'B+',Date: '01/04/2024', source: rightarrow2 },
    {id : '2', name: 'Abdul Majeed', city: 'Lahore', number: '0321-4394530', bloodGroup: 'B+' ,Date: '06/02/2024', source:rightarrow2 },
    {id : '3', name: 'Muhammad Junaid', city: 'Rahim Yar Khan', number: '0300-1122347', bloodGroup: 'O+',Date: '24/03/2024' , source: rightarrow2 },
    {id : '4', name: 'Esha Saeed', city: 'Rajan Pur', number: '0325-8987534', bloodGroup: 'O-',Date: '18/02/2024', source: rightarrow2 },
     ];

  const handleDonarSelection = (donarIndex) => {
    setSelectedDonarIndex(donarIndex);
    navigation.navigate('ShowRequestMessageScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
            <Image source={backArrow} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerText}>All REQUESTS</Text>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.donarList}>
          {DonarList.map((donar, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.donarCard,
                { borderColor: selectedDonarIndex === index ? 'blue' : '#EB3738' }
              ]}
              onPress={() => handleDonarSelection(index)}
            > 
              <View style={styles.donarInfo}>
                <Text style={styles.donarText}>{donar.name}</Text>
                <Text style={styles.donarText}>{donar.city}</Text>
                <Text style={styles.donarText}>{donar.number}</Text>
                <Text style={styles.donarText}>{donar.Date}</Text>
              </View>
              <View style={styles.bloodInfo}>
                <View style={styles.bloodGroup}>
                  <Text style={styles.bloodGroupText}>{donar.bloodGroup}</Text>
                </View>
                <Image source={donar.source} style={styles.rightArrow} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "10%",
    width: '100%',
    backgroundColor: '#EB3738',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    width: '85%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButton: {
    width: 7,
    height: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    tintColor: 'white',
  },
  headerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 22,
    marginLeft: '10%',
  },
  donarList: {
    width: '93%',
    alignSelf: 'center',
    marginBottom: '10%',
    marginTop: '5%',
  },
  donarCard: {
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: '5%',
    borderRadius: 5,
    padding: '2%',
  },
  donarInfo: {
    width: '81%',
  },
  donarText: {
    color: 'black',
    marginBottom: '2%',
  },
  bloodInfo: {
    width: '19%',
    marginTop: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EB3738',
    width: '50%',
    borderRadius: 5,
  },
  bloodGroupText: {
    color: 'white',
    padding: '4%',
  },
  rightArrow: {
    tintColor: '#EB3738',
    marginTop: '42%',
  },
});

export default NotificationScreen;
