import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { SecondaryObjective } from "../../assets/ObjectivesData";
import { useActiveObjectives } from "../Utilities/ActiveObjectivesContext";
import { usePointsContext } from "../Utilities/PointsContext";

interface PointsInterFaceProps {
	objective: SecondaryObjective;
	subRuleIndex: number;
	isYourPoints: boolean;
}

export default function PointsInterface({ objective, subRuleIndex, isYourPoints }: PointsInterFaceProps) {
	const { dispatch } = usePointsContext();
	const { updateActiveObjective } = useActiveObjectives();
	const [clone, setClone] = useState(JSON.parse(JSON.stringify(objective)) as SecondaryObjective);

	const decreaseCumulativePoints = () => {
		if (typeof clone.subRules[subRuleIndex]?.cumulativeCount === "number" && clone.subRules[subRuleIndex]?.cumulativeCount !== 0) {
			setClone((prevClone) => ({
				...prevClone,
				subRules: prevClone.subRules.map((subRule, index) => {
					if (index === subRuleIndex) {
						return {
							...subRule,
							cumulativeCount: (subRule.cumulativeCount ?? 0) - 1,
						};
					}
					return subRule;
				}),
			}));
			updateActiveObjective(clone);

			dispatch({
				type: "SUBTRACT_POINTS",
				payload: objective.subRules[subRuleIndex].pointsPerCompletion,
				target: isYourPoints ? "YOUR_POINTS" : "OPPONENT_POINTS",
			});
		}
	};

	const increaseCumulativePoints = () => {
		if (typeof clone.subRules[subRuleIndex]?.cumulativeCount === "number") {
			setClone((prevClone) => ({
				...prevClone,
				subRules: prevClone.subRules.map((subRule, index) => {
					if (index === subRuleIndex) {
						return {
							...subRule,
							cumulativeCount: (subRule.cumulativeCount ?? 0) + 1,
						};
					}
					return subRule;
				}),
			}));
			updateActiveObjective(clone);

			dispatch({
				type: "ADD_POINTS",
				payload: objective.subRules[subRuleIndex].pointsPerCompletion,
				target: isYourPoints ? "YOUR_POINTS" : "OPPONENT_POINTS",
			});
		}
	};

	const toggleGainedPoints = () => {
		clone.subRules[subRuleIndex].isChecked = !clone.subRules[subRuleIndex].isChecked;
		setClone(clone);
		updateActiveObjective(clone);

		if (clone.subRules[subRuleIndex].isChecked) {
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
		if (!clone.subRules[subRuleIndex].cumulativeCount) {
			clone.subRules[subRuleIndex].cumulativeCount = 0;
		}

		return (
			<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
				<View style={{ padding: 5 }}>
					<Button title="-" onPress={decreaseCumulativePoints} />
				</View>
				<Text>{clone.subRules[subRuleIndex].cumulativeCount}</Text>
				<View style={{ padding: 5 }}>
					<Button title="+" onPress={increaseCumulativePoints} />
				</View>
			</View>
		);
	} else if (clone.subRules[subRuleIndex]) {
		if (!clone.subRules[subRuleIndex].isChecked) {
			clone.subRules[subRuleIndex].isChecked = false;
		}

		return (
			<View style={{ padding: 5 }}>
				<Checkbox value={clone.subRules[subRuleIndex].isChecked} onValueChange={toggleGainedPoints} />
			</View>
		);
	}
}
