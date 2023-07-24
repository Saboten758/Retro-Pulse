import React, {PureComponent, useState} from 'react';
import { TouchableOpacity,View,Alert, ToastAndroid, ImageBackground} from 'react-native';
import {RNCamera} from 'react-native-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Icon from 'react-native-vector-icons/FontAwesome';

const showTost=()=>{
  ToastAndroid.show("Picture Saved Successfully",ToastAndroid.SHORT);
}
const backTost=()=>{
  ToastAndroid.show("Back Camera",ToastAndroid.SHORT);
}
const frontTost=()=>{
  ToastAndroid.show("Front Camera",ToastAndroid.SHORT);
}
export default class Camera extends PureComponent { constructor(props) {
  
  super(props);
    this.state = {
    cameraType : 'back',
    takingPic: false,
    mirrorMode: false,
    box: null,
    
  };
}
takePicture = async () => {
  if (this.camera && !this.state.takingPic) {

    let options = {
      quality: 0.90,
      fixOrientation: true,
      forceUpOrientation: true,
    };

    this.setState({takingPic: true});

    try {
       const data = await this.camera.takePictureAsync(options);
       showTost();
       CameraRoll.save(data.uri)
    } catch (err) {
      Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
      return;
    } finally {
      this.setState({takingPic: false});
    }
  }
};

changeCameraType=async()=> {
  if (this.state.cameraType === 'back') {
    this.setState({
      cameraType: 'front',
    });
    frontTost();
  } else {
    this.setState({
      cameraType: 'back',
    });
    backTost();
  }
}

render() {
  
  return (
    <>
    <View style={{borderBottomWidth:10,borderColor:'#15151e'}}></View>
    <RNCamera 
      ref={ref => {
        this.camera = ref;
      }}
      captureAudio={false}
      type={this.state.cameraType}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }} style={{flex:1,alignItems:'center',marginTop:'auto',marginBottom:'auto'}}/>
      <ImageBackground source={require('./assets/cam_overlay.jpg')}  style={{borderColor:'#15151e',flex:1/7,borderTopWidth:10,position:'relative',alignItems:'center'}} blurRadius={1}>
        <View style={{flexDirection:'row',marginTop:'auto',marginBottom:'auto'}}>
        <TouchableOpacity  onPress={this.takePicture} style={{alignSelf:'center'}}><Icon name="camera" size={40} color="white" style={{opacity:0.7}}/></TouchableOpacity>
        <TouchableOpacity  onPress={this.changeCameraType} style={{alignSelf:'center',marginLeft:20}}><Icon name="refresh" size={40} color="white" style={{opacity:0.7}}/></TouchableOpacity>
        </View>
      
      </ImageBackground >
     
        
      
      </>
    
    );
  }}