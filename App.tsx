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