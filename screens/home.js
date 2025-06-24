import React, { Component } from 'react';
import { View, Text, Button, Alert, Pressable } from 'react-native';
import HomeItem from './homeitem';
import { RECIPES } from '../config';

/**
 *  主页
 */
export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        // Alert.alert('navigation', this.props.navigation === null ? 'true' : 'false')
        this.state = {
            recipeArr: []
        };
    }

    fetchData = async () => {
        try {
            const response = await fetch(RECIPES);
            const json = await response.json();
            // this.recipeArr = json.data
            this.setState({ recipeArr: json.data })
            // Alert.alert('response: ', this.recipeArr instanceof Array ? 'true' : 'false')
        } catch (error) {
            Alert.alert('Error fetching data:', JSON.stringify(error));
        } finally {
            // Alert.alert('finally result')
        }
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <HomeItem items={this.state.recipeArr} navigation={this.props.navigation} />
            </View>
        );
    };

    componentDidMount() {
        this.fetchData();
    }
}