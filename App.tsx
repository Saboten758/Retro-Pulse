import React,{useState,useEffect} from 'react'
import {Text,Button,View,StyleSheet,Alert, TouchableOpacity} from 'react-native'

import { accelerometer,SensorTypes, setUpdateIntervalForType,magnetometer,gyroscope } from 'react-native-sensors';


setUpdateIntervalForType(SensorTypes.accelerometer, 400);
setUpdateIntervalForType(SensorTypes.magnetometer, 400);
setUpdateIntervalForType(SensorTypes.gyroscope, 400);

const main=()=>{
  const [but,setbut]=useState(true);
  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0, timestamp: 0 });
  const [magno,setmagno]=useState({x:0,y:0,z:0,timestamp:0})
  const [gyro,setgyro]=useState({x:0,y:0,z:0,timestamp:0})
  const [isTorchOn, setIsTorchOn] = useState(false);
  
  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
      if(!but){
        setAccel({ x, y, z, timestamp });
      } 
    });
    
    return () => {
      subscription.unsubscribe(); 
    };
  }, [but]);

  useEffect(()=>{
    const subscription = magnetometer.subscribe(({ x, y, z, timestamp }) => {
      if(!but){
        setmagno({ x, y, z, timestamp });
      }
    });

    return () => {
      subscription.unsubscribe(); 
    };
  },[but]);

  useEffect(()=>{
    const sub=gyroscope.subscribe(({ x, y, z, timestamp})=>{
      if(!but){
        setgyro({ x, y, z, timestamp});
      }
    });

    return()=>{
      sub.unsubscribe();
    }
  },[but]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SENSORS!</Text>
      <TouchableOpacity onPress={()=>{Alert.alert("Woahh!");setbut(!but);}} style={styles.button}>
        <Text style={styles.buttonText}>{but?"Press me!":"woaah!"}</Text>
      </TouchableOpacity>
      <View style={styles.sensor_data_cont}>
        <View style={styles.sensor_cont}>
          <Text style={styles.text2}>Accelerometer:</Text>
          <Text>X: {!but? accel.x.toFixed(2):"Stopped"}</Text>
          <Text>Y: {!but?accel.y.toFixed(2):"Stopped"}</Text>
          <Text>Z: {!but?accel.z.toFixed(2):"Stopped"}</Text>
        </View>

        <View style={styles.sensor_cont}>
          <Text style={styles.text2}>Magnetometer:</Text>
          <Text>X: {!but? magno.x.toFixed(2):"Stopped"}</Text>
          <Text>Y: {!but?magno.y.toFixed(2):"Stopped"}</Text>
          <Text>Z: {!but?magno.z.toFixed(2):"Stopped"}</Text>
        </View>

        <View style={styles.sensor_cont}>
          <Text style={styles.text2}>Gyroscope:</Text>
          <Text>X: {!but? gyro.x.toFixed(2):"Stopped"}</Text>
          <Text>Y: {!but?gyro.y.toFixed(2):"Stopped"}</Text>
          <Text>Z: {!but?gyro.z.toFixed(2):"Stopped"}</Text>
        </View>
         
      </View>
    </View>

  );
};

export default main;

const styles=StyleSheet.create({
  container:{
    padding:10,alignItems:'center',justifyContent:'center',flex:1,color:'red'
  },
  text:{
    padding:10,fontSize:43,color:'red',
  },
  
  text2:{
    paddingTop:20,
    fontWeight:'bold',
    color:'#6EC7B9'
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
    backgroundColor: '#6EC7B9',
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
});