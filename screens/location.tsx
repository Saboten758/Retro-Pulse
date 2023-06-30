
import React,{useEffect, useState} from 'react'
import {Text,View,StyleSheet, TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import GetLocation from 'react-native-get-location'


var Sound=require('react-native-sound')
Sound.setCategory('Playback')

const Loc=()=>{

    const [lat,setlat]=useState("")
    const [long,setlong]=useState("")
    const [alti,setalti]=useState("")
    const[acc,setacc]=useState("")
    const [but,setBut]=useState(false)
    const [speed,setSpeed]=useState("")
    const [tim,setTim]=useState("")
    
    useEffect(()=>{
      const getLocat=()=>{
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 0,
          })
          .then(location => {
            setlat(String(location.latitude))
            setlong(String(location.longitude))
            setalti(String(location.altitude))
            setacc(String(location.accuracy))
            setSpeed(String(location.speed))
            setTim(String(location.time))
          })
          .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
          })
      } 
      if (but) {
        getLocat();
  
        const intervalId = setInterval(getLocat, 3000); 
        
        return () => {
          clearInterval(intervalId);
        };
      }
    }, [but]);

    return(
      <View style={styles.container}>
        <Text style={styles.txt}>Latitude: {lat}</Text>
        <Text style={styles.txt}>Longitude: {long}</Text>
        <Text style={styles.txt}>Altitude: {alti}</Text>
        <Text style={styles.txt}>Accuracy: {acc}  </Text>
        <Text style={styles.txt}>Time: {tim}</Text>
        <Text style={styles.txt}>Speed: {speed}</Text>
        <TouchableOpacity onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
              whoosh.setVolume(0.2)
              whoosh.play();
            });setBut(!but)}} style={but?styles.button:styles.button2}>
          <Icon name="globe" color='black' size={15}/>
          <Text style={styles.buttonText}>{!but?"Get Location Details":"Stop Getting Details"}</Text>
        </TouchableOpacity>
      </View>
  
    );
  }
export default Loc
  const styles=StyleSheet.create({
    
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
    button: {
      marginTop:10,
      backgroundColor: '#C3D9A9',
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
  });