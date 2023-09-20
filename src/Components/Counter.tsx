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
        setCount(count + 1);
    }

    const decrementCount = () => {
        if (count > 0) setCount(count - 1)
    }

    return (
        <View style={localStyles.counterOuterShell}>
            <Text style={localStyles.titleFont}>{title}</Text>
            <View style={localStyles.counterContainer}>
                <Button title="-" onPress={decrementCount} />
                <Text>{count}</Text>
                <Button title="+" onPress={incrementCount} />
            </View>
        </View>
    );
}


const localStyles = StyleSheet.create({
    counterOuterShell: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        //NOTE: Temporary color
        backgroundColor: '#eebfff',
    },
    counterContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    titleFont: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});