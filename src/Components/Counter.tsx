import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { usePointsContext } from "../Utilities/PointsContext";

interface CounterProps {
	title: string;
	isPointsCounter: [boolean, boolean];
}

export default function Counter({ title, isPointsCounter }: CounterProps) {
	const [count, setCount] = useState(0);
	const { state, dispatch } = usePointsContext();

	const incrementCount = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setCount(count + 1);

		if (isPointsCounter[0]) {
			dispatch({ type: "ADD_POINTS", payload: 1, target: isPointsCounter[1] ? "YOUR_POINTS" : "OPPONENT_POINTS" });
		}
	};

	const decrementCount = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		if (count > 0) {
			setCount(count - 1);
			if (isPointsCounter[0]) {
				dispatch({ type: "SUBTRACT_POINTS", payload: 1, target: isPointsCounter[1] ? "YOUR_POINTS" : "OPPONENT_POINTS" });
			}
		}
	};

	return (
		<View style={localStyles.counterOuterShell}>
			<Text style={localStyles.titleText}>{title}</Text>
			<View style={localStyles.counterContainer}>
				<View style={localStyles.buttonContainer}>
					<Button title="-" onPress={decrementCount} />
				</View>
				<Text style={localStyles.counterText}>{count}</Text>
				<View style={localStyles.buttonContainer}>
					<Button title="+" onPress={incrementCount} />
				</View>
			</View>
		</View>
	);
}

const localStyles = StyleSheet.create({
	counterOuterShell: {
		height: "40%",
		width: "50%",
		borderWidth: 2,
		borderColor: "grey",
		justifyContent: "center",
		alignItems: "center",
	},
	counterContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	counterText: {
		fontSize: 20,
		color: "#555555",
		fontWeight: "bold",
		marginHorizontal: 10,
	},
	buttonContainer: {
		justifyContent: "center",
		height: 50,
		width: 50,
	},
});
