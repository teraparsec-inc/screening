import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, PanResponder } from 'react-native';
import DragObject from "./DragObject"
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


export default function App() {

  //This state variable keeps track of the current color, which should change on magnetize!
  const [dropColor,updateDropColor] = useState("blue")
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        if((((gesture.moveY > windowHeight * .7)) && gesture.moveY < (windowHeight * .7)+150) 
        && ((gesture.moveX > windowWidth * .5 -60) && (gesture.moveX < windowWidth * .5 + 60))
        ){
          Animated.spring(            
            pan,         
            {toValue:{x:0,y:255}} 
          ).start();
          updateDropColor('red');
        } else {
          updateDropColor('blue');
          Animated.spring(            
            pan,         
            {toValue:{x:0,y:0}} 
          ).start();
        }
      }
    })
  ).current;


  return (
    <View style={styles.container}>
      
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          zIndex: 999
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
        <DragObject intialLocation={{top:50,left:100}}/>
      </Animated.View>

        

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
