import React, { useState } from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import Camera from './cam_service';

const Cam=()=>{
    const [back,setBack]=useState(true);
    return(
        <>
         <View><TouchableOpacity></TouchableOpacity></View>
        <View style={{flex:1}}><Camera/></View>
        </>
       
    );
}
export default Cam;