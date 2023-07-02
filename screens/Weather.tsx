import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import GetLocation from 'react-native-get-location';
import {OpenWeatherAPi} from './env'
import { Button } from 'react-native-paper';
const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const[but,setBut]=useState(false)
  useEffect(() => {
    if(but==true){
        const fetchWeatherData = async () => {
            try {
              const granted = await requestLocationPermission();
              if (granted) {
                GetLocation.getCurrentPosition({
                  enableHighAccuracy: true,
                  timeout: 15000,
                })
                  .then(async (location) => {
                    const { latitude, longitude } = location;
                    const apiKey = OpenWeatherAPi;
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
                    
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    setWeatherData(data);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              } else {
                console.log('Location permission denied');
              }
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchWeatherData();
    }
    
  }, [but]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      return true;
    }
  };

  if (!weatherData) {
    return (
      <View>
        <Button onPress={()=>{setBut(true)}}>Fetch Data From Open Weather</Button>
      </View>
    );
  }

  const { name, weather, main } = weatherData;
  const { description } = weather[0];
  const { temp, humidity } = main;

  return (
    <View style={styles.container}>
      <Text>Location: {name}</Text>
      <Text>Temperature: {(temp -273.15).toFixed(2)}°C</Text>
      <Text>Description: {description}</Text>
      <Text>Humidity: {humidity}%</Text>
    </View>
  );
};

export default WeatherPage;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'blue',
        justifyContent:'center',
    }

})
