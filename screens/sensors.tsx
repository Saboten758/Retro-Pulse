import React,{useState,useEffect} from 'react'
import {Text,View,StyleSheet,Alert, TouchableOpacity,DeviceEventEmitter} from 'react-native'
import Torch from 'react-native-torch';
import Icon from 'react-native-vector-icons/FontAwesome';
import { accelerometer,SensorTypes, setUpdateIntervalForType,magnetometer,gyroscope } from 'react-native-sensors';
import { hasLightSensor, startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';



var Sound=require('react-native-sound')
Sound.setCategory('Playback')

setUpdateIntervalForType(SensorTypes.accelerometer, 400);
setUpdateIntervalForType(SensorTypes.magnetometer, 400);
setUpdateIntervalForType(SensorTypes.gyroscope, 400);

const Main=()=>{
    const[toggle,settoggle]=useState(false)
    const[torchin,settorchin]=useState(false)
    const [but,setbut]=useState(true);
    const [accel, setAccel] = useState({ x: 0, y: 0, z: 0, timestamp: 0 });
    const [magno,setmagno]=useState({x:0,y:0,z:0,timestamp:0})
    const [gyro,setgyro]=useState({x:0,y:0,z:0,timestamp:0})
    const [result, setResult] = React.useState<number | undefined>();
    const [hasSensor, setHasSensor] = React.useState<boolean>();
  
    useEffect(() => {
        hasLightSensor().then(setHasSensor);
        startLightSensor();
        
        const subscription = DeviceEventEmitter.addListener(
          'LightSensor',
          (data: { lightValue: number }) => {
              setResult(data.lightValue);
              if(toggle==true && data.lightValue<5){
                Torch.switchState(true);
                settorchin(true)
              }
              if(toggle==true &&data.lightValue>=5){
                Torch.switchState(false);
                settorchin(false)
              }
              if(toggle==false){
                if(torchin==true){
                  settorchin(false)
                  Torch.switchState(false)
                }
              }
          },
      );
  
      return () => {
          stopLightSensor();
          subscription?.remove();
      };
    }, [torchin,toggle]);
  
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
        <TouchableOpacity onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
              whoosh.setVolume(0.2)
              whoosh.play();
            });setbut(!but);Alert.alert("Woahh!");}} style={styles.button}>
          <Text style={styles.buttonText}>{but?"Press me!":"woaah!"}</Text>
          <Icon style={styles.icon} name="hand-o-up" size={20} color="black"/>
        </TouchableOpacity>
        <View style={styles.sensor_data_cont}>
          <View style={styles.sensor_cont}>
            <Text style={styles.text2}>Accelerometer:</Text>
            <Text style={styles.text3}>X: {!but? accel.x.toFixed(2):"Stopped"}</Text>
            <Text style={styles.text3}>Y: {!but?accel.y.toFixed(2):"Stopped"}</Text>
            <Text style={styles.text3}>Z: {!but?accel.z.toFixed(2):"Stopped"}</Text>
          </View>
  
          <View style={styles.sensor_cont}>
            <Text style={styles.text2}>Magnetometer:</Text>
            <Text style={styles.text3}>X: {!but? magno.x.toFixed(2):"Stopped"}</Text>
            <Text style={styles.text3}>Y: {!but?magno.y.toFixed(2):"Stopped"}</Text>
            <Text style={styles.text3}>Z: {!but?magno.z.toFixed(2):"Stopped"}</Text>
          </View>
  
          <View style={styles.sensor_cont}>
            <Text style={styles.text2}>Gyroscope:</Text>
            <Text style={styles.text3}>X: {!but? gyro.x.toFixed(2):"Stopped"}</Text>
            <Text style={styles.text3}>Y: {!but?gyro.y.toFixed(2):"Stopped"}</Text>
            <Text style={styles.text3}>Z: {!but?gyro.z.toFixed(2):"Stopped"}</Text>
          </View>
           
        </View>
        <Text style={styles.text2}>Device has light sensor: {hasSensor ? 'YEP' : 'NOPE :<'}</Text>
        <Text>{hasSensor?"Light Sensor Data:"+result:""}</Text>
        <TouchableOpacity onPress={()=>{var whoosh = new Sound('beep.mp3', Sound.MAIN_BUNDLE, () => {
              whoosh.setVolume(0.2)
              whoosh.play();
            });settoggle(!toggle)}} style={{ backgroundColor: hasSensor?toggle ? "#39FF14" : "#FF3366":"", padding:hasSensor? 10:0, borderRadius:hasSensor? 5:0 ,marginTop:hasSensor?10:0}}><Text style={styles.buttonText}>{hasSensor?!toggle?"Automatically turn on Flashlight?":"Flashlight will turn on automatically in Dark!":""}</Text></TouchableOpacity>
      </View>
  
    );
  };

  export default Main;

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