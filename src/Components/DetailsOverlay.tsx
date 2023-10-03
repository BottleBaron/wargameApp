import { Overlay } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SecondaryObjective } from "../../assets/ObjectivesData";
import { useObjectiveDetails } from "../Utilities/ObjectiveDetailsContext";
import PointsInterface from "./PointsInterface";

interface DetailsOverlayProps {
	objective: SecondaryObjective;
	isYourPoints: boolean;
}

export default function DetailsOverlay({ objective, isYourPoints }: DetailsOverlayProps) {
	const { detailsOverlayVisible, toggleDetailsOverlayVisible } = useObjectiveDetails();

	return (
		<Overlay
			overlayStyle={{ height: "auto", justifyContent: "center", padding: 30 }}
			onBackdropPress={toggleDetailsOverlayVisible}
			isVisible={detailsOverlayVisible}>
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<Text style={localStyles.mediumFont}>{objective?.name}</Text>
				<Text style={{ margin: 10 }}>{objective.objectiveRule}</Text>
				<View>
					{objective?.subRules.map((subrule, index) => (
						<View key={index} style={localStyles.subruleContainer}>
							<View>
								<Text style={{ fontSize: 16 }}>{subrule.title}</Text>
								<Text style={{ fontStyle: "italic", color: "grey" }}>
									Points per completion: {subrule.pointsPerCompletion}pts
								</Text>
							</View>
							<View style={{ marginLeft: 10 }}>
								<PointsInterface objective={objective} subRuleIndex={index} isYourPoints={isYourPoints} />
							</View>
						</View>
					))}
				</View>
			</View>
		</Overlay>
	);
}

const localStyles = StyleSheet.create({
	mediumFont: {
		fontSize: 20,
		fontWeight: "400",
	},
	subruleContainer: {
		borderColor: "grey",
		borderWidth: 1,
		flexDirection: "row",
		padding: 10,
		justifyContent: "space-between",
	},
});
