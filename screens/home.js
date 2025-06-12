import React, { Component } from 'react';
import { View, Text, Button, Alert, Pressable } from 'react-native';
import HomeComp from './homeitem';

function HomeDetail() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>这是详情页</Text>
        </View>
    );
}

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
            const response = await fetch('http://192.168.106.1:8088/zuohaofan/recipes');
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
                <Pressable onPress={() => {
                    this.goToProfile()
                }}>
                    <HomeComp items={this.state.recipeArr} />
                </Pressable>
            </View>
        );
    };

    goToProfile = () => {
        // 通过 this.props.navigation.navigate 跳转
        this.props.navigation.navigate('HomeDetail');
    };

    componentDidMount() {
        this.fetchData();
    }
}