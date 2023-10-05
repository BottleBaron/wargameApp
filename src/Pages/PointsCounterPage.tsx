import Checkbox from "expo-checkbox";
import { useKeepAwake } from "expo-keep-awake";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Counter from "../Components/Counter";
import ObjectivesInterface from "../Components/ObjectivesInterface";
import { ActiveObjectivesProvider } from "../Utilities/ActiveObjectivesContext";
import { ObjectivesDetailsProvider } from "../Utilities/ObjectiveDetailsContext";
import { usePointsContext } from "../Utilities/PointsContext";

export default function PointsCounterPage() {
	useKeepAwake();
	const { state } = usePointsContext();
	const [usingWTCScoring, setUsingWTCScoring] = useState(false);
	const [displayPoints, setDisplayPoints] = useState<number[]>([]);

	const toggleUsingWTCScoring = () => {
		setUsingWTCScoring(!usingWTCScoring);
	};

	function setPointsAsWTCScore() {
		const difference = Math.abs(state.points[0] - state.points[1]);

		const nonLinearScores = [
			[10, 10],
			[11, 9],
			[12, 8],
			[13, 7],
			[14, 6],
			[15, 5],
			[16, 4],
			[17, 3],
			[18, 2],
			[19, 1],
			[20, 0],
		];

		for (let i = 0; i < nonLinearScores.length; i++) {
			const [lowerBound, upperBound] = nonLinearScores[i];
			if (difference >= i * 5 && difference <= i * 5 + 5) {
				if (state.points[0] < state.points[1]) {
					setDisplayPoints([upperBound, lowerBound]);
				} else {
					setDisplayPoints([lowerBound, upperBound]);
				}
				return;
			}
		}

		setDisplayPoints([10, 10]);
	}

	useEffect(() => {
		if (usingWTCScoring) {
			setPointsAsWTCScore();
		} else {
			setDisplayPoints([state.points[0], state.points[1]]);
		}
	}, [usingWTCScoring]);

	useEffect(() => {
		if (usingWTCScoring) {
			setPointsAsWTCScore();
		} else {
			setDisplayPoints([state.points[0], state.points[1]]);
		}
	}, [state]);

	return (
		<View style={{ flex: 1 }}>
			<View style={localStyles.headerText}>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Checkbox value={usingWTCScoring} onValueChange={toggleUsingWTCScoring} style={{ padding: 10, margin: 10 }} />
					<Text>Use WTC Scoring</Text>
				</View>

				<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
					<Text style={{ margin: 10 }}>YOU</Text>
					<Text style={{ fontSize: 40 }}>
						{displayPoints[0]} / {displayPoints[1]}
					</Text>
					<Text style={{ margin: 10 }}>OPP</Text>
				</View>
			</View>
			<View style={localStyles.pageLayout}>
				<View style={localStyles.headerText}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>You</Text>
				</View>
				<Counter title="Command Points" isPointsCounter={[false, false]} />
				<Counter title="Objective Points" isPointsCounter={[true, true]} />
				<ActiveObjectivesProvider>
					<ObjectivesDetailsProvider>
						<ObjectivesInterface isYourPoints={true} />
					</ObjectivesDetailsProvider>
				</ActiveObjectivesProvider>
			</View>
			<View style={localStyles.pageLayout}>
				<View style={localStyles.headerText}>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>Opponent</Text>
				</View>
				<Counter title="Command Points" isPointsCounter={[false, false]} />
				<Counter title="Objective Points" isPointsCounter={[true, false]} />
				<ActiveObjectivesProvider>
					<ObjectivesDetailsProvider>
						<ObjectivesInterface isYourPoints={false} />
					</ObjectivesDetailsProvider>
				</ActiveObjectivesProvider>
			</View>
		</View>
	);
}

const localStyles = StyleSheet.create({
	pageLayout: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	middleScoreText: {
		borderWidth: 3,
		borderColor: "grey",
		flexDirection: "row",
		height: "10%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	headerText: {
		height: "10%",
		borderWidth: 1,
		borderColor: "grey",
		width: "100%",
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection: "row",
	},
});
