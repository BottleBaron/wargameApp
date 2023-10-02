import { Overlay } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SecondaryObjective } from "../../assets/ObjectivesData";
import PointsInterface from "./PointsInterface";

interface DetailsOverlayProps {
	objective: SecondaryObjective;
	detailsOverlayVisible: boolean;
	isYourPoints: boolean;
	toggleDetailsOverlay: () => void;
	saveCheckBoxData: () => void;
	saveCountData: () => void;
}

export default function DetailsOverlay({
	objective,
	detailsOverlayVisible,
	toggleDetailsOverlay,
	isYourPoints,
	saveCheckBoxData,
	saveCountData,
}: DetailsOverlayProps) {
	return (
		<Overlay
			overlayStyle={{ height: "auto", justifyContent: "center", padding: 30 }}
			onBackdropPress={() => toggleDetailsOverlay()}
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
								<PointsInterface
									objective={objective}
									subRuleIndex={index}
									isYourPoints={isYourPoints}
									saveCheckboxData={saveCheckBoxData}
									saveCountData={saveCountData}
								/>
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
