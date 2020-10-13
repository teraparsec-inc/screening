import React, { useState, Component } from "react";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import DragObject from "./DragObject";

var windowHeight = Dimensions.get("window").height;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropCircle: { x: 0, y: 0, radius: 0 },
      itemCircle: { x: 0, y: 0, radius: 0 },
      dropColor: "black",
    };
  }

  setDropZoneRectangle = (event) => {
    console.log(event.nativeEvent.layout);
    this.setState({ dropZoneRect: event.nativeEvent.layout }, () => {
      this.updateDropZonePosition();
    });
  };

  setDropZoneRadius = (event) => {
    console.log(event.nativeEvent.layout);
    this.setState({ dropZoneCircle: event.nativeEvent.layout }, () => {
      this.updateDropZonePosition();
    });
  };

  updateDropZonePosition = () => {
    const { dropZoneRect, dropZoneCircle } = this.state;
    if (dropZoneRect && dropZoneCircle) {
      const dropZoneRadius = dropZoneCircle.height;
      const dropCenterX =
        dropZoneCircle.width / 2 + dropZoneCircle.x + dropZoneRect.x;
      const dropCenterY =
        dropZoneCircle.height / 2 +
        dropZoneRect.height -
        dropZoneCircle.height +
        dropZoneRect.y;
      this.setState({
        dropCircle: {
          x: dropCenterX,
          y: dropCenterY - 4,
          radius: dropZoneRadius / 2,
        },
      });
    }
  };

  boxPositionUpdated = (dragItemBounds) => {
    const { dropCircle } = this.state;
    const circleCenterX = dragItemBounds.x + dragItemBounds.radius;
    const circleCenterY = dragItemBounds.y + dragItemBounds.radius;
    const itemCircle = {
      x: circleCenterX,
      y: circleCenterY,
      radius: dragItemBounds.radius,
    };
    const intersection = this.twoCirclesIntersects(itemCircle, dropCircle);
    this.setState({ dropColor: intersection ? "blue" : "black" });
    return {
      intersects: intersection,
      positionOfDrop: dropCircle,
    };
  };

  twoCirclesIntersects = (circle1, circle2) => {
    const xd = circle1.x - circle2.x;
    const yd = circle1.y - circle2.y;
    const rs = circle1.radius + circle2.radius;

    return xd * xd + yd * yd <= rs * rs;
  };

  render() {
    const { dropColor } = this.state;
    return (
      <View style={styles.container}>
        <DragObject
          intialLocation={{ top: 200, left: 300 }}
          positioUpdated={this.boxPositionUpdated}
        />

        <View style={styles.lockContainer} onLayout={this.setDropZoneRectangle}>
          <Text>Drag Here To Magnetize!</Text>
          <View
            style={[styles.lockDrop, { borderColor: dropColor }]}
            onLayout={this.setDropZoneRadius}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#ff0000", flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  lockContainer: {
    position: "absolute",
    top: windowHeight * 0.7,
    alignSelf: "center",
  },
  lockDrop: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderWidth: 1,
    margin: 5,
  },
});
