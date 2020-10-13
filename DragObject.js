import { DraxView } from 'react-native-drax';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function DragObject(props) {
  return (
      //Boilerplate style: Implement your draggable component here!
      <DraxView
        style={{...styles.bubble, 
          bottom: props.intialLocation.bottom, 
          left: props.intialLocation.left,
          width: 2*props.objectRadius,
          height: 2*props.objectRadius,
        }}
        onDragEnd={() => {
          if (props.isMovedOutOfDroppedZone) {
            props.setIsInDroppedZone(false);
            props.updateDropColor('blue')
          }
        }}
      />
  );
}

const styles = StyleSheet.create({
  bubble:{
    position:"absolute",
    zIndex: 100,
    borderRadius:120,
    backgroundColor:"green",
  }
})
