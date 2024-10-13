 import { StyleSheet } from "react-native";
 
 export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: '10%',
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
    backIcon: {
      tintColor: 'white',
    },
    headerTitle: {
      color: 'white',
      fontWeight: '400',
      fontSize: 22,
      marginLeft: '10%',
    },
    searchContainer: {
      width: '93%',
      height: '10%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      alignItems: 'center',
    },
    dropdownContainer: {
      width: '75%',
    },
    dropdown: {
      borderColor: '#EB3738',
    },
    dropdownPlaceholder: {
      color: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchButton: {
      width: '22%',
      height: '59%',
      borderColor: '#EB3738',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
    },
    searchButtonText: {
      color: 'black',
    },
    listContainer: {
      flex: 1,
    },
    itemContainer: {
      width: '93%',
      alignSelf: 'center',
      marginBottom: '6%',
    },
    touchableItem: {
      flexDirection: 'row',
      width: '100%',
      borderColor: 'red',
      borderRadius: 10,
      borderWidth: 1.2,
    },
    itemDetails: {
      flex: 4,
      marginLeft: '6%',
    },
    itemTextContainer: {
      flexDirection: 'column',
    },
    itemText: {
      color: 'black',
      marginBottom: 12,
      marginTop: 13,
    },
    bloodGroupContainer: {
      flex: 1,
    },
    bloodGroupBox: {
      backgroundColor: 'red',
      marginTop: 12,
      width: 33,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '35%',
      borderRadius: 4,
    },
    bloodGroupText: {
      color: 'white',
    },
  });