import Checkbox from "expo-checkbox";
import { Button, Text, View } from "react-native";
import { SecondaryObjective } from "../../assets/ObjectivesData";
import { usePointsContext } from "../Utilities/PointsContext";

interface PointsInterFaceProps {
	objective: SecondaryObjective;
	subRuleIndex: number;
	isYourPoints: boolean;
	saveCheckboxData: () => void;
	saveCountData: () => void;
}

export default function PointsInterface({ objective, subRuleIndex, isYourPoints, saveCheckboxData, saveCountData }: PointsInterFaceProps) {
	const { dispatch } = usePointsContext();

	const decreaseCumulativePoints = () => {
		if (
			typeof objective.subRules[subRuleIndex]?.cumulativeCount === "number" &&
			objective.subRules[subRuleIndex]?.cumulativeCount !== 0
		) {
			saveCountData();
			dispatch({
				type: "SUBTRACT_POINTS",
				payload: objective.subRules[subRuleIndex].pointsPerCompletion,
				target: isYourPoints ? "YOUR_POINTS" : "OPPONENT_POINTS",
			});
		}
	};

	const increaseCumulativePoints = () => {
		if (typeof objective.subRules[subRuleIndex]?.cumulativeCount === "number") {
			saveCountData();
			dispatch({
				type: "ADD_POINTS",
				payload: objective.subRules[subRuleIndex].pointsPerCompletion,
				target: isYourPoints ? "YOUR_POINTS" : "OPPONENT_POINTS",
			});
		}
	};

	const toggleGainedPoints = () => {
		// setActiveObjectives(
		// 	activeObjectives.map((o) => {
		// 		if (o.id === objective.id) {
		// 			const copy = JSON.parse(JSON.stringify(o)) as SecondaryObjective;
		// 			copy.subRules[subRuleIndex].isChecked = !copy.subRules[subRuleIndex].isChecked;
		// 			return copy;
		// 		}

		// 		return o;
		// 	})
		// );

		saveCheckboxData();

		if (!objective.subRules[subRuleIndex].isChecked) {
			dispatch({
				type: "ADD_POINTS",
				payload: objective.subRules[subRuleIndex].pointsPerCompletion,
				target: isYourPoints ? "YOUR_POINTS" : "OPPONENT_POINTS",
			});
		} else {
			dispatch({
				type: "SUBTRACT_POINTS",
				payload: objective.subRules[subRuleIndex].pointsPerCompletion,
				target: isYourPoints ? "YOUR_POINTS" : "OPPONENT_POINTS",
			});
		}
	};

	if (objective.isCumulative && objective.subRules[subRuleIndex]) {
		if (!objective.subRules[subRuleIndex].cumulativeCount) {
			objective.subRules[subRuleIndex].cumulativeCount = 0;
		}

		return (
			<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
				<View style={{ padding: 5 }}>
					<Button title="-" onPress={decreaseCumulativePoints} />
				</View>
				<Text>{objective.subRules[subRuleIndex].cumulativeCount}</Text>
				<View style={{ padding: 5 }}>
					<Button title="+" onPress={increaseCumulativePoints} />
				</View>
			</View>
		);
	} else if (objective.subRules[subRuleIndex]) {
		if (!objective.subRules[subRuleIndex].isChecked) {
			objective.subRules[subRuleIndex].isChecked = false;
		}

		return (
			<View style={{ padding: 5 }}>
				<Checkbox value={objective.subRules[subRuleIndex].isChecked} onValueChange={toggleGainedPoints} />
			</View>
		);
	}
}
