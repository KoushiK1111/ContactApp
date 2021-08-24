import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux';
import {  DeleteContact, UpdateContact } from '../redux/Action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Realm from 'realm'
import { Contact } from '../schema/schema';

let realm
realm = new Realm({ path: 'Contacts', schema: [Contact] })

const EditScreen = (props) => {
    const item = props.route.params.item
    const [fName, setFName] = useState(item.fName);
    const [lName, setLName] = useState(item.lName);
    const [designation, setDesignation] = useState(item.designation)
    const [mobile, setMobile] = useState(item.mobile);
    const [email, setEmail] = useState(item.email);
    const [date, setDate] = useState(new Date(item.date));
    const [image, setImage] = useState(item.image);
    const [confirm,setConfirm] = useState(false)

    const chooseFile = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                alert('User cancelled image picker');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            } else {
                response.assets.map(el => {
                    setImage(el.uri)
                })
            }
        });
    };

    const Update_Contact = () => {
        let id = item.id
        props.Update({ fName, lName, designation, mobile, email, id, image, date });
        props.navigation.navigate('Home')
    };

    const Delete_Contact = () => {
        let id = item.id
        realm.write(() => {
            let Delete_contact = realm.objects('Contact').filtered('id==' + id)
            realm.delete(Delete_contact)
            props.navigation.navigate('Home')
        })
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }} onPress={()=>{
                    Alert.alert(
                        'Alert Title',
                        'Confirm to delete contact',
                        [
                          {
                            text: 'Cancel',
                            onPress: ()=>console.log('cancel pressed'),
                            style: 'cancel',
                          },
                          {text: 'OK', onPress: Delete_Contact},
                        ],
                        {cancelable: false},
                      );
                }}>
                    <MaterialIcons name='delete' size={40} color='black' />
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={chooseFile} >
                        <Image
                            source={{ uri: image }}
                            style={{ height: 150, width: 150, borderRadius: 75 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.textComponent}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={fName}
                        onChangeText={setFName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lName}
                        onChangeText={setLName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Designation"
                        value={designation}
                        onChangeText={setDesignation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mobile Numbner"
                        value={mobile}
                        onChangeText={setMobile}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.textStyle}>select DOB:</Text>
                    <DatePicker
                        mode='date'
                        date={date}
                        onDateChange={setDate}
                        style={{ marginBottom: 10, height: 100, backgroundColor: 'lightgreen', alignSelf: 'center' }}
                        maximumDate={new Date()}
                        minimumDate={new Date('1950-01-01')}
                    />
                    <TouchableOpacity style={styles.btn} onPress={Update_Contact}>
                        <Text style={styles.btnText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const mapStateToProps = state => {
    return {
        data: state.Reducer,
        uid: state.uid,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        Update: (contact) => dispatch(UpdateContact(contact)),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        marginBottom: 5
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    textComponent: {
        marginHorizontal: 20
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingLeft: 15,
        fontSize: 18,
        marginBottom: 15,
    },
    textStyle: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 10
    },
    btn: {
        backgroundColor: 'green',
        height: 50,
        width: 200,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginVertical: 20
    },
    btnText: {
        fontSize: 22,
        fontWeight: '800',
        color: '#fff'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);