import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Loc from './screens/location'
import Main from './screens/sensors'
import All from './screens/Main'
import Home from './screens/Welcome'
import Info from './screens/Devinfo'
import More from './screens/features'
import Music from './screens/musicx'
import WeatherPage from './screens/Weather';

const Stack = createNativeStackNavigator();
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-paper';

var Sound=require('react-native-sound')
Sound.setCategory('Playback')
var whoosh = new Sound('start.mp3', Sound.MAIN_BUNDLE, () => {
  whoosh.setVolume(0.2)
  whoosh.play();
});

function LogoTitle() {
  return (
    <View
      style={{ width: 80, height: 60,margin:0,flex:1 ,flexDirection:'row',backgroundColor: '#191970',}}>
      <Text style={{fontWeight: 'bold',color:'white',fontSize:24,alignSelf:'center'}}>Central</Text>
    <TouchableOpacity><Icon name="search-plus" color='black' size={24} style={{marginLeft:0}}/></TouchableOpacity>
    </View>
  );
}

const app=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={All} name="Main"  options={styles.headers2}/>
        <Stack.Screen component={Home} name="Welcome" options={styles.headers}/>
        <Stack.Screen component={Main} name="Sensors" options={styles.headers}/>
        <Stack.Screen component={Info} name="Device Info" options={styles.headers}/>
        <Stack.Screen component={More} name="Features" options={styles.headers}/>
        <Stack.Screen component={Loc} name="Location" options={styles.headers}/>
        <Stack.Screen component={Music} name="Music" options={styles.headers3}/>
        <Stack.Screen component={WeatherPage} name="Weather" options={styles.headers}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default app;

const styles=StyleSheet.create({
 
  headers:{
    headerStyle: {
      backgroundColor: '#191970',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  headers2:{
    title: 'Central',
    headerStyle: {
      backgroundColor: '#191970',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  headers3:{
    title: 'Nightwave Plaza',
    headerStyle: {
      backgroundColor: '#191970',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});