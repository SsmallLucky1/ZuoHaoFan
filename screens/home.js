import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import HomeComp from './homeitem';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeArr: []
        };
    }

    fetchData = async () => {
        try {
            const response = await fetch('http://192.168.101.3:8088/zuohaofan/recipes');
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
                <HomeComp items={this.state.recipeArr} />
            </View>
        );
    };

    componentDidMount() {
        this.fetchData();
    }
}