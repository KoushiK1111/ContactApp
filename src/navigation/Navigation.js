import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddScreen, ContactDetails, EditScreen, Home, ProfileImage, Register, SignIn } from '../screens';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Signin'
                    component={SignIn}
                />
                <Stack.Screen
                    name='Register'
                    component={Register}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={({ navigation }) => ({
                        headerShown: false,
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Add')}>
                                <Text style={{ fontSize: 28 }}>+</Text>
                            </TouchableOpacity>

                        )
                    })}

                />
                <Stack.Screen
                    name='Add'
                    component={AddScreen}
                />
                <Stack.Screen
                    name='Image'
                    component={ProfileImage}
                />
                <Stack.Screen
                    name='Detail'
                    component={ContactDetails}
                />
                <Stack.Screen
                    name='Edit'
                    component={EditScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;