import * as Haptics from 'expo-haptics';
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { D6Die } from "../../assets/DiceData";
import styles from "../Styling/Styles";



export default function DicePage() {
    const [number, onChangeNumber] = useState('');

    const rolledDice: D6Die[] = [];

    const rollTheDice = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        alert(Random.getRandomBytes(6));
    }


    return (
        <View style={styles.container}>



            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                placeholder="Amount of D6"
                inputMode="numeric"
                value={number}
                defaultValue="1" />
            <Button title="Roll" onPress={rollTheDice} />
        </View>
    );



    //Haptics
    //DeviceMotion
    //KeepAwake

}