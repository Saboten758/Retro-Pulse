
import React, { useState} from 'react'
import {Text,View,StyleSheet, TouchableOpacity, ScrollView,ToastAndroid} from 'react-native'

import {useNavigation} from '@react-navigation/core'

import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, Title ,Paragraph } from 'react-native-paper';
import TrackPlayer,{State,usePlaybackState} from 'react-native-track-player';

var Sound=require('react-native-sound')
Sound.setCategory('Playback')

const All=()=>{
  const playerState = usePlaybackState();
  const[player,setupPlayer]=useState(false)
  const[playing,setPlaying]=useState(false)
  const showSensorsTost = () => {
    ToastAndroid.show('Check sensor data from here!', ToastAndroid.SHORT);
  };
  const showLocationTost = () => {
    ToastAndroid.show('Get Real time Location updates!!', ToastAndroid.SHORT);
  };
  const showMusicTost = () => {
    ToastAndroid.show('Music!', ToastAndroid.SHORT);
  };
  const showWeatherTost = () => {
    ToastAndroid.show('Weather Details!', ToastAndroid.SHORT);
  };
  const showCameraTost = () => {
    ToastAndroid.show('Camera!', ToastAndroid.SHORT);
  };
    const navigation=useNavigation();
    return (
      <ScrollView style={{backgroundColor:"#c5a8a8"}}>
          <View style={styles.screen}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>Sensors</Title>
            </Card.Content>
            <Card.Cover
              source={require('./assets/sensors.jpg')}
              style={styles.cardimg}
            />
            <Card.Content style={styles.cardContent}>
              <Paragraph style={styles.paragraph}>
                Track all your sensor data
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Get additional device info
              </Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <TouchableOpacity
                onPress={() => {
                  var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
                    whoosh.setVolume(0.2)
                    whoosh.play();
                  });showSensorsTost();
                  navigation.navigate('Welcome');
                }}
                style={styles.button}>
                        <Text style={styles.buttonText}>Go To</Text>
                        <Icon style={styles.icon} name="hand-o-up" size={20} color="black"/>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>Location</Title>
            </Card.Content>
            <Card.Cover
              source={require('./assets/cherry.gif')}
              style={styles.cardimg}
            />
            <Card.Content style={styles.cardContent}>
              <Paragraph style={styles.paragraph}>
                Get Real Time Location Data
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Get Speed and Altitude
              </Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <TouchableOpacity
                onPress={() => {var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
                  whoosh.setVolume(0.2)
                  whoosh.play();
                });
                showLocationTost();
                  navigation.navigate('Location');
                }}
                style={styles.button}>
                      <Text style={styles.buttonText}>Go To</Text>
                      <Icon style={styles.icon} name="hand-o-up" size={20} color="black"/>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        </View>

        <View style={styles.screen}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{flexDirection:'row'}}>
              <Title style={styles.title}>Music レコードプレーヤー</Title>
              <TouchableOpacity style={styles.smol}onPress={async()=>{
                if(player==false){
                  setupPlayer(true)
                  showMusicTost();
                  navigation.navigate("Music")
                }
                else if(await TrackPlayer.getState() == State.Playing){
                  TrackPlayer.pause()

                }
                else{
                  TrackPlayer.play()
                }
                setPlaying(!playing)
              }}><Icon
              name={playerState == State.Playing ? 'pause' : 'play'}
              size={25}
              backgroundColor="transparent"/>
              </TouchableOpacity>
              </View>
              
            </Card.Content>
            <Card.Cover
              source={require('./assets/music.jpg')}
              style={styles.cardimg}
            />
            <Card.Content style={styles.cardContent}>
              <Paragraph style={styles.paragraph}>
                Play Music & Chill
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Nightwave Radio 24x7 ♫
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                J1 Radio
              </Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <TouchableOpacity
                onPress={() => {
                  
                  var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
                    whoosh.setVolume(0.2)
                    whoosh.play();
                  });
                  showMusicTost();
                  navigation.navigate('Music');
                }}
                style={styles.button}>
                        <Text style={styles.buttonText}>Go To</Text>
                        <Icon style={styles.icon} name="hand-o-up" size={20} color="black"/>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
          
        </View>
        <View style={styles.screen}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>Weather 天気情報</Title>
              
            </Card.Content>
            <Card.Cover
              source={require('./assets/rain.png')}
              style={styles.cardimg}
            />
            <Card.Content style={styles.cardContent}>
              <Paragraph style={styles.paragraph}>
                Get Current Weather Details
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                  Needs Location Permissions
              </Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <TouchableOpacity
                onPress={() => {
                  
                  var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
                    whoosh.setVolume(0.2)
                    whoosh.play();
                  });
                  showWeatherTost();
                  navigation.navigate('Weather');
                }}
                style={styles.button}>
                        <Text style={styles.buttonText}>Go To</Text>
                        <Icon style={styles.icon} name="hand-o-up" size={20} color="black"/>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
          
        </View>

        <View style={styles.screen}>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>Camera</Title>
              
            </Card.Content>
            <Card.Cover
              source={require('./assets/cam.png')}
              style={styles.cardimg}
            />
            <Card.Content style={styles.cardContent}>
              <Paragraph style={styles.paragraph}>
                Take Pics
              </Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <TouchableOpacity
                onPress={() => {
                  
                  var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
                    whoosh.setVolume(0.2)
                    whoosh.play();
                  });
                  showCameraTost();
                  navigation.navigate('Camera');
                }}
                style={styles.button}>
                        <Text style={styles.buttonText}>Go To</Text>
                        <Icon style={styles.icon} name="hand-o-up" size={20} color="black"/>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
          
        </View>

  
          
      </ScrollView>
        
    )
  }

  export default All;
  const styles=StyleSheet.create({
    smol:{
      top:0,
      right:0,
      position:'absolute'
    },
    screen: {
      flex: 1,
      flexDirection:'row',
      padding: 16,
    },
    card: {
      flex:1,
      marginEnd:10,
      elevation: 4,
      backgroundColor:"#6B7A8F",
    },
    cardimg: {
      flex:1,
      height: 170,
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
    button: {
      backgroundColor: '#BBA9C3',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      bottom: 0,
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
    
  });