import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// import { Donors } from './data';
import { items } from './data';
import { styles } from './styles';
import { backArrow } from '../../themes/images';
import { useNavigation, useRoute } from '@react-navigation/native';


const RenderItems = ({ item }) => {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={() => navigation.navigate('DonarDetailScreen', { item })}>
          <View style={styles.itemDetails}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}>{item?.name}</Text>
              <Text style={styles.itemText}>{item?.city}</Text>
              <Text style={styles.itemText}>{item?.phone}</Text>

              <Text style={styles.itemText}>{item?.date}</Text>
            </View>
          </View>
          <View style={styles.bloodGroupContainer}>
            <View style={styles.bloodGroupBox}>
              <Text style={styles.bloodGroupText}>{item?.blood_group}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

function DonarScreen() {

  const navigation = useNavigation();
  const route = useRoute();

  const { blood_group } = route?.params;

  // ;(()=>{console.log(blood_group)})()

  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');

  const [donarsList, setDonarsList] = useState([]);
  const [searchingList, setSearchingList] = useState([])
  const [loader, setLoader] = useState(false)

  const getDonars = async () => {
    const API = `https://app.infolaravel.com/api/app/donors-list/${blood_group ? blood_group : 'O+'}`;

    try {
      setLoader(true);

      const response = await fetch(API);

      if (!response.ok) {

        console.log('Server Response Status:', response.status, response.statusText);
        throw new Error('Failed to fetch donors. Server returned an error.');
      }

      const data = await response.json();

      setDonarsList(data.data)

      // console.log('Donors List : ', data)

    } catch (error) {

      console.log('Fetch Error:', error);
      Alert.alert('Error Found.', 'Temporary Error Found. Please Try Again Later.');

    } finally {
      setLoader(false);
    }
  };

  const searchResponse = async () => {

    try {

      setLoader(true)
      const response = await fetch(`https://app.infolaravel.com/api/app/search?city=${currentValue}`)

      if (!response) {
        return console.warn('Error Found! while getting Response')
      }

      let data = await response.json();

      if (Array.isArray(data) && data.length === 0) {
        return (
          Alert.alert('Dose not Match! No Data Found'),
          setSearchingList([])
        )
      }

      setSearchingList(data)


    } catch (error) {
      console.warn('Error Found!...')
    } finally {
      setLoader(false)
    }

  }


  useEffect(() => {
    getDonars();
  }, [])

  return (
    !loader ?
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('HomeScreen')}>
              <Image
                source={backArrow}
                style={styles.backArrow}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>All DONORS</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              items={items}
              style={styles.dropdown}
              open={isOpen}
              setOpen={() => setIsOpen(!isOpen)}
              value={currentValue}
              setValue={(val) => setCurrentValue(val)}
              maxHeight={200}
              autoScroll
              placeholder="SEARCH BY CITY"
              placeholderStyle={styles.dropdownPlaceholder}
              showArrowIcon
              showTickIcon
              theme="LIGHT"
            />
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={searchResponse}
          >
            <Text style={styles.searchButtonText}>
              Search
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {
            searchingList &&
            <FlatList
              data={searchingList}
              keyExtractor={item => item?.id.toString()}
              renderItem={({ item }) => <RenderItems item={item} />}
            />
          }
          {
            searchingList.length <= 0 && donarsList &&
            <FlatList
              data={donarsList}
              keyExtractor={item => item?.id.toString()}
              renderItem={({ item }) => <RenderItems item={item} />}
            />

          }
        </View>
      </View>
      :
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
      }}>
        <ActivityIndicator size={50} color='red' />
      </View>
  );
}

export default DonarScreen;
