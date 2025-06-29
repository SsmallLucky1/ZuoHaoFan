import React, { Component } from 'react';
import { View, Text, Button, Alert, Image, Pressable } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import { GET_RECIPE_BY_ID } from '../config';

/**
 * 详情页
 */
export default class HomeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeDetail: {},
            detailNavigation: {}
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
                    <Pressable onPress={this.takePhoto}>
                        <View style={{ width: 500, height: 300 }}>
                            <Image style={{ width: '100%', height: 300 }} source={{ uri: this.state.recipeDetail.imgUrl }} resizeMode="cover" />
                        </View>
                    </Pressable>
                    <Video
                        source={{ uri: this.state.recipeDetail.videoUrl }}
                        style={{ width: '100%', aspectRatio: 16 / 9, display: this.state.recipeDetail.videoUrl ? 'flex' : 'none' }}
                        controls
                        resizeMode='cover'
                        paused={true}
                        poster={this.state.recipeDetail.poster}
                        posterResizeMode="cover"
                    />
                    <Text style={{ fontSize: 26, fontWeight: 800, color: '#000', marginLeft: 16, marginRight: 16, marginTop: 12 }}>{this.state.recipeDetail.name}</Text>
                    <Text style={{ fontSize: 16, color: '#000', marginLeft: 16, marginRight: 16, marginTop: 8, lineHeight: 30 }}>{this.state.recipeDetail.description}</Text>
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
            let { id, navigation } = this.props.route.params
            this.setState({ detailNavigation: navigation })
            const response = await fetch(GET_RECIPE_BY_ID + '/' + id);
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
        this.getStorage()
        this.fetchData();
    }

    getStorage = async () => {

        // async 后延迟3秒调用另一个方法的写法
        // const p1 = AsyncStorage.getAllKeys((err, keys) => {
        //     setTimeout(() => {
        //         this.getMultiGet(keys)
        //     }, 3000)
        // })

        // async 配合 await 的写法
        // const p1 = AsyncStorage.getAllKeys((err, keys) => {
        //     return keys
        // })

        // let keys = await p1

        // AsyncStorage.getAllKeys((err, keys) => {
        //     AsyncStorage.multiGet(keys, (err, stores) => {
        //         Alert.alert('data', JSON.stringify(stores))
        //     })
        // })

        // 嵌套写法
        // AsyncStorage.getAllKeys((err, keys) => {
        //     AsyncStorage.multiGet(keys, (err, stores) => {
        //         Alert.alert('data',JSON.stringify(stores))
        //         // stores.map((result, i, store) => {
        //         //     // get at each store's key/value so you can work with it
        //         //     let key = store[i][0];
        //         //     let value = store[i][1];
        //         //     console.log('key:' + key + ' value:' + value)
        //         // });
        //     });
        // });
    }

    // getMultiGet(keys) {
    //     const p2 = AsyncStorage.multiGet(keys, (err, stores) => {
    //         Alert.alert('data', JSON.stringify(stores))
    //     })
    // }

    takePhoto = () => {
        this.state.detailNavigation.navigate('CameraPage');
    }
}