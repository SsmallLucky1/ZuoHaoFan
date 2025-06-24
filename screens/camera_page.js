import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';

export default class CameraPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: false,
            device: {}
        };
    }

    async componentDidMount() {
        const cameraDevice = await Camera.getAvailableCameraDevices()
        let str = ''
        cameraDevice.map((item) => {
            str += item.name + ''
            console.log('cameraDevice', JSON.stringify(item.name))
            // console.log('item.name.indexOf',item.name.indexOf('back') !== -1)
            if (item.name && item.name.indexOf('back') !== -1) {
                this.state.device = item
                // Alert.alert('cameraDevice', JSON.stringify(this.state.device.name))
            }
        })


        const status = await Camera.getCameraPermissionStatus();
        if (status === 'authorized') {
            this.setState({ hasPermission: true });
        } else {
            const newStatus = await Camera.requestCameraPermission();
            this.setState({ hasPermission: newStatus === 'authorized' });
        }
    }

    render() {
        const { hasPermission } = this.state;
        return (
            <View>
                {hasPermission ? (
                    <Camera
                        style={{ width: '100%', height: '100%' }}
                        device={this.state.device}
                        isActive={true}
                    />
                ) : (
                    <Text>Camera permission not granted</Text>
                )}
            </View>
        );
    }
}
