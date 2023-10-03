import { Overlay } from "@rneui/themed";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SecondaryObjective, secondaryObjectives } from "../../assets/ObjectivesData";
import { useActiveObjectives } from "../Utilities/ActiveObjectivesContext";
import { useObjectiveDetails } from "../Utilities/ObjectiveDetailsContext";
import DetailsOverlay from "./DetailsOverlay";

interface ObjectivesInterfaceProps {
	isYourPoints: boolean;
}

export default function ObjectivesInterface({ isYourPoints }: ObjectivesInterfaceProps) {
	const [selectOverlayVisible, setSelectOverlayVisible] = useState(false);
	const [discardedObjectives, setDiscardedObjectives] = useState<SecondaryObjective[]>([]);
	const { toggleDetailsOverlayVisible } = useObjectiveDetails();
	const { activeObjectives, toggleActiveObjective, removeActiveObjective } = useActiveObjectives();

	const emptySecondaryObjective: SecondaryObjective = {
		id: 0,
		name: "",
		objectiveRule: "",
		isCumulative: false,
		subRules: [],
	};
	const [currentDetailsObjective, setCurrentDetailsObjective] = useState<SecondaryObjective>(emptySecondaryObjective);

	const toggleMissionSelectMenu = () => {
		setSelectOverlayVisible(!selectOverlayVisible);
	};

	const activateDetailsOverlay = (objectiveId: number) => {
		const objective = activeObjectives.find((o) => o.id === objectiveId);
		if (objective) setCurrentDetailsObjective(objective);

		toggleDetailsOverlayVisible();
	};

	// TODO: Fix issue where more than one subRule is checkable at a given time
	// TODO: Add turn system and Command Phase / EOT dialogue for discard

	const discardObjective = (objective: SecondaryObjective) => {
		const isActive = activeObjectives.some((m) => m.id === objective.id);

		if (isActive) removeActiveObjective(objective.id);

		setDiscardedObjectives([...discardedObjectives, objective]);
	};

	//TODO: Filter out non avaliable items and random with avaliable
	// Generates three random objectives
	const randomizeObjectives = () => {
		let i = 0;
		while (true) {
			const randomIndex = Math.floor(Math.random() * secondaryObjectives.length) + 1;
			const random = secondaryObjectives.find((o) => o.id === randomIndex);

			if (random) {
				if (!discardedObjectives.some((m) => m.id === random.id) && !activeObjectives.some((m) => m.id === random.id)) {
					toggleActiveObjective(random);
					break;
				} else {
					if (i > 20) break;
					else i++;
				}
			}
		}
	};

	return (
		<View style={localStyles.container}>
			<View style={localStyles.buttonContainer}>
				<Button title="Select mission" onPress={toggleMissionSelectMenu} />
			</View>
			<View style={localStyles.objectiveView}>
				{activeObjectives.map((objective, index) => (
					<TouchableOpacity key={index} style={localStyles.objectiveEntry} onPress={() => activateDetailsOverlay(objective.id)}>
						<Text style={[localStyles.mediumFont, { paddingHorizontal: 20 }]}>{objective.name}</Text>
						<Button title="DISCARD" onPress={() => discardObjective(objective)} />
					</TouchableOpacity>
				))}
			</View>

			<Overlay
				overlayStyle={{ height: "auto", justifyContent: "center" }}
				onBackdropPress={toggleMissionSelectMenu}
				isVisible={selectOverlayVisible}>
				<View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
							}}>
							Tactical Objectives
						</Text>
						<View style={{ paddingLeft: 20 }}>
							<Button title="X" onPress={toggleMissionSelectMenu} />
						</View>
					</View>
					<View style={{ width: "100%" }}>
						<Button title="Randomize" onPress={randomizeObjectives} />
					</View>
					{secondaryObjectives.map((objective, index) => (
						<View
							key={index}
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}>
							<TouchableOpacity
								disabled={discardedObjectives.some((m) => m.id === objective.id)}
								onPress={() => toggleActiveObjective(objective)}
								style={{
									flexDirection: "row",
									padding: 10,
									justifyContent: "space-between",
									alignItems: "center",
								}}>
								<Checkbox
									color="#2296f3"
									disabled={discardedObjectives.some((m) => m.id === objective.id)}
									value={activeObjectives.some((m) => m.id === objective.id)}
									onValueChange={() => toggleActiveObjective(objective)}
								/>
								<Text
									style={{
										fontSize: 18,
										fontWeight: "400",
										paddingHorizontal: 10,
									}}>
									{objective.name}
								</Text>
							</TouchableOpacity>
							<View
								style={{
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Button
									title="Reload"
									disabled={!discardedObjectives.some((m) => m.id === objective.id)}
									onPress={() => setDiscardedObjectives(discardedObjectives.filter((m) => m.id !== objective.id))}
								/>
							</View>
						</View>
					))}
				</View>
			</Overlay>
			<DetailsOverlay objective={currentDetailsObjective} isYourPoints={isYourPoints} />
		</View>
	);
}

const localStyles = StyleSheet.create({
	container: {
		height: "50%",
		width: "100%",
		flexDirection: "column",
		borderWidth: 1,
		borderBottomWidth: 2,
		borderColor: "grey",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
	},
	objectiveView: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	objectiveEntry: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
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
