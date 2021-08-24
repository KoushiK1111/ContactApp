import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, RefreshControl, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Realm from "realm"
import { Contact } from '../schema/schema'

let realm
realm = new Realm({ path: 'Contacts', schema: [Contact] })

const Home = (props) => {
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState([]);
    const [text,setText] = useState('');
    const [filteredData,setFilteredData] = useState([])
    const uid = props.uid;

    useEffect(() => {
        const Data = realm.objects('Contact')
        setData(Data.filter(el => (
            el.uid === uid && el
        )))
        setFilteredData(Data.filter(el => (
            el.uid === uid && el
        )))
    }, [props.data, props.uid]);

    const refresh_Handler = () => {
        setRefresh(true)
        const Data = realm.objects('Contact')
        setData(Data.filter(el => (
            el.uid === uid && el
        )))
        setFilteredData(Data.filter(el => (
            el.uid === uid && el
        )))
        setRefresh(false)
    }

    const searchData = (text) => {
        if (text) {
            const newData = data.filter(item => {
                const itemData = item.fName
                    ? item.fName.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setText( text );
        } else {
            setFilteredData(data);
            setText('');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {data.length === 0 ?
                (
                    <ScrollView
                        contentContainerStyle={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={refresh_Handler}
                            />
                        }
                    >
                        <Text style={{ fontSize: 22 }}>no contact to display</Text>
                    </ScrollView>
                )
                :
                (
                    <View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Contacts</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            value={text}
                            onChangeText={(text) =>searchData(text) }
                            placeholder="search Here"
                        />
                        <FlatList
                            refreshing={refresh}
                            onRefresh={refresh_Handler}
                            data={filteredData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.listContainer} onPress={() => props.navigation.navigate('Detail', { item })}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ height: 50, width: 50, borderRadius: 25 }}
                                        />
                                        <Text style={styles.text}>{item.fName} {item.lName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            <TouchableOpacity style={styles.floatContainer} onPress={() => props.navigation.navigate('Add')}>
                <Text style={{ fontSize: 48, color: '#fff' }}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = state => {
    return {
        data: state.Reducer,
        uid: state.uid.uid,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    header: {
        fontSize: 24,
        fontWeight: '800'
    },
    floatContainer: {
        backgroundColor: 'green',
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        right: 20,
        top: 550
    },
    listContainer: {
        marginHorizontal: 20,
        marginVertical: 15
    },
    text: {
        fontSize: 20,
        fontWeight: '900',
        paddingLeft: 10
    },
    textInput: {
        textAlign: 'center',
        height: 42,
        borderWidth: 2,
        borderColor: '#009688',
        borderRadius: 8,
        backgroundColor: "#FFFF",
        fontSize:20
      }
})

export default connect(mapStateToProps)(Home);