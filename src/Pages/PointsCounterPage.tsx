import { StyleSheet, View } from "react-native";
import Counter from "../Components/Counter";


export default function PointsCounterPage() {

    return (
        <View style={localStyles.pageLayout}>
            <Counter title="CP Player 1" />
            <Counter title="Obj Pts Player 1" />
            <Counter title="CP Player 2" />
            <Counter title="Obj Pts Player 2" />
        </View>
    );
}

const localStyles = StyleSheet.create({
    pageLayout: {
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
    },
});
