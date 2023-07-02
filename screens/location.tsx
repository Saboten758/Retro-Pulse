
import React,{useEffect, useState} from 'react'
import {Text,StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import GetLocation from 'react-native-get-location'
import { Card, Paragraph } from 'react-native-paper';


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
      <ImageBackground source={require('./assets/earth.jpg')} style={styles.container}>
        <Card style={styles.container2}>
            <Card.Content>
            <Paragraph style={styles.txt}>Latitude: {lat}</Paragraph>
            <Paragraph style={styles.txt}>Longitude: {long}</Paragraph>
            <Paragraph style={styles.txt}>Altitude: {alti}</Paragraph>
            <Paragraph style={styles.txt}>Accuracy: {acc}  </Paragraph>
            <Paragraph style={styles.txt}>Time: {tim}</Paragraph>
            <Paragraph style={styles.txt}>Speed: {speed}</Paragraph>
            </Card.Content>
          </Card>
        
        <TouchableOpacity onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
              whoosh.setVolume(0.2)
              whoosh.play();
            });setBut(!but)}} style={but?styles.button:styles.button2}>
          <Icon name="globe" color='black' size={15}/>
          <Text style={styles.buttonText}>{!but?"Get Location Details":"Stop Getting Details"}</Text>
        </TouchableOpacity>
      </ImageBackground>
  
    );
  }
export default Loc
  const styles=StyleSheet.create({
    
    container:{
      padding:10,
      alignItems:'center',
      resizeMode:'cover',
      justifyContent:'center',
      flex:1,
      backgroundColor:"#6B7A8F"
    },
    container2:{
      padding:10,
      width:320,
      height:240,
      position:'relative',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:"#3c3c5d",
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
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
      shadowColor: '#000',
      borderWidth: 2,
      borderColor: 'white',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    button2: {
      marginTop:10,
      borderWidth: 2,
      borderColor: 'white',
      backgroundColor: '#BBA9C3',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });