import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, Alert, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import Torch from 'react-native-torch';
import Icon from 'react-native-vector-icons/FontAwesome';
import { accelerometer, SensorTypes, setUpdateIntervalForType, magnetometer, gyroscope } from 'react-native-sensors';
import { hasLightSensor, startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';

setUpdateIntervalForType(SensorTypes.accelerometer, 400);
setUpdateIntervalForType(SensorTypes.magnetometer, 400);
setUpdateIntervalForType(SensorTypes.gyroscope, 400);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Home} name="Welcome" />
        <Stack.Screen component={Main} name="Work" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = () => {
  const [torching, setTorching] = useState(true);
  const navigation = useNavigation();

  const toggleTorch = () => {
    setTorching(!torching);
    Torch.switchState(!torching);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text3}>Starting...</Text>
      <Image source={require('./cassette.gif')} style={styles.giif} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Work')}>
        <Icon style={styles.icon} name="microchip" size={20} color="black" />
        <Text style={styles.buttonText}>Sensors</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.torch_button} onPress={toggleTorch}>
        <Icon style={styles.icon} name="sun-o" size={20} color="black" />
        <Text style={styles.buttonText}>FLASH</Text>
      </TouchableOpacity>
    </View>
  );
};

const Main = () => {
  const [togg, setTogg] = useState(false);
  const [torchin, setTorchin] = useState(false);
  const [but, setBut] = useState(true);
  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0, timestamp: 0 });
  const [magno, setMagno] = useState({ x: 0, y: 0, z: 0, timestamp: 0 });
  const [gyro, setGyro] = useState({ x: 0, y: 0, z: 0, timestamp: 0 });
  const [result, setResult] = useState<number | undefined>();
  const [hasSensor, setHasSensor] = useState<boolean>();
  const [torching, setTorching] = useState(true);
 

  const toggleTorch = () => {
    setTorching(!torching);
    Torch.switchState(!torching);
  };
  useEffect(() => {
    hasLightSensor().then((sensorAvailable) => {
      setHasSensor(sensorAvailable);
    });
    startLightSensor();

    const subscription = DeviceEventEmitter.addListener('LightSensor', (data: { lightValue: number }) => {
      setResult(data.lightValue);

     if(togg)
     {
      if (data.lightValue <9) {
        Torch.switchState(true);
      }
      if (data.lightValue >=10) {
        Torch.switchState(false);
      }
     }
    });

    return () => {
      stopLightSensor();
      subscription?.remove();
    };
  }, [togg, torchin]);

  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
      if (!but) {
        setAccel({ x, y, z, timestamp });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [but]);

  useEffect(() => {
    const subscription = magnetometer.subscribe(({ x, y, z, timestamp }) => {
      if (!but) {
        setMagno({ x, y, z, timestamp });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [but]);

  useEffect(() => {
    const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
      if (!but) {
        setGyro({ x, y, z, timestamp });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [but]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SENSORS!</Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Woahh!');
          setBut(!but);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{but ? 'Press me!' : 'woaah!'}</Text>
        <Icon style={styles.icon} name="hand-o-up" size={20} color="black" />
      </TouchableOpacity>
      <View style={styles.sensor_data_cont}>
        <View style={styles.sensor_cont}>
          <Text style={styles.text2}>Accelerometer:</Text>
          <Text style={styles.text3}>X: {!but ? accel.x.toFixed(2) : 'Stopped'}</Text>
          <Text style={styles.text3}>Y: {!but ? accel.y.toFixed(2) : 'Stopped'}</Text>
          <Text style={styles.text3}>Z: {!but ? accel.z.toFixed(2) : 'Stopped'}</Text>
        </View>

        <View style={styles.sensor_cont}>
          <Text style={styles.text2}>Magnetometer:</Text>
          <Text style={styles.text3}>X: {!but ? magno.x.toFixed(2) : 'Stopped'}</Text>
          <Text style={styles.text3}>Y: {!but ? magno.y.toFixed(2) : 'Stopped'}</Text>
          <Text style={styles.text3}>Z: {!but ? magno.z.toFixed(2) : 'Stopped'}</Text>
        </View>

        <View style={styles.sensor_cont}>
          <Text style={styles.text2}>Gyroscope:</Text>
          <Text style={styles.text3}>X: {!but ? gyro.x.toFixed(2) : 'Stopped'}</Text>
          <Text style={styles.text3}>Y: {!but ? gyro.y.toFixed(2) : 'Stopped'}</Text>
          <Text style={styles.text3}>Z: {!but ? gyro.z.toFixed(2) : 'Stopped'}</Text>
        </View>
      </View>
      <Text style={styles.text2}>Device has sensor: {hasSensor ? 'YEP' : 'NOPE :<'}</Text>
      <Text>{hasSensor ? 'Light Result Value:' + result : ''}</Text>
      <TouchableOpacity
        onPress={() => setTogg(!togg)}
        style={{
          backgroundColor: togg ? 'green' : 'red',
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text style={styles.buttonText}>
          {hasSensor
            ? !togg
              ? 'Automatically turn on Flashlight?'
              : 'Flashlight will turn on automatically in Dark!'
            : ''}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#6B7A8F',
  },
  text: {
    padding: 10,
    fontSize: 43,
    color: 'red',
  },

  text2: {
    paddingTop: 20,
    fontWeight: 'bold',
    color: '#BBA9C3',
  },
  sensor_data_cont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sensor_cont: {
    alignItems: 'center',
    padding: 20,
  },
  button: {
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
  text3: {
    color: 'black',
  },
  giif: {
    padding: 10,
    height: 450,
    width: 450,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 3,
  },
  torch_button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: '#BBA9C3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
});
