import React from 'react'
import {StyleSheet, TouchableOpacity,Button, View} from 'react-native'
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
import Easy from './screens/EasyNav';
import Cam from './screens/Camera';

const Stack = createNativeStackNavigator();
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-paper';

var Sound=require('react-native-sound')
Sound.setCategory('Playback')
async function startup_sound(){
  var whoosh = new Sound('start.mp3', Sound.MAIN_BUNDLE, () => {
    whoosh.setVolume(0.2)
    whoosh.play();
  });
}
startup_sound()


const LogoTitle=({name})=>{
  return(<View style={{flex:1}}><Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>{name}</Text></View>)
}
const app=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={All} name="Main"  options={({ navigation,route}) => ({
          headerTitle: (props) => <LogoTitle {...props} name={"Central"} />,
          headerStyle: {
            backgroundColor: '#191970',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <>
        <TouchableOpacity style={{marginEnd:10}} onPress={()=>{navigation.navigate('Search')}}><Icon name="search" size={23} /></TouchableOpacity>
      </>
          ),
        })}/>
        <Stack.Screen component={Home} name="Welcome" options={({ navigation,route}) => ({
          headerTitle: (props) => <LogoTitle {...props} name={route.name} />,
          headerStyle: {
            backgroundColor: '#191970',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <>
        <TouchableOpacity style={{marginEnd:15}} onPress={()=>{navigation.navigate('Main')}}><Icon name="home" size={25} /></TouchableOpacity>
        <TouchableOpacity style={{marginEnd:10}} onPress={()=>{navigation.navigate('Search')}}><Icon name="search" size={23} /></TouchableOpacity>
      </>
          ),
        })}
      />
        <Stack.Screen component={Main} name="Sensors" options={({ navigation,route}) => ({
          headerTitle: (props) => <LogoTitle {...props} name={route.name} />,
          headerStyle: {
            backgroundColor: '#191970',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <>
        <TouchableOpacity style={{marginEnd:15}} onPress={()=>{navigation.navigate('Main')}}><Icon name="home" size={25} /></TouchableOpacity>
        <TouchableOpacity style={{marginEnd:10}} onPress={()=>{navigation.navigate('Search')}}><Icon name="search" size={23} /></TouchableOpacity>
      </>
          ),
        })}/>
        <Stack.Screen component={Info} name="Device Info" options={({ navigation,route}) => ({
          headerTitle: (props) => <LogoTitle {...props} name={route.name} />,
          headerStyle: {
            backgroundColor: '#191970',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <>
        <TouchableOpacity style={{marginEnd:15}} onPress={()=>{navigation.navigate('Main')}}><Icon name="home" size={25} /></TouchableOpacity>
        <TouchableOpacity style={{marginEnd:10}} onPress={()=>{navigation.navigate('Search')}}><Icon name="search" size={23} /></TouchableOpacity>
      </>
          ),
        })}/>
        <Stack.Screen component={More} name="Features" options={({ navigation,route}) => ({
          headerTitle: (props) => <LogoTitle {...props} name={route.name} />,
          headerStyle: {
            backgroundColor: '#191970',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <>
        <TouchableOpacity style={{marginEnd:15}} onPress={()=>{navigation.navigate('Main')}}><Icon name="home" size={25} /></TouchableOpacity>
        <TouchableOpacity style={{marginEnd:10}} onPress={()=>{navigation.navigate('Search')}}><Icon name="search" size={23} /></TouchableOpacity>
      </>
          ),
        })}/>
        <Stack.Screen component={Loc} name="Location" options={({ navigation,route}) => ({
          headerTitle: (props) => <LogoTitle {...props} name={route.name} />,
          headerStyle: {
            backgroundColor: '#191970',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <>
        <TouchableOpacity style={{marginEnd:15}} onPress={()=>{navigation.navigate('Main')}}><Icon name="home" size={25} /></TouchableOpacity>
        <TouchableOpacity style={{marginEnd:10}} onPress={()=>{navigation.navigate('Search')}}><Icon name="search" size={23} /></TouchableOpacity>
      </>
          ),
        })}/>
        <Stack.Screen component={Music} name="Music" options={({ navigation,route}) => ({
          headerTitle: (props) => <LogoTitle {...props} name={"Radio"} />,
          headerStyle: {
            backgroundColor: '#191970',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <>
        <TouchableOpacity style={{marginEnd:15}} onPress={()=>{navigation.navigate('Main')}}><Icon name="home" size={25} /></TouchableOpacity>
        <TouchableOpacity style={{marginEnd:10}} onPress={()=>{navigation.navigate('Search')}}><Icon name="search" size={23} /></TouchableOpacity>
      </>
          ),
        })}/>
        <Stack.Screen component={WeatherPage} name="Weather" options={({ navigation,route}) => ({
          headerTitle: (props) => <LogoTitle {...props} name={route.name} />,
          headerStyle: {
            backgroundColor: '#191970',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <>
        <TouchableOpacity style={{marginEnd:15}} onPress={()=>{navigation.navigate('Main')}}><Icon name="home" size={25} /></TouchableOpacity>
        <TouchableOpacity style={{marginEnd:10}} onPress={()=>{navigation.navigate('Search')}}><Icon name="search" size={23} /></TouchableOpacity>
      </>
          ),
        })}/>
        <Stack.Screen component={Easy} name="Search" options={styles.headers}/>
        <Stack.Screen component={Cam} name="Camera" options={({ navigation,route}) => ({
          headerTitle: (props) => <LogoTitle {...props} name={route.name} />,
          headerStyle: {
            backgroundColor: '#1f1f2e',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <>
        <TouchableOpacity style={{marginEnd:15}} onPress={()=>{navigation.navigate('Main')}}><Icon name="home" size={25} /></TouchableOpacity>
        <TouchableOpacity style={{marginEnd:10}} onPress={()=>{navigation.navigate('Search')}}><Icon name="search" size={23} /></TouchableOpacity>
      </>
          ),
        })}/>
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
    }
  },
});