import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);



const ContactDetails = (props) => {
    const item = props.route.params.item
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={{ height: 230, width: '100%', borderRadius: 25, opacity: 0.75 }}
                />
                <Text style={styles.textStyle}>{item.fName} {item.lName}</Text>
            </View>
            <View style={styles.subcontainer}>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={{ flex: 0.25, fontSize: 22, color: 'grey' }}>Mobile </Text>
                    <Text style={{ flex: 0.75, fontSize: 22, paddingLeft: 20 }}>{item.mobile}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={{ flex: 0.25, fontSize: 22, color: 'grey' }}>Email</Text>
                    <Text style={{ flex: 0.75, fontSize: 22, paddingLeft: 20 }}>{item.email}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={{ flex: 0.25, fontSize: 22, color: 'grey' }}>DOB</Text>
                    <Text style={{ flex: 0.75, fontSize: 22, paddingLeft: 20 }}>{moment(item.date).format('DD MMM YYYY')}</Text>
                </View>
            </View>
            <TouchableOpacity style={{ flex: 0.1, alignItems: 'center' }} onPress={() => props.navigation.navigate('Edit', { item })}>
                <Feather name='edit' size={40} color='black' />
                <Text style={{ fontSize: 20, fontWeight: '800' }}>Edit Contact</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10
    },
    imageContainer: {
        flex: 0.5,
        backgroundColor: 'lightgrey',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 20,
        borderRadius: 20
    },
    textStyle: {
        fontSize: 28,
        marginVertical: 5,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    subcontainer: {
        flex: 0.4,
        paddingHorizontal: 20,
        paddingTop: 15
    },
})

export default ContactDetails;