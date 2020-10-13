import React, { Component } from "react";
import { StyleSheet, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

export default class DragObject extends Component {
  constructor(props) {
    super(props);
    const { intialLocation } = this.props;
    this.translate = new Animated.ValueXY({ x: 0, y: 0 });
    this.translate.setOffset({
      x: intialLocation.left,
      y: intialLocation.top,
    });
    this.state = { initX: intialLocation.left, initY: intialLocation.top };
    this.lastOffset = { x: intialLocation.left, y: intialLocation.top };
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translate.x,
            translationY: this.translate.y,
          },
        },
      ],
      { useNativeDriver: false }
    );
  }
  _onHandlerStateChange = (event) => {
    const { initX, initY, bounds } = this.state;
    const { positioUpdated } = this.props;
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += event.nativeEvent.translationX;
      this.lastOffset.y += event.nativeEvent.translationY;
      const { intersects, positionOfDrop } = positioUpdated({
        radius: bounds.height / 2,
        x: this.translate.x.__getValue(),
        y: this.translate.y.__getValue(),
      });

      if (intersects) {
        console.log("intersects");
        this.lastOffset.x = positionOfDrop.x;
        this.lastOffset.y = positionOfDrop.y;
        this.translate.x.setOffset(this.lastOffset.x - bounds.height / 2);
        this.translate.y.setOffset(this.lastOffset.y - bounds.height / 2);
        Animated.spring(this.translate, {
          toValue: { x: 0, y: 0 },
          friction: 2,
          useNativeDriver: false,
        }).start();
      } else {
        const { intialLocation } = this.props;
        this.lastOffset.x = intialLocation.left;
        this.lastOffset.y = intialLocation.top;
        this.translate.x.setOffset(this.lastOffset.x);
        this.translate.y.setOffset(this.lastOffset.y);
        Animated.spring(this.translate, {
          toValue: { x: 0, y: 0 },
          friction: 2,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  setBounds = (event) => {
    this.setState({ bounds: event.nativeEvent.layout });
    console.log("bounds: ", event.nativeEvent.layout);
  };

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.bubble,
            {
              transform: [
                { translateX: this.translate.x },
                { translateY: this.translate.y },
              ],
            },
          ]}
          onLayout={this.setBounds}
        />
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  bubble: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "red",
    zIndex: 2,
  },
});
