import React,{useState} from 'react'
import {Text,View,StyleSheet, FlatList} from 'react-native'

import DeviceInfo from 'react-native-device-info';



var Sound=require('react-native-sound')
Sound.setCategory('Playback')

const More=()=>{
    const [an,setan]=useState([''])
    const getDeviceInfo=async()=>{
      setan(await DeviceInfo.getSystemAvailableFeatures())
    }
    getDeviceInfo()
    return(
      <View style={styles.container}>
        <FlatList data={an} renderItem={({item})=>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item}</Text>
        </View>}/>
      </View>
    )
  }
export default More;


  const styles=StyleSheet.create({
    container:{
      padding:10,
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      backgroundColor:"#6B7A8F"
    },
    itemContainer: {
      backgroundColor: '#8CA5AD',
      borderRadius: 8,
      padding: 16,
      marginBottom: 8,
      elevation: 2,
    },
    itemText: {
      fontSize: 15,
      color: '#333333',
    },
  });