import React, { Component } from 'react';
import { View, Text, Button, Alert, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default class HomeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeDetail: {}
        };
    }

    renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', borderBottomColor: '#DDDDDD', borderStyle: 'dashed', borderBottomWidth: 1, paddingBottom: 10 }}>
            <Text style={{ fontSize: 13, color: '#000', marginTop: 6, flex: 1 }} numberOfLines={1}>{item.name}</Text>
            <Text style={{ marginTop: 6, flex: 1, textAlign: 'right' }}>{item.quantity}</Text>
        </View>
    )

    renderStepItem = ({ item }) => (
        <View style={{ paddingBottom: 10 }}>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: 800 }}>步骤{item.stepOrder}</Text>
            <Image style={{ width: '100%', height: 300, marginTop: 10, borderRadius: 10, marginBottom: 10 }} source={{ uri: item.stepImage }} resizeMode="cover" />
            <Text style={{ marginTop: 6, marginBottom: 10, color: '#000' }}>{item.stepText}</Text>
        </View>
    )

    keyExtractor = (item) => item.id;

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image style={{ width: '100%', height: 300 }} source={{ uri: this.state.recipeDetail.imgUrl }} resizeMode="cover" />
                    <Text style={{ fontSize: 26, fontWeight: 800, color: '#000' }}>{this.state.recipeDetail.name}</Text>

                    <View style={{ width: '100%', padding: 20 }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 800 }}>用料</Text>
                        <FlatList data={this.state.recipeDetail.ingredients}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            ListEmptyComponent={<Text>暂无数据</Text>}
                        />
                        <View style={{ marginTop: 20 }}></View>
                        <FlatList data={this.state.recipeDetail.steps}
                            renderItem={this.renderStepItem}
                            keyExtractor={this.keyExtractor}
                            ListEmptyComponent={<Text>暂无数据</Text>}
                        />
                    </View>
                </View>
            </ScrollView>

        );
    };

    fetchData = async () => {
        try {
            const response = await fetch('http://192.168.106.1:8088/zuohaofan/recipes/getRecipeById/54');
            const detailJson = await response.json();
            this.setState({ recipeDetail: detailJson })
            // Alert.alert('response: ', JSON.stringify(recipeDetail))
        } catch (error) {
            Alert.alert('Error fetching data:', JSON.stringify(error));
        } finally {
            // Alert.alert('finally result')
        }
    };

    componentDidMount() {
        this.fetchData();
    }
}