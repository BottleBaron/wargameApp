import * as Haptics from 'expo-haptics';
import React, { useState } from "react";
import { Button, Image, Keyboard, TextInput, View } from "react-native";
import { D6Die, dice } from "../../assets/DiceData";
import styles from "../Styling/Styles";


function getRandomD6Number() {
    return Math.floor(Math.random() * 6) + 1;
}


export default function DicePage() {
    const [number, onChangeNumber] = useState('');
    const [rolledDice, setRolledDice] = useState<D6Die[]>([]);

    const rollTheDice = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Keyboard.dismiss();

        const convertedInput = parseInt(number);
        const newRolledDice = [];

        for (let i = 0; i < convertedInput; i++) {
            const result = dice.find(die => die.dieNumber === getRandomD6Number())

            if (result) newRolledDice.push(result);
        }

        setRolledDice(newRolledDice);
        onChangeNumber('');
    }



    return (
        <View style={styles.container}>
            {rolledDice.map((die, index) => (
                <View key={index}>
                    <Image source={{ uri: die.image }}
                        onError={() => console.error(`Error loading image for die ${die.dieNumber}`)}
                        style={{ width: 100, height: 100 }} />
                </View>
            ))}
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
    //Accelerometer
    //Devicemotion
    //KeepAwake

}