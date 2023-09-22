import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "../Styling/Styles";

export default function AccelerometerTest() {
    const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
    const [isActive, setIsactive] = useState(false);
    Accelerometer.setUpdateInterval(500);


    useEffect(() => {
        const subscription = Accelerometer.addListener(setData);
        toggleOnAcceleration();
        return () => subscription.remove();
    });

    function toggleOnAcceleration() {
        if (x > 5 || y > 5 || z > 5) setIsactive(true);
        else setIsactive(false);
    }

    return (
        <View style={styles.container}>
            <Text>Test Page</Text>
            <Text>X: {x}</Text>
            <Text>Y: {y}</Text>
            <Text>Z: {z}</Text>
            <Text>{isActive.toString()}</Text>
        </View>
    );
}