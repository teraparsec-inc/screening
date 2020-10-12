import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import DragObject from "./DragObject"
import {DraxProvider, DraxView} from 'react-native-drax';

const windowHeight = Dimensions.get('window').height

export default function App() {

    //This state variable keeps track of the current color, which should change on magnetize!
    const [dropColor, updateDropColor] = useState("blue")
    const [received, setReceived] = React.useState('?');
    const [out, setOut] = React.useState(true)
    return (
        <DraxProvider>
            <View style={styles.container}>
                <View style={styles.lockContainer}>
                    <Text>Drag Here To Magnetize!</Text>
                    <DraxView
                        renderContent={({viewState}) => {
                            const receivingDrag = viewState && viewState.receivingDrag;
                            console.log('receivingDrag', receivingDrag)
                            return (<View style={[styles.lockDrop, {borderColor: received !== '?' ? "green" : "blue"}]}>
                                {received !== '?' && <DraxView
                                    style={[styles.centeredContent, styles.draggableBox, styles.red]}
                                    draggingStyle={styles.dragging}
                                    dragReleasedStyle={styles.dragging}
                                    hoverDraggingStyle={styles.hoverDragging}
                                    dragPayload={'R'}
                                    longPressDelay={0}
                                    onDragEnd={() => {
                                        if (out) {
                                            setReceived("?")
                                        }
                                    }}
                                >
                                    <DragObject/>
                                </DraxView>}
                            </View>)
                        }}
                        onReceiveDragDrop={(event) => {
                            setReceived(
                                event.dragged.payload || '?'
                            );
                            setOut(false)
                        }}
                        onReceiveDragExit={(event) => {
                            setOut(true)
                        }}
                    />

                </View>
                {received === "?" && <DraxView
                    style={[styles.centeredContent, styles.draggableBox, styles.red]}
                    draggingStyle={styles.dragging}
                    dragReleasedStyle={styles.dragging}
                    hoverDraggingStyle={styles.hoverDragging}
                    dragPayload={'R'}
                    longPressDelay={0}
                >
                    <DragObject/>
                </DraxView>}
            </View>
        </DraxProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center"
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    draggableBox: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    dragging: {
        opacity: 0,
    },
    hoverDragging: {},
});
