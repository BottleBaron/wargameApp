import { Overlay } from "@rneui/themed";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SecondaryObjective, secondaryObjectives } from "../../assets/ObjectivesData";

export default function ObjectivesInterface() {
	const [selectOverlayVisible, setSelectOverlayVisible] = useState(false);
	const [detailsOverlayVisible, setDetailsOverlayVisible] = useState(false);
	const [activeObjectives, setActiveObjectives] = useState<SecondaryObjective[]>([]);
	const [discardedObjectives, setDiscardedObjectives] = useState<SecondaryObjective[]>([]);
	const [currentDetailsObjective, setCurrentDetailsObjective] = useState<SecondaryObjective>();

	const toggleMissionSelectMenu = () => {
		setSelectOverlayVisible(!selectOverlayVisible);
	};

	const toggleDetailsOverlay = (objective: SecondaryObjective | undefined) => {
		if (objective) setCurrentDetailsObjective(objective);
		else setCurrentDetailsObjective(undefined);

		setDetailsOverlayVisible(!detailsOverlayVisible);
	};

	interface PointsInterFaceProps {
		objective: SecondaryObjective;
	}

	const PointsInterface = ({ objective }: PointsInterFaceProps) => {
		const [isChecked, setIsChecked] = useState(false);

		if (objective.isCumulative) {
			objective.cumulativeCount = 0;

			return (
				<View>
					<View>
						<Button title="-" />
					</View>
					<Text>{objective.cumulativeCount}</Text>
					<View>
						<Button title="+" />
					</View>
				</View>
			);
		} else {
			return (
				<View>
					<Checkbox />
				</View>
			);
		}
	};

	//TODO: Add confirm function to discard objectives.
	//TODO: Add Reload Objectives

	const discardObjective = (objective: SecondaryObjective) => {
		const isActive = activeObjectives.some((m) => m.id === objective.id);

		if (isActive) {
			setActiveObjectives(activeObjectives.filter((m) => m.id !== objective.id));
			setDiscardedObjectives([...discardedObjectives, objective]);
		} else {
			setDiscardedObjectives([...discardedObjectives, objective]);
		}
	};

	const toggleActiveMission = (objective: SecondaryObjective) => {
		const isActive = activeObjectives.some((m) => m.id === objective.id);

		console.log(isActive);
		if (!isActive && activeObjectives.length < 3) {
			setActiveObjectives([...activeObjectives, objective]);
		} else {
			setActiveObjectives(activeObjectives.filter((m) => m.id !== objective.id));
		}
	};

	return (
		<View style={localStyles.container}>
			<View style={localStyles.buttonContainer}>
				<Button title="Select mission" onPress={toggleMissionSelectMenu} />
			</View>
			<View style={localStyles.objectiveView}>
				{activeObjectives.map((objective, index) => (
					<TouchableOpacity
						key={index}
						style={localStyles.objectiveEntry}
						onPress={() => toggleDetailsOverlay(objective)} //TODO: Objective description overlay
					>
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
						<Button title="Randomize" />
					</View>
					{secondaryObjectives.map((objective, index) => (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}>
							<TouchableOpacity
								key={index}
								disabled={discardedObjectives.some((m) => m.id === objective.id)}
								onPress={() => toggleActiveMission(objective)}
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
									onValueChange={() => toggleActiveMission(objective)}
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
									title="R"
									disabled={!discardedObjectives.some((m) => m.id === objective.id)}
									onPress={() => setDiscardedObjectives(discardedObjectives.filter((m) => m.id !== objective.id))}
								/>
							</View>
						</View>
					))}
				</View>
			</Overlay>

			<Overlay
				overlayStyle={{ height: "auto", justifyContent: "center" }}
				onBackdropPress={() => toggleDetailsOverlay(undefined)}
				isVisible={detailsOverlayVisible}>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Text style={localStyles.mediumFont}>{currentDetailsObjective?.name}</Text>
					<Text style={{ margin: 10 }}>{currentDetailsObjective?.objectiveRule}</Text>

					<View>
						{currentDetailsObjective?.subRules.map((subrule, index) => (
							<View key={index} style={localStyles.subruleContainer}>
								<View>
									<Text style={{ fontSize: 16 }}>{subrule.title}</Text>
									<Text style={{ fontStyle: "italic", color: "grey" }}>
										Points per completion: {subrule.pointsPerCompletion}pts
									</Text>
								</View>
								<View style={{ padding: 10, marginHorizontal: 10 }}>
									<PointsInterface objective={currentDetailsObjective} />
								</View>
							</View>
						))}
					</View>
				</View>
			</Overlay>
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
		justifyContent: "space-between",
	},
});
