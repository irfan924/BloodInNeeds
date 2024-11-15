import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { backArrow } from "../../themes/images";

const Chat = () => {

    const navigation = useNavigation()

    return (
        <View style={{ backgroundColor: '#F95454', flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, gap: 100 }}>

                <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 16 }}

                    onPress={() => navigation.navigate('DonarScreen')}>

                    <Image source={backArrow} style={{ tintColor: 'white' }} />

                </TouchableOpacity>

                <Text style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    fontSize: 25,
                    color: 'white',


                }}
                >
                    ChatBox

                </Text>

            </View>

            <ScrollView
                contentContainerStyle={{
                    backgroundColor: 'white',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    paddingHorizontal: 16,
                    paddingVertical: 20,
                }}

            >

                <View style={{ alignItems: 'flex-end' }} >


                    <Text
                        style={{
                            backgroundColor: '#F0A8D0',
                            padding: 10,
                            paddingLeft: 40,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomLeftRadius: 15,
                            maxWidth: '250'
                        }}
                    >
                        Hello

                    </Text>


                    <Text>

                        09:00

                    </Text>

                </View>

                <View style={{ gap: 8 }}>

                    <Text
                        style={{
                            borderColor: '#F0A8D0',
                            borderWidth: 2,
                            maxWidth: 250,
                            padding: 5,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 15,

                        }}
                    >

                        Hello, please choose the number
                        corresponding to your needs for a
                        more efficient service</Text>


                    <View style={{
                        borderColor: '#F0A8D0',
                        borderWidth: 2,
                        maxWidth: 250,
                        padding: 5,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15


                    }}>

                        <Text>

                            1. Order Management
                        </Text>
                        <Text>
                            2. Order Management
                        </Text>
                        <Text>
                            3. Order Management
                        </Text>
                        <Text>
                            4. Order Management
                        </Text>

                    </View>

                </View>

                <Text>
                    09:00
                </Text>

                <View style={{ alignItems: 'flex-end' }}
                >
                    <Text style={{
                        backgroundColor: '#F0A8D0',
                        padding: 10,
                        paddingLeft: 40,
                        marginTop: 20,
                        maxWidth: 250,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderBottomLeftRadius: 15
                    }}>
                        1
                    </Text>

                    <Text>
                        09:03
                    </Text>

                </View>

                <View>
                    <Text
                        style={{
                            borderColor: '#F0A8D0',
                            borderWidth: 2,
                            maxWidth: 250,
                            padding: 5,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 15

                        }}
                    >
                        you have lose some thing else
                    </Text>

                    <Text>
                        09:03
                    </Text>

                </View>
                <View style={{ alignItems: 'flex-end' }} >


                    <Text
                        style={{
                            backgroundColor: '#F0A8D0',
                            padding: 10,
                            paddingLeft: 40,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomLeftRadius: 15,
                            maxWidth: '250'
                        }}
                    >
                        ok

                    </Text>


                    <Text>

                        09:05

                    </Text>

                </View>

                <View style={{ gap: 8 }}>

                    <Text
                        style={{
                            borderColor: '#F0A8D0',
                            borderWidth: 2,
                            maxWidth: 250,
                            padding: 5,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 15,

                        }}
                    >

                        Hello, please choose the number
                        corresponding to your needs for a
                        more efficient service</Text>


                </View>

                <Text>
                    09:06
                </Text>

                <View style={{ alignItems: 'flex-end' }} >


                    <Text
                        style={{
                            backgroundColor: '#F0A8D0',
                            padding: 10,
                            paddingLeft: 40,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomLeftRadius: 15,
                            maxWidth: '250'
                        }}
                    >
                        ok

                    </Text>


                    <Text>

                        09:05

                    </Text>

                </View>

                <View>
                    <Text
                        style={{
                            borderColor: '#F0A8D0',
                            borderWidth: 2,
                            maxWidth: 250,
                            padding: 5,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            borderBottomRightRadius: 15

                        }}
                    >
                        you have lose some thing else
                    </Text>

                    <Text>
                        09:03
                    </Text>

                </View>

            </ScrollView>


            <View
                style={{

                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5
                }}
            >

                <TextInput

                    placeholder='Write here'
                    placeholderTextColor='black'
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#F0A8D0',
                        width: '80%',
                        marginLeft: 10,
                        marginVertical: 10,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderRightColor: '#F95454',
                        fontSize: 16,
                        paddingVertical: 12
                    }}
                />

                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >

                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'red'
                    }}>
                        Send
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Chat

const styles = StyleSheet.create({})