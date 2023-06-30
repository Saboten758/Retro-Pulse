import React from 'react'
import {StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Loc from './screens/location'
import Main from './screens/sensors'
import All from './screens/Main'
import Home from './screens/Welcome'
import Info from './screens/Devinfo'
import More from './screens/features'


const Stack = createNativeStackNavigator();
const Stack2=createNativeStackNavigator();

var Sound=require('react-native-sound')
Sound.setCategory('Playback')
var whoosh = new Sound('start.mp3', Sound.MAIN_BUNDLE, () => {
  whoosh.setVolume(0.2)
  whoosh.play();
});

const app=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={All} name="Main"  options={styles.headers}/>
        <Stack.Screen component={Home} name="Welcome" options={styles.headers}/>
        <Stack.Screen component={Main} name="Sensors" options={styles.headers}/>
        <Stack.Screen component={Info} name="Device Info" options={styles.headers}/>
        <Stack.Screen component={More} name="Features" options={styles.headers}/>
        <Stack2.Screen component={Loc} name="Location" options={styles.headers}/>
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
  }
});