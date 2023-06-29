import React,{useState,useEffect} from 'react'
import {Text,Image,View,StyleSheet,Alert, TouchableOpacity,DeviceEventEmitter, FlatList} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,NativeStackNavigationProp } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core'
import Torch from 'react-native-torch';
import Icon from 'react-native-vector-icons/FontAwesome';
import { accelerometer,SensorTypes, setUpdateIntervalForType,magnetometer,gyroscope } from 'react-native-sensors';
import { hasLightSensor, startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';
import DeviceInfo from 'react-native-device-info';

setUpdateIntervalForType(SensorTypes.accelerometer, 400);
setUpdateIntervalForType(SensorTypes.magnetometer, 400);
setUpdateIntervalForType(SensorTypes.gyroscope, 400);
const Stack = createNativeStackNavigator();

const app=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Home} name="Welcome"/>
        <Stack.Screen component={Main} name="Sensors"/>
        <Stack.Screen component={Info} name="Device Info"/>
        <Stack.Screen component={More} name="Features"/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const Home=()=>{
  const [torching,setTorching]=useState(true)
  const navigation=useNavigation();
  return(
    <View style={styles.container}>
      <Text style={styles.text3}>Starting...</Text>
      <Image source={require('./cassette.gif')} style={styles.giif}/>
      <View style={styles.sensor_data_cont}>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Sensors')}><Icon style={styles.icon} name="microchip" size={20} color="black" /><Text style={styles.buttonText}>Sensors</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Device Info')} style={styles.info}><Icon style={styles.icon} name="info" color="black" size={20}/></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.torch_button} onPress={()=>{setTorching(!torching);if (torching==true)Torch.switchState(true);else Torch.switchState(false); }}>
      <Icon style={styles.icon} name="sun-o" size={20} color="black"/>
      <Text style={styles.buttonText}>FLASH</Text>
      </TouchableOpacity>
    </View>

  );
}

const Info=()=>{
  const navigation=useNavigation();
  const [an,setan]=useState(0)
  const [name,setname]=useState("")
  const [bname,setbname]=useState("")
  const [disc,setdisc]=useState(0)
  const [carrier,setcarrier]=useState("")
  const [code,setcode]=useState("")
  const [dname,setdname]=useState("")
  const [hard,sethard]=useState("")
  const [ip,setip]=useState("")
  const [pannel,setpannel]=useState("")
  const [model,setmodel]=useState("")
  const [result, setResult] = React.useState<number | undefined>();
  const [hasSensor, setHasSensor] = React.useState<boolean>();
  const [nmodel,setnmodel]=useState("")
  const [wmodel,setwmodel]=useState("")
  const [hmodel,sethmodel]=useState("")
  const [moa,setmoa]=useState(0)

  useEffect(() => {
    hasLightSensor().then(setHasSensor);
    startLightSensor();
    
    const subscription = DeviceEventEmitter.addListener(
      'LightSensor',
      (data: { lightValue: number }) => {
          setResult(data.lightValue);
      },
  );

  return () => {
      stopLightSensor();
      subscription?.remove();
  };
}, []);

  const getDeviceInfo=async()=>{
    setan(await DeviceInfo.getApiLevel())
    setname(await DeviceInfo.getSystemName())
    setbname(await DeviceInfo.getBrand())
    setdisc(await DeviceInfo.getTotalDiskCapacity())
    setcarrier(await DeviceInfo.getCarrier())
    setcode(await DeviceInfo.getCodename())
    setdname(await DeviceInfo.getDeviceNameSync())
    sethard(await DeviceInfo.getHardware())
    setip(await DeviceInfo.getIpAddress())
    setpannel(await DeviceInfo.getDisplay())
    setmodel(await DeviceInfo.getModel())
    setnmodel(await DeviceInfo.getBootloader())
    setwmodel(await DeviceInfo.getDeviceType())
    sethmodel(await DeviceInfo.getHost())
    setmoa((await DeviceInfo.getSystemAvailableFeatures()).length)
  }
  getDeviceInfo()
  return(
    <View style={styles.container}>
      <Text style={styles.txt}>Device Name: {dname} ({model})</Text>
      <Text style={styles.txt}>Device Type: {wmodel}  Host: {hmodel}</Text>
      <Text style={styles.txt}>OS: {name}  API-Level: {an} </Text>
      <Text style={styles.txt}>Manufactured By: {bname}</Text>
      <Text style={styles.txt}>Free Space: {(disc/8e+6).toFixed(2)}MB ({(disc/8e+9).toFixed(2)}GB)</Text>
      <Text style={styles.txt}>Carrier: {carrier}  Available Features: {moa}</Text>
      <Text style={styles.txt}>Code Name: {code}  Hardware: {hard} </Text>
      <Text style={styles.txt}>Display Pannel: {pannel}</Text>
      <Text style={styles.txt}>IP Address: {ip}</Text>
      <Text style={styles.txt}>Light Sensor: {hasSensor ? 'YES' : 'NO'}  Light Sensor Data: {result}</Text>
      <Text style={styles.txt}>Bootloader: {nmodel}</Text>
      <TouchableOpacity style={styles.button2} onPress={()=>navigation.navigate('Features')}><Icon name="database" style={styles.icon} color="black" size={13}/><Text style={styles.buttonText}>All Features</Text></TouchableOpacity>
      </View>
    

  );

}

const More=()=>{
  const [an,setan]=useState([''])
  const getDeviceInfo=async()=>{
    setan(await DeviceInfo.getSystemAvailableFeatures())
  }
  getDeviceInfo()
  return(
    <View style={styles.container}>
      <FlatList data={an} renderItem={({item})=>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>
      </View>}/>
    </View>
  )
}

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
      <TouchableOpacity onPress={()=>{Alert.alert("Woahh!");setbut(!but);}} style={styles.button}>
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
      <TouchableOpacity onPress={()=>{settoggle(!toggle)}} style={{ backgroundColor: hasSensor?toggle ? "#39FF14" : "#FF3366":"", padding:hasSensor? 10:0, borderRadius:hasSensor? 5:0 ,marginTop:hasSensor?10:0}}><Text style={styles.buttonText}>{hasSensor?!toggle?"Automatically turn on Flashlight?":"Flashlight will turn on automatically in Dark!":""}</Text></TouchableOpacity>
    </View>

  );
};




export default app;

const styles=StyleSheet.create({
  container:{
    padding:10,alignItems:'center',justifyContent:'center',flex:1,backgroundColor:"#6B7A8F"
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