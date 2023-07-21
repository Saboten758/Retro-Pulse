import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform, StyleSheet,ScrollView, ImageBackground, FlatList } from 'react-native';
import GetLocation from 'react-native-get-location';
import {OpenWeatherAPi} from './env'
import { Card, Paragraph } from 'react-native-paper';
const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const[air,setAir]=useState(null);

  useEffect(() => {
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
                    const apiUrl2=`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
                    const response = await fetch(apiUrl);
                    const response2 = await fetch(apiUrl2);
                    const data = await response.json();
                    const data2 = await response2.json();
                    setWeatherData(data);
                    setAir(data2)
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
    
  },[]);

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

  if (!weatherData || !air) {
    return (
      <View style={styles.container}>
        <Card style={{margin:10}}>
          <Card.Cover source={require('./assets/weather.gif')} style={{width:150,height:150}}/>
        </Card>
        <Text>LOADING...</Text>
      </View>
    );
  }

  const { name, weather, main, wind,clouds,sys,visibility} = weatherData;
  const { description,icon } = weather[0];
  const { temp,temp_min,temp_max, humidity,feels_like } = main;
  const{ speed }=wind;

  const sunrise = new Date(sys.sunrise*1000);
  const sunset = new Date(sys.sunset*1000);

  const sunriseTimeString = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunsetTimeString = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const airQuality = air.list[0].main.aqi;
  const comp=air.list[0].components;
  const x={1:"Good",2:'Fair',3:'Moderate',4:'Poor',5:'Very Poor'}
  return (
    <ScrollView style={styles.container2} contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground source={{uri:'https://i0.wp.com/i.pinimg.com/originals/ac/72/69/ac72696cb003d7bc0a60822a5d1204fb.gif'}} style={styles.container}>
                <Text style={{fontSize:20}}>Sunrise: {sunriseTimeString}</Text>
                <Text style={{fontSize:20}}>Sunset: {sunsetTimeString}</Text>
          <Card style={{ alignItems: 'center', borderWidth: 2, borderStyle: 'solid', backgroundColor:'#f2f2f2',borderColor: 'black',margin:10}}>
            <Card.Cover source={{ uri: `https://openweathermap.org/img/w/${icon}.png` }} style={{width: 120, height: 100, resizeMode: 'contain' ,alignSelf:'center'}} />
              <Card.Content style={{alignItems:'center',padding:10}}>
                <Paragraph style={{fontSize:20,fontWeight:'bold'}} >
                {description.toUpperCase()}
                </Paragraph>
                <Paragraph style={{fontSize:20,fontWeight:'bold'}}>
                {(temp -273.15).toFixed(0)}°C
                </Paragraph>
                {temp_min !== temp_max && (
                    <Paragraph style={{fontSize:13}}>
                      {`${(temp_min -273.15).toFixed(0)}°C ~ ${(temp_max -273.15).toFixed(0)}°C`}
                    </Paragraph>
                )}
                <Paragraph>
                  {name}
                </Paragraph>
                <Paragraph>Feels Like: {(feels_like -273.15).toFixed(0)}°C</Paragraph>
                <Paragraph>Visibility: {(visibility/1000).toFixed(1)} km</Paragraph>
              </Card.Content>
            </Card>
      
            
            <Text>Humidity: {humidity}%</Text>
            <Text>Wind Speed: {speed} m/s</Text>
            <Text>Cloud Cover: {clouds.all}%</Text>
            <Text>Air Quality: {x[airQuality]}</Text>

            <View style={{flexDirection:'row'}}>
              <Card style={{ alignItems: 'center', borderWidth: 2, borderStyle: 'solid', backgroundColor:'#f2f2f2',borderColor: 'black',margin:10}}>
              <Card.Content style={{alignItems:'center',padding:10}}>
                <Paragraph style={{fontWeight:'bold', fontSize:16}}>AIR COMPOSITION</Paragraph>
                <Paragraph>CO: {comp.co}  O3: {comp.o3}</Paragraph>
                <Paragraph>NH3: {comp.nh3}  SO2: {comp.no2}</Paragraph>
                <Paragraph>NO: {comp.no}  PM10: {comp.pm10}</Paragraph>
                <Paragraph>NO2: {comp.no2}  PM2.5: {comp.pm2_5}</Paragraph>
              </Card.Content>
            </Card>
            </View>

           
      
    </ImageBackground>
      </ScrollView>
    
  );
};

export default WeatherPage;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#6B7A8F',
        justifyContent:'center',
    },
    container2:{
      flex:1,
      backgroundColor:'blue',
  }

})
