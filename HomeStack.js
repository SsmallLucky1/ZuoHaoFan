import React from 'react';
import { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/home';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator()

export default class HomeStack extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name='首页' component={HomeScreen} />
                </Tab.Navigator>
            </NavigationContainer >
        )
    }
}