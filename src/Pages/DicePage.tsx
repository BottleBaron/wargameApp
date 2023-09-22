import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import * as Haptics from 'expo-haptics';
import { useKeepAwake } from 'expo-keep-awake';
import React, { useEffect, useState } from "react";
import { Button, Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { D6Die, dice } from "../../assets/DiceData";
import styles from "../Styling/Styles";


function getRandomD6Number() {
    return Math.floor(Math.random() * 6) + 1;
}


export default function DicePage() {
    useKeepAwake();
    const [number, setNumber] = useState('');
    const [rolledDice, setRolledDice] = useState<D6Die[]>([]);
    const [rollTotal, setRollTotal] = useState(0);
    const [rollThreshold, setRollThreshold] = useState(2);
    const [passingDice, setPassingDice] = useState(0);
    const [useReRollOne, setUseRerollOne] = useState(false);
    const [useRerollFail, setUseRerollFail] = useState(false);

    useEffect(() => {
        CalculateRolledTotal();
        CalculatePassingCount();
    }, [rolledDice])

    useEffect(() => {
        if (useRerollFail) setUseRerollOne(false);
    }, [useRerollFail]);

    const rollTheDice = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Keyboard.dismiss();

        const convertedInput = parseInt(number);
        const newRolledDice = [];

        let rerolledCount = 0;
        let rerollModeAlert = "";
        for (let i = 0; i < convertedInput; i++) {
            let randomResult = getRandomD6Number();

            if (useRerollFail && randomResult < rollThreshold) {
                randomResult = getRandomD6Number();
                rerolledCount++;
                rerollModeAlert = "fails";
            }
            else if (useReRollOne && randomResult === 1) {
                randomResult = getRandomD6Number();
                rerolledCount++;
                rerollModeAlert = "ones";
            }

            const result = dice.find(die => die.dieNumber === randomResult)

            if (result) {

                newRolledDice.push(result);
            }
        }

        setRolledDice(newRolledDice);
        setNumber('');
        if (rerolledCount > 0) alert(`Rerolled ${rerolledCount} dice using rerolls for ${rerollModeAlert}`);
    }

    function CalculateRolledTotal() {

        let total = 0;


        rolledDice.forEach(die => {
            total += die.dieNumber;
        });

        setRollTotal(total);
    };

    function CalculatePassingCount() {
        let passedTotal = 0;

        rolledDice.forEach(die => {
            if (die.dieNumber >= rollThreshold) passedTotal++;
        })

        setPassingDice(passedTotal);
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
            <View style={localStyles.OuterUIContainer}>
                <View style={localStyles.resultContainer}>
                    <Text style={localStyles.resultText}>Total: {rollTotal}</Text>
                    <Text style={localStyles.resultText}>Passing Dice: {passingDice}</Text>
                </View>
                <View style={localStyles.InterfaceContainer}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={localStyles.textInput}
                            onChangeText={setNumber}
                            placeholder="Amount of D6"
                            inputMode="numeric"
                            value={number}
                            defaultValue="1" />
                        <Button title="Roll" onPress={rollTheDice} />
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', marginTop: 5 }}>
                        <Text style={{ fontSize: 18 }}>Threshold: {rollThreshold}+</Text>
                        <Slider style={{ width: '100%', height: 25 }}
                            minimumValue={2}
                            maximumValue={6}
                            thumbTintColor="#2296f3"
                            value={rollThreshold}
                            onValueChange={setRollThreshold}
                            step={1}
                        />

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox color='#2296f3' value={useReRollOne} onValueChange={setUseRerollOne} disabled={useRerollFail} />
                                <Text style={{ marginLeft: 20, fontSize: 18 }}>Reroll 1s</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox color='#2296f3' value={useRerollFail} onValueChange={setUseRerollFail} />
                                <Text style={{ marginLeft: 20, fontSize: 18 }}>Reroll Fails</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );

    //X Haptics
    //TODO: REMOVE Accelerometer  
    // TODO: Implement expo-checkbox
    //X KeepAwake
    //X Slider 
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
    OuterUIContainer: {
        flex: 2.5,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'gray',
    },
    textInput: {
        flexDirection: 'column',
        borderWidth: 1,
        margin: 10,
    },
    resultContainer: {
        flexDirection: 'row',
        height: '20%',
        alignItems: 'center',
    },
    InterfaceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    resultText: {
        marginHorizontal: 10,
        fontSize: 24,
        fontWeight: 'bold',
    }
});