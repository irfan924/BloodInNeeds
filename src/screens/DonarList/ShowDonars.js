import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Donors} from './data';
import {items} from './data';
import {styles} from './styles';
import { backArrow } from '../../themes/images';
import { useNavigation } from '@react-navigation/native';


const RenderItems = ({item}) => {
  const navigation=useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={() => navigation.navigate('DonarDetailScreen',{item})}>
          <View style={styles.itemDetails}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{item.city}</Text>
              <Text style={styles.itemText}>{item.contact}</Text>
              <Text style={styles.itemText}>{item.bloodGroup}</Text>
            </View>
          </View>
          <View style={styles.bloodGroupContainer}>
            <View style={styles.bloodGroupBox}>
              <Text style={styles.bloodGroupText}>B+</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

function DonarScreen({navigation}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();

  return (
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
            setValue={setCurrentValue}
            maxHeight={200}
            autoScroll
            placeholder="SEARCH BY CITY"
            placeholderStyle={styles.dropdownPlaceholder}
            showArrowIcon
            showTickIcon
            theme="LIGHT"
          />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>SEARCH</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={Donors}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <RenderItems item={item} />}
        />
      </View>
    </View>
  );
}

export default DonarScreen;
