  
import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

var windowHeight = Dimensions.get('window').height


export default function DragObject(props) {

    return(
        //Boilerplate style: Implement your draggable component here!
        <View style={[styles.bubble]}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    bubble:{
        // position:"absolute",
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:"green",
    }
})
