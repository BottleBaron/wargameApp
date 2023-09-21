import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    View
} from "react-native";

interface CounterProps {
    title: string
}

export default function Counter({ title }: CounterProps) {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCount(count + 1);
    }

    const decrementCount = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (count > 0) setCount(count - 1)
    }

    return (
        <View style={localStyles.counterOuterShell}>
            <Text style={localStyles.titleText}>{title}</Text>
            <View style={localStyles.counterContainer}>
                <Button title="-" onPress={decrementCount} />
                <Text style={localStyles.counterText}>{count}</Text>
                <Button title="+" onPress={incrementCount} />
            </View>
        </View>
    );
}


const localStyles = StyleSheet.create({
    counterOuterShell: {
        height: '50%',
        width: '50%',
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    counterText: {
        fontSize: 18,
        fontWeight: '400',
        marginHorizontal: 10,
    },
});