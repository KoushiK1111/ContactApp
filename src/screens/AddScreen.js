import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux';
import { AddContact } from '../redux/Action';



const AddScreen = (props) => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [designation, setDesignation] = useState('')
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState('https://images.squarespace-cdn.com/content/v1/565283a3e4b06ed63ea5f928/1573329464437-AYNV09QNC9AJ8LEJYKUF/blank-profile-picture-973460_1280.jpg?format=1000w')

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

    const Add_Contact = () => {
        let id = Math.floor(Math.random() * 9999999999)
        let uid = props.uid.uid
        props.Add({ fName, lName, designation, mobile, email, id, image, date, uid }),
            props.navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <ScrollView>
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
                        placeholder="Mobile Number"
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
                    <TouchableOpacity style={styles.btn} onPress={Add_Contact}>
                        <Text style={styles.btnText}>Submit</Text>
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
        Add: (contact) => dispatch(AddContact(contact))
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

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);