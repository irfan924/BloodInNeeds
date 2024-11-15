import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'

const ProfileInput = ({title, placeholder, onChangeText, keyboardType, editable}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'black'}
                cursorColor={'red'}
                style={styles.input}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                editable={editable}
            />
        </View>
    )
}

export default ProfileInput

const styles = StyleSheet.create({
    container: {
        gap: 4
    },
    title:{
        fontSize: 16,
        fontWeight: '800',
        color: '#333'
    },
    input:{
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        fontSize: 16
    }
})