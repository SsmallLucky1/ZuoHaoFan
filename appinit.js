import React, { Component } from 'react'
import { Alert, Animated, Button, FlatList, StatusBar, Switch, Text, View } from 'react-native'
import { StyleSheet } from 'react-native'

export default class Index extends Component {

    state = {
        fadeAnim: new Animated.Value(0)
    }

    onButtonClicked = () => {
        Alert.alert(
            '更新提示',
            '发现新版本',
            [
                {
                    text: '下次提醒我',
                    onPress: () => {
                        alert('用户点击了下次提醒我')
                    }
                },
                {
                    text: '取消',
                    onPress: () => {
                        alert('用户点击了取消')
                    }
                },
                {
                    text: '更新',
                    onPress: () => {
                        alert('用户点击了确认')
                    }
                },
            ]
        )
    }

    fadeAnim = () => {
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start();
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar hidden={false}
                    backgroundColor={'green'}
                    barStyle={'light-content'}
                />
                <Switch />
                <View style={{ flex: 1 }}>
                    <Button title='点击我' onPress={this.onButtonClicked} color={'green'} />
                </View>
                <Animated.View
                    style={[styles.fadeContainer,
                    {
                        opacity: this.state.fadeAnim
                    }
                    ]}
                >
                    <Text style={styles.fadingText}>FadingText</Text>
                </Animated.View>
                <Button onPress={this.fadeAnim} title='淡入效果' />
                <View style={styles.container}>
                    <View style={styles.itemBase}>
                        <Text>首页</Text>
                    </View>
                    <View style={styles.itemBase}>
                        <Text>课堂</Text>
                    </View>
                    <View style={styles.itemBase}>
                        <Text>收藏</Text>
                    </View>
                    <View style={styles.itemBase}>
                        <Text>我</Text>
                    </View>
                </View >
                {/* 
                <FlatList
                    ListEmptyComponent={() => {
                        return <Text style={{ fontSize: 30 }}>没有数据！</Text>
                    }}

                    refreshing={false}
                    onRefresh={alert('刷新中')}

                /> */}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    },
    container: {
        flexDirection: 'row'
    },
    itemBase: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        height: 60,
        textAlign: 'center',
        backgroundColor: '#00bbff'
    },
    fadeContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "powderblue"
    },
    fadingText: {
        fontSize: 28,
        textAlign: "center",
        margin: 10
    }
})


