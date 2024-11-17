import React, { useState, useEffect, useRef } from "react";
import { ImageBackground, Text, TextInput, TouchableOpacity, View, Button, StyleSheet, FlatList, Dimensions, Image } from "react-native";
import { account, BloodHome1, BloodHome2, BloodHome3, adddonar } from "../../themes/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const [data, setData] = useState([{ id: '1' }, { id: '2' }, { id: '3' }]);
  const { height, width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const images = [
    { id: 1, image: BloodHome1 },
    { id: 2, image: BloodHome2 },
    { id: 3, image: BloodHome3 }
  ];

  const keyExtractor = (item) => item.id;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [userLogo, setUserLogo] = useState({})

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


  // const getUserLogo = async () => {
  //   try {

  //     const res = await AsyncStorage.getItem('imageUri');

  //     const result = await JSON.parse(res)
  //     console.log('Image Uri : ', result)
  //     setUserLogo(result)

  //   } catch (error) {
  //     console.log('Error Found', error)
  //   }
  // }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Home</Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('ProfileScreen')}>

            <Image source={account} style={styles.accountIcon} />

          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageSliderContainer}>
        <FlatList
          ref={flatListRef}
          horizontal
          keyExtractor={keyExtractor}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex(Math.round(x / width));
          }}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View style={[styles.imageContainer, { width }]}>
                <Image
                  source={images[index].image}
                  style={styles.sliderImage}
                  resizeMode='stretch'
                />
              </View>
            )
          }}
        />
        <View style={styles.pagination}>
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentIndex === index ? styles.activeDot : styles.inactiveDot
                ]}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.bloodGroupSelection}>
        <Text style={styles.bloodGroupText}>Select any type of Blood Group</Text>
      </View>

      <View style={styles.bloodGroupContainer}>
        {BloodGroup.map((group) => (
          <TouchableOpacity
            key={group.id}
            onPress={() => setSelectedGroup(group.id)}
            style={[
              styles.bloodGroupButton,
              selectedGroup === group.id && styles.selectedBloodGroupButton
            ]}>
            <Text
              style={[
                styles.bloodGroupButtonText,
                selectedGroup === group.id && styles.selectedBloodGroupButtonText
              ]}>
              {group.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => {
            if (selectedGroup !== null) {
              navigation.navigate('DonarScreen');
            } else {
              alert('Please select a blood group.');
            }
          }}>
          <Text style={styles.requestButtonText}>REQUEST</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => {
            if (selectedGroup !== null) {
              navigation.navigate('AddDonarDetailSc');
            } else {
              alert('Please select a blood group.');
            }
          }}>
          <Text style={styles.requestButtonText}>ADD DONAR</Text>

        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: "10%",
    width: '100%',
    backgroundColor: '#EB3738',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContent: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 22
  },
  notificationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 37,
    height: 37,
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 'auto'
  },
  notificationText: {
    color: '#EB3738',
    fontWeight: '800',
    fontSize: 20
  },
  profileButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 37,
    height: 37,
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 10
  },
  accountIcon: {
    tintColor: 'red',
    // width: 50, height: 50, borderRadius: 25
  },
  imageSliderContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 4
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 5
  },
  activeDot: {
    width: 50,
    height: 10,
    backgroundColor: '#EB3738',
  },
  inactiveDot: {
    backgroundColor: 'red'
  },
  bloodGroupSelection: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  bloodGroupText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#EB3738'
  },
  bloodGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center'
  },
  bloodGroupButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 5
  },
  selectedBloodGroupButton: {
    borderColor: '#EB3738',
    backgroundColor: '#EB3738'
  },
  bloodGroupButtonText: {
    color: '#EB3738',
    fontSize: 20,
    fontWeight: 'bold'
  },
  selectedBloodGroupButtonText: {
    color: 'white'
  },
  actionContainer: {
    flexDirection: 'row',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    height: '8%',
    justifyContent: 'space-between'

  },
  requestButton: {
    width: "45%",
    height: "70%",
    backgroundColor: '#EB3738',
    justifyContent: 'center',
    alignItems: 'center',

  },
  requestButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15
  },
  addDonarButton: {
    width: "35%",
    height: "70%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  addDonarIcon: {
    tintColor: '#EB3738'
  },
  addDonarButtonText: {
    color: 'red',
    fontWeight: '600',
    fontSize: 15
  }
});

export default HomeScreen;
