import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import Realm from 'realm';
import { User } from "../schema/schema";
import { AddUid } from '../redux/Action'

let realm
realm = new Realm({ path: 'Users', schema: [User] })

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const Authenticate = () => {
        realm.write(() => {
            realm.objects('User').find((user) => {
                if (user.email === email && user.password === password) {
                    setEmail('');
                    setPassword('');
                    props.update_uid(user.uid)
                    props.navigation.navigate('Home');
                }
            })
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Sign In</Text>
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
            <TouchableOpacity style={styles.buttonStyle} onPress={Authenticate}>
                <Text style={styles.ButtonTextStyle}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                <Text style={{ fontSize: 18, color: 'blue', marginTop: 20 }}>Don't have an account? Click Here</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        update_uid: data => dispatch(AddUid(data))
    }
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
        fontSize: 18
    },
    buttonStyle: {
        height: 40,
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 7,
        marginVertical: 10,
    },
    ButtonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    }
})

export default connect(null, mapDispatchToProps)(SignIn);