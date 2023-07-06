import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph, Text} from 'react-native-paper';
const Easy=()=>{
    const navigation=useNavigation()
    const data=["Sensors","Music-Radio","Location","Weather","Device Info","Additional Features","Camera"]
    return(
        <ScrollView style={{backgroundColor:'#6B7A8F'}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Sensors')}} style={styles.options}>
            <Card>
                <Card.Content>
                    <Paragraph style={{flex:1}}>{data[0]}</Paragraph>
                </Card.Content>
            </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Music')}} style={styles.options}>
            <Card>
                <Card.Content>
                    <Paragraph>{data[1]}</Paragraph>
                </Card.Content>
            </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Location')}} style={styles.options}>
            <Card>
                <Card.Content>
                    <Paragraph>{data[2]}</Paragraph>
                </Card.Content>
            </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Weather')}} style={styles.options}>
            <Card>
                <Card.Content>
                    <Paragraph>{data[3]}</Paragraph>
                </Card.Content>
            </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Device Info')}} style={styles.options}>
            <Card>
                <Card.Content>
                    <Paragraph>{data[4]}</Paragraph>
                </Card.Content>
            </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Features')}} style={styles.options}>
            <Card>
                <Card.Content>
                    <Paragraph>{data[5]}</Paragraph>
                </Card.Content>
            </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Camera')}} style={styles.options}>
            <Card>
                <Card.Content>
                    <Paragraph>{data[6]}</Paragraph>
                </Card.Content>
            </Card>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Easy;

const styles=StyleSheet.create({
    options:{
        margin:6
    }
})