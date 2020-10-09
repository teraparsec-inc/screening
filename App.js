import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import DragObject from "./DragObject"
var windowHeight = Dimensions.get('window').height


export default function App() {

  //This state variable keeps track of the current color, which should change on magnetize!
  const [dropColor,updateDropColor] = useState("blue")

  return (
    <View style={styles.container}>
      
      <DragObject intialLocation={{top:50,left:100}}/>

      <View style={styles.lockContainer}>
        <Text>Drag Here To Magnetize!</Text>
        <View style={[styles.lockDrop,{borderColor:dropColor}]} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:"center"
  },
  lockContainer: {
    position: "absolute",
    top: windowHeight * .7
  },
  lockDrop: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderWidth: 1,
    margin: 5,
  }
});
