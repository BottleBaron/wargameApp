import * as Haptics from 'expo-haptics';
import React, { useState } from "react";
import { Button, Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { D6Die, dice } from "../../assets/DiceData";
import styles from "../Styling/Styles";


function getRandomD6Number() {
    return Math.floor(Math.random() * 6) + 1;
}


export default function DicePage() {
    const [number, setNumber] = useState('');
    const [rolledDice, setRolledDice] = useState<D6Die[]>([]);

    const rollTheDice = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Keyboard.dismiss();

        const convertedInput = parseInt(number);
        const newRolledDice = [];

        for (let i = 0; i < convertedInput; i++) {
            const randomResult = getRandomD6Number();
            const result = dice.find(die => die.dieNumber === randomResult)

            if (result) {
                newRolledDice.push(result);
            }
        }

        setRolledDice(newRolledDice);
        setNumber('');
    }



    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 5, width: '100%' }}>
                <ScrollView contentContainerStyle={localStyles.diceOuterShell}>
                    {rolledDice.map((die, index) => (
                        <View key={index} style={localStyles.diceContainer}>
                            <Image source={{ uri: die.image }}
                                onError={() => alert(`Error loading image for die ${die.dieNumber}`)}
                                style={localStyles.diceImage} />
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <View style={localStyles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumber}
                    placeholder="Amount of D6"
                    inputMode="numeric"
                    value={number}
                    defaultValue="1" />
                <Button title="Roll" onPress={rollTheDice} />
            </View>
        </View >
    );

    //Haptics
    //Accelerometer
    //Devicemotion
    //KeepAwake
}

const localStyles = StyleSheet.create({
    diceOuterShell: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    diceContainer: {
        width: '25%',
        alignItems: 'center',
    },
    diceImage: {
        width: 100,
        height: 100,
    },
    inputContainer: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'gray',
    }
});