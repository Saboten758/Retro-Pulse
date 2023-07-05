# Retro Pulse

Well, I was trying out react-native-sensors, react-native-track-player and a bunch of other libraries, for getting the real-time (kinda...) sensor data from my phone and playing music. This repository contains an app built with React Native.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Utilizes accelerometer, magnetometer, gyroscope and light sensors.
- Displays real-time sensor data.
- Simple UI, with a retro look.
- Additional device info with all system features listed.
- Automatic flashlight in the dark (only on devices with a light sensor).
- Current Location data.
- Simple music player with Nightwave Plaza radio and other radios like J1 FM
- Uses OpenWeather API to fetch location based weather data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Saboten758/Retro-Pulse.git
2. Navigate to the project directory:
    ```bash
    cd Retro-Pulse
3. Install the dependencies:
    ```bash
    npm install
4. #### Create a file in the 'screens' directory and create a 'env.tsx' file and type:
    ```bash
    export  const OpenWeatherAPi=[YOUR API KEY]
4. Run the project:
    ```bash
    npm start
This will start the Metro bundler and launch the project on an emulator or connected device.

## Screenshots
<div style="text-align:center"><img src="https://i.imgur.com/9nSDLW4.jpeg" width="320" height="700" style="display: block; margin: 0 auto" ><br/>
Central<br/>
<div style="text-align:center"><img src="https://i.imgur.com/6mun8uH.jpeg" width="320" height="700" style="display: block; margin: 0 auto" ><br/>
Central<br/>
<img src="https://i.imgur.com/GlMBHbJ.jpg" width="320" height="700" style="display: block; margin: 0 auto" ><br/>
Sensors with flashlight and device info<br/>
<img src="https://i.imgur.com/5iIg54N.jpeg" width="320" height="700" style="display: block; margin: 0 auto" ><br/>
For devices without a light sensor<br/>
<img src="https://i.imgur.com/B0vwLyF.jpeg" width="720" height="700" style="display: block; margin: 0 auto" ><br/>
For devices with a light sensor<br/>
<img src="https://i.imgur.com/eRZuBvy.jpeg" width="320" height="700" style="display: block; margin: 0 auto" ><br/>
Location<br/>
<img src=https://i.imgur.com/E76TUh5.jpg" width="320" height="700" style="display: block; margin: 0 auto" ><br/>
Nightwave Plaza Radio ♫<br/>
<img src=https://i.imgur.com/zheE3yF.jpg" width="320" height="700" style="display: block; margin: 0 auto" ><br/>
Weather using OpenWeather API<br/>



## Usage
1. Open the app on your device or emulator.
2. Navigate to the "Sensors" card
3. Press the "Press me!" button to start/stop sensor updates.
4. Explore the real-time sensor data displayed on the screen.
5. If your device houses a light sensor, you can also use the light sensor to turn on or off flashlight automatically!!
6. Use the "Flash" button from the main screen for using flashlight.
7. Tap the "i" from the main screen button for getting more info about the device. In the menu, tap on "All Features" to list all the available android features.
8. Navigate to "Location" card for getting location details
9. Navigate to "Music" card for playing music straight from Nightwave Plaza and other radio stations.
10. Navigate below to "Weather" card to get location based weather data.



## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Peace!!