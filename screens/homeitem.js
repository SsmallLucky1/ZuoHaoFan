import { Alert, FlatList, Image, Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { Component } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const itemMargin = 12;

const itemWidth = (screenWidth - itemMargin * 3) / 2
const itemHeight = itemWidth * 1.246

/**
 * 首页子组件
 */
export default class HomeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            navigation: {}
        };
    }

    renderItem = ({ item }) => (
        <Pressable onPress={() => {
            this.goToProfile(item.id)
        }}>
            <View style={{ marginRight: 12, marginBottom: itemMargin }}>
                <Image style={[styles.image, { width: itemWidth, height: itemHeight }]} source={{ uri: item.imgUrl }} resizeMode="cover" />
                <Text style={{ fontSize: 13, fontWeight: "900", color: '#000', marginTop: 6, width: itemWidth }} numberOfLines={1}>{item.name}</Text>
                <Text style={{ marginTop: 6 }}>{item.author}</Text>
            </View>
        </Pressable>

    )

    goToProfile = (recipeId) => {
        AsyncStorage.clear()
        AsyncStorage.setItem('recipeId', JSON.stringify(recipeId))
        AsyncStorage.setItem('index',JSON.stringify(1))
        // 通过 this.props.navigation.navigate 跳转
        this.props.navigation.navigate('HomeDetail', { id: recipeId, navigation:this.props.navigation });
    };

    keyExtractor = (item) => item.id;

    render() {

        const { items, title } = this.props

        return (
            <View style={styles.container}>
                <FlatList style={styles.item} data={items}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    numColumns={numColumns}
                    contentContainerStyle={styles.listContainer}
                    columnWrapperStyle={{ justifyContent: 'space-between' }} // 两列间距
                    ListEmptyComponent={<Text>暂无数据</Text>}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: itemMargin,
        marginRight: 6
    },
    itemContainer: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 15,
    },
    image: {
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 8,
        fontSize: 16,
        paddingHorizontal: 5,
    },
    author: {
        marginTop: 4,
        color: '#666',
        paddingHorizontal: 5,
        paddingBottom: 8,
    },
});