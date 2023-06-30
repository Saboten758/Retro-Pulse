import React,{useState,useEffect, startTransition} from 'react'
import {Text,Image,View,StyleSheet,Alert, TouchableOpacity,DeviceEventEmitter, FlatList, ScrollView,PermissionsAndroid} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,NativeStackNavigationProp } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core'
import Torch from 'react-native-torch';
import Icon from 'react-native-vector-icons/FontAwesome';
import { accelerometer,SensorTypes, setUpdateIntervalForType,magnetometer,gyroscope } from 'react-native-sensors';
import { hasLightSensor, startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';
import DeviceInfo from 'react-native-device-info';
import GetLocation from 'react-native-get-location'
import {Card, Button , Title ,Paragraph } from 'react-native-paper';

setUpdateIntervalForType(SensorTypes.accelerometer, 400);
setUpdateIntervalForType(SensorTypes.magnetometer, 400);
setUpdateIntervalForType(SensorTypes.gyroscope, 400);



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

const All=()=>{
  const navigation=useNavigation();
  return (
    <ScrollView>
        <View style={styles.screen}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Title style={styles.title}>Sensors</Title>
          </Card.Content>
          <Card.Cover
            source={require('./data.gif')}
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
                });
                navigation.navigate('Welcome');
              }}
              style={styles.button}>
                      <Text style={styles.buttonText}>Go to</Text>
                      <Icon style={styles.icon} name="hand-o-up" size={20} color="black"/>
            </TouchableOpacity>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Title style={styles.title}>Location</Title>
          </Card.Content>
          <Card.Cover
            source={require('./cherry.gif')}
            style={styles.cardimg}
          />
          <Card.Content style={styles.cardContent}>
            <Paragraph style={styles.paragraph}>
              Get Your Current Location and Altitude
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <TouchableOpacity
              onPress={() => {var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
                whoosh.setVolume(0.2)
                whoosh.play();
              });
                navigation.navigate('Location');
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

const Loc=()=>{

  const [lat,setlat]=useState("")
  const [long,setlong]=useState("")
  const [alti,setalti]=useState("")
  const[acc,setacc]=useState("")

  return(
    <View style={styles.container}>
      <Text style={styles.txt}>Latitude: {lat}</Text>
      <Text style={styles.txt}>Longitude: {long}</Text>
      <Text style={styles.txt}>Altitude: {alti}</Text>
      <Text style={styles.txt}>Accuracy: {acc}</Text>
      <TouchableOpacity onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
            whoosh.setVolume(0.2)
            whoosh.play();
          });GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
    .then(location => {
      setlat(String(location.latitude))
      setlong(String(location.longitude))
      setalti(String(location.altitude))
      setacc(String(location.accuracy))
    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
    })}} style={styles.button2}>
        <Icon name="globe" color='black' size={15}/>
        <Text style={styles.buttonText}>Get Location Details</Text>
      </TouchableOpacity>
    </View>

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

        <TouchableOpacity style={styles.button} onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
            whoosh.setVolume(0.2)
            whoosh.play();
          });navigation.navigate('Sensors')}}><Icon style={styles.icon} name="microchip" size={20} color="black" />
                <Text style={styles.buttonText}>Sensors</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
            whoosh.setVolume(0.2)
            whoosh.play();
          });navigation.navigate('Device Info')}} style={styles.info}>
            <Icon style={styles.icon} name="info" color="black" size={20}/>
          </TouchableOpacity>

      </View>

      <TouchableOpacity style={torching?styles.torch_button:styles.torch_button2} onPress={()=>{
        var whoosh = new Sound('beep.mp3', Sound.MAIN_BUNDLE, () => {
            whoosh.setVolume(0.2)
            whoosh.play();
          });
        setTorching(!torching);if (torching==true)Torch.switchState(true);else Torch.switchState(false); }}>
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
      <TouchableOpacity style={styles.button2} onPress={()=>{var whoosh = new Sound('press.mp3', Sound.MAIN_BUNDLE, () => {
            whoosh.setVolume(0.2)
            whoosh.play();
          });navigation.navigate('Features')}}>
            <Icon name="database" style={styles.icon} color="black" size={13}/>
            <Text style={styles.buttonText}>All Features</Text>
            </TouchableOpacity>
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
    height: 200,
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