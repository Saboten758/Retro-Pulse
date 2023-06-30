import React,{useState,useEffect} from 'react'
import {Text,View,StyleSheet, TouchableOpacity,DeviceEventEmitter,} from 'react-native'
import {useNavigation} from '@react-navigation/core'

import Icon from 'react-native-vector-icons/FontAwesome';
import { hasLightSensor, startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';
import DeviceInfo from 'react-native-device-info';




var Sound=require('react-native-sound')
Sound.setCategory('Playback')

const Info=()=>{
    const navigation=useNavigation();
    const [an,setan]=useState(0)
    const [name,setname]=useState("")
    const [bname,setbname]=useState("")
    const [disc,setdisc]=useState(0)
    const [carrier,setcarrier]=useState("")
    const [code,setcode]=useState("")
    const [dname,setdname]=useState("")
    const [hard,sethard]=useState("")
    const [ip,setip]=useState("")
    const [pannel,setpannel]=useState("")
    const [model,setmodel]=useState("")
    const [result, setResult] = React.useState<number | undefined>();
    const [hasSensor, setHasSensor] = React.useState<boolean>();
    const [nmodel,setnmodel]=useState("")
    const [wmodel,setwmodel]=useState("")
    const [hmodel,sethmodel]=useState("")
    const [moa,setmoa]=useState(0)
  
    useEffect(() => {
      hasLightSensor().then(setHasSensor);
      startLightSensor();
      
      const subscription = DeviceEventEmitter.addListener(
        'LightSensor',
        (data: { lightValue: number }) => {
            setResult(data.lightValue);
        },
    );
  
    return () => {
        stopLightSensor();
        subscription?.remove();
    };
  }, []);
  
    const getDeviceInfo=async()=>{
      setan(await DeviceInfo.getApiLevel())
      setname(await DeviceInfo.getSystemName())
      setbname(await DeviceInfo.getBrand())
      setdisc(await DeviceInfo.getTotalDiskCapacity())
      setcarrier(await DeviceInfo.getCarrier())
      setcode(await DeviceInfo.getCodename())
      setdname(await DeviceInfo.getDeviceNameSync())
      sethard(await DeviceInfo.getHardware())
      setip(await DeviceInfo.getIpAddress())
      setpannel(await DeviceInfo.getDisplay())
      setmodel(await DeviceInfo.getModel())
      setnmodel(await DeviceInfo.getBootloader())
      setwmodel(await DeviceInfo.getDeviceType())
      sethmodel(await DeviceInfo.getHost())
      setmoa((await DeviceInfo.getSystemAvailableFeatures()).length)
    }
    getDeviceInfo()
    return(
      <View style={styles.container}>
        <Text style={styles.txt}>Device Name: {dname} ({model})</Text>
        <Text style={styles.txt}>Device Type: {wmodel}  Host: {hmodel}</Text>
        <Text style={styles.txt}>OS: {name}  API-Level: {an} </Text>
        <Text style={styles.txt}>Manufactured By: {bname}</Text>
        <Text style={styles.txt}>Free Space: {(disc/8e+6).toFixed(2)}MB ({(disc/8e+9).toFixed(2)}GB)</Text>
        <Text style={styles.txt}>Carrier: {carrier}  Available Features: {moa}</Text>
        <Text style={styles.txt}>Code Name: {code}  Hardware: {hard} </Text>
        <Text style={styles.txt}>Display Pannel: {pannel}</Text>
        <Text style={styles.txt}>IP Address: {ip}</Text>
        <Text style={styles.txt}>Light Sensor: {hasSensor ? 'YES' : 'NO'}  Light Sensor Data: {result}</Text>
        <Text style={styles.txt}>Bootloader: {nmodel}</Text>
        <TouchableOpacity style={styles.button2} onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
              whoosh.setVolume(0.2)
              whoosh.play();
            });navigation.navigate('Features')}}>
              <Icon name="database" style={styles.icon} color="black" size={13}/>
              <Text style={styles.buttonText}>All Features</Text>
              </TouchableOpacity>
        </View>
      
  
    );
  
  }
export default Info;
  const styles=StyleSheet.create({
    screen: {
      flex: 1,
      padding: 16,
    },
    card: {
      marginBottom: 16,
      elevation: 4,
      backgroundColor:"#6B7A8F",
    },
    cardimg: {
      flex:1,
      height: 300,
    },
    cardContent: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 8,
    },
    cardActions: {
      justifyContent: 'flex-end',
      padding: 8,
    },
    container:{
      padding:10,
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      backgroundColor:"#6B7A8F"
    },
    txt:{
      fontSize: 17,
      color: '#E6E6FA', 
      fontWeight: 'bold', 
      lineHeight: 24,
    },
    text:{
      padding:10,fontSize:43,color:'red',
    },
    
    text2:{
      paddingTop:20,
      fontWeight:'bold',
      color:'#BBA9C3'
    },
    sensor_data_cont:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    sensor_cont:{
      alignItems:'center',
      padding:20
    },
    button: {
      backgroundColor: '#BBA9C3',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button2: {
      marginTop:10,
      backgroundColor: '#BBA9C3',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
    text3:{
      color:'black'
    },
    giif:{
      padding:10,
      height:380,
      width:450,
      marginBottom:10,
      marginTop:10,
      borderRadius:3,
    },
    torch_button:{
      width: 60,
      height: 60,
      borderRadius: 30,
      marginTop:10,
      backgroundColor: '#BBA9C3',
      justifyContent:'center',
      alignItems:'center',
    },
    torch_button2:{
      width: 60,
      height: 60,
      borderRadius: 30,
      marginTop:10,
      backgroundColor: '#551A8B',
      justifyContent:'center',
      alignItems:'center',
    },
    icon:{
      alignSelf:'center'
    },
    info:{
      marginLeft:10,
      borderRadius:30,
      alignItems:'center',
      justifyContent:'center',
      width:40,
      height:40,
      backgroundColor:"#BBA9C3"
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
    headers:{
      headerStyle: {
        backgroundColor: '#191970',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  });