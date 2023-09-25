import { StyleSheet, Text, View } from "react-native";
import Counter from "../Components/Counter";
import ObjectivesInterface from "../Components/ObjectivesInterface";


export default function PointsCounterPage() {

    return (
        <View style={{ flex: 1 }}>
            <View style={localStyles.headerText}>
                <Text>GameTracker</Text>
            </View>
            <View style={localStyles.pageLayout}>
                <View style={localStyles.headerText}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>You</Text>
                </View>
                <Counter title="Command Points" />
                <Counter title="Objective Points" />
                <ObjectivesInterface />
            </View>
            <View style={localStyles.pageLayout}>
                <View style={localStyles.headerText}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Opponent</Text>
                </View>
                <Counter title="Command Points" />
                <Counter title="Objective Points" />
                <ObjectivesInterface />
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    pageLayout: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    middleScoreText: {
        borderWidth: 3,
        borderColor: 'grey',
        flexDirection: "row",
        height: '10%',
        width: '100%',
        justifyContent: "center",
        alignItems: 'center'
    },
    headerText: {
        height: '10%',
        borderWidth: 1,
        borderColor: 'grey',
        width: '100%',
        justifyContent: "center",
        alignItems: 'center',
    },
});
