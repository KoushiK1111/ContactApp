import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Realm from 'realm';
import { User } from '../schema/schema'
let realm
realm = new Realm({ path: 'Users', schema: [User] })

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const add_User = () => {
        if (email === "" ||
            name === "" ||
            password === "") {
            Alert.alert('All Text Fields required to fill')
        } else {
            realm.write(() => {
                const ID = Math.floor(Math.random() * 9999999999).toString();
                realm.create('User', {
                    uid: ID,
                    name: name,
                    email: email,
                    password: password,
                })
            })
            console.log(realm.objects('User'))
            props.navigation.navigate('Signin')
            setEmail('');
            setName('');
            setPassword('');

        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Register</Text>
            <TextInput
                style={styles.textInputStyles}
                placeholder="Enter Your Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.textInputStyles}
                placeholder="Enter Your Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.textInputStyles}
                placeholder="Enter Your Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.buttonStyle} onPress={add_User}>
                <Text style={styles.ButtonTextStyle}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Signin')}>
                <Text style={{ fontSize: 18, color: 'blue', marginTop: 20 }}>have an account? Click Here</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    textStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 30,
        color: 'red',
        alignSelf: 'center'
    },
    textInputStyles: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#e3e3e3',
        fontSize: 18,
    },
    buttonStyle: {
        height: 50,
        backgroundColor: 'green',
        borderRadius: 7,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 250,
    },
    ButtonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    }
})

export default Register;