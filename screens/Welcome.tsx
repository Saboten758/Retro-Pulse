import React,{useState} from 'react'
import {Text,ImageBackground,View,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'

import {useNavigation} from '@react-navigation/core'
import Torch from 'react-native-torch';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper';

const image = require('./assets/back1.jpg');

var Sound=require('react-native-sound')
Sound.setCategory('Playback')

const Home=()=>{
    const [torching,setTorching]=useState(true)
    const navigation=useNavigation();
    return(
        <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.nice}>
      <View style={styles.sensor_data_cont}>
      <Text style={styles.headtxt2}>DEVICE</Text>
      <Text style={styles.headtxt2}>INFO</Text>
       <TouchableOpacity onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
            whoosh.setVolume(0.2)
            whoosh.play();
          });navigation.navigate('Device Info')}} style={styles.info}>
            <Icon style={styles.icon} name="info" color="black" size={20}/>
            <Text style={styles.buttonText}>Data</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.head}>
      
      <View style={styles.sensor_data_cont}>
      

<TouchableOpacity style={styles.button} onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
    whoosh.setVolume(0.2)
    whoosh.play();
  });navigation.navigate('Sensors')}}><Icon style={styles.icon} name="microchip" size={20} color="black" />
        <Text style={styles.buttonText}>Sensors</Text>
  </TouchableOpacity>
  <Text style={styles.headtxt}>SENSOR</Text>
      <Text style={styles.headtxt}>DATA</Text>


</View>
      </View>
      </View>
      

      <Text style={styles.text3}>Starting...</Text>
      <View style={styles.space}>
      <Card>
    <Card.Cover
            source={require('./assets/cassette.gif')}
            style={styles.giif}
          />
    </Card>
      </View>
      <View style={styles.head}>
        <TouchableOpacity style={torching?styles.torch_button:styles.torch_button2} onPress={()=>{
          var whoosh = new Sound('beep.mp3', Sound.MAIN_BUNDLE, () => {
              whoosh.setVolume(0.2)
              whoosh.play();
            });
          setTorching(!torching);if (torching==true)Torch.switchState(true);else Torch.switchState(false); }}>
                <Icon style={styles.icon} name="sun-o" size={20} color={torching?"black":"white"}/>
                <Text style={torching?styles.buttonText:styles.buttonText2}>FLASH</Text>
        </TouchableOpacity>
        <Text style={styles.headtxt3}>FLASHFLIGHT</Text>
      </View>

          </ImageBackground>
      
      
    </ScrollView>
      
  
    );
  }

  export default Home;
  const styles=StyleSheet.create({
    head: {
      alignItems:'center',
      margin:10,
      position:'relative'
    },
    nice:{
      marginTop:25,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      margin:10
    },
    headtxt:{
      marginBottom:5,
      fontSize:40,
      color:'white',
      justifyContent:'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    headtxt2:{
      marginBottom:5,
      fontSize:40,
      color:'#99ccff',
      justifyContent:'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    headtxt3:{
      marginTop:5,
      fontSize:40,
      color:'#d9d9d9',
      justifyContent:'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    space:{
      margin:10,
      
    },
    
    container:{
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
      alignItems:'center',
      justifyContent:'center'
    },
    sensor_cont:{
      alignItems:'center',
      padding:20
    },
    button: {
      backgroundColor: '#99c2ff',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#E6E6FA',
      shadowColor: '#000',
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
    buttonText2: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    text3:{
      paddingStart:20,
      color:'white'
    },
    giif:{
      flex:1,
      position:'relative',
      height:300,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    torch_button:{
      width: 70,
      height: 70,
      borderRadius: 40,
      marginTop: 15,
      backgroundColor: '#6666ff',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      borderWidth: 2,
      borderColor: '#E6E6FA',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    torch_button2:{
      width: 70,
      height: 70,
      borderRadius: 40,
      marginTop:15,
      backgroundColor: '#666699',
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal: 10,
      borderWidth: 2,
      borderColor: 'grey',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    icon:{
      alignSelf:'center'
    },
    info:{
      width:90,
      height:70,
      backgroundColor:"#ffb3cc",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#E6E6FA',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
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