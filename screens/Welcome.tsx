import React,{useState} from 'react'
import {Text,Image,View,StyleSheet, TouchableOpacity} from 'react-native'

import {useNavigation} from '@react-navigation/core'
import Torch from 'react-native-torch';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper';

var Sound=require('react-native-sound')
Sound.setCategory('Playback')

const Home=()=>{
    const [torching,setTorching]=useState(true)
    const navigation=useNavigation();
    return(
      <View style={styles.container}>
        <Text style={styles.text3}>Starting...</Text>
        <View style={styles.space}>
        <Card>
      <Card.Cover
              source={require('./assets/cassette.gif')}
              style={styles.giif}
            />
      </Card>
        </View>
        
        {/* <Image source={require('./assets/cassette.gif')} style={styles.giif}/> */}
        <View style={styles.sensor_data_cont}>
  
          <TouchableOpacity style={styles.button} onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
              whoosh.setVolume(0.2)
              whoosh.play();
            });navigation.navigate('Sensors')}}><Icon style={styles.icon} name="microchip" size={20} color="black" />
                  <Text style={styles.buttonText}>Sensors</Text>
            </TouchableOpacity>
  
          <TouchableOpacity onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
              whoosh.setVolume(0.2)
              whoosh.play();
            });navigation.navigate('Device Info')}} style={styles.info}>
              <Icon style={styles.icon} name="info" color="black" size={20}/>
            </TouchableOpacity>
  
        </View>
  
        <TouchableOpacity style={torching?styles.torch_button:styles.torch_button2} onPress={()=>{
          var whoosh = new Sound('beep.mp3', Sound.MAIN_BUNDLE, () => {
              whoosh.setVolume(0.2)
              whoosh.play();
            });
          setTorching(!torching);if (torching==true)Torch.switchState(true);else Torch.switchState(false); }}>
                <Icon style={styles.icon} name="sun-o" size={20} color="black"/>
                <Text style={styles.buttonText}>FLASH</Text>
        </TouchableOpacity>
      </View>
  
    );
  }

  export default Home;
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
    space:{
      margin:10,
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
      height:240,
      width:380,
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