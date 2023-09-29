import { Overlay } from "@rneui/themed";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SecondaryObjective, secondaryObjectives } from "../../assets/ObjectivesData";
import { usePointsContext } from "../Utilities/PointsContext";

interface ObjectivesInterfaceProps {
	isYourPoints: boolean;
}

export default function ObjectivesInterface({ isYourPoints }: ObjectivesInterfaceProps) {
	const [selectOverlayVisible, setSelectOverlayVisible] = useState(false);
	const [detailsOverlayVisible, setDetailsOverlayVisible] = useState(false);
	const [activeObjectives, setActiveObjectives] = useState<SecondaryObjective[]>([]);
	const [discardedObjectives, setDiscardedObjectives] = useState<SecondaryObjective[]>([]);
	const { state, dispatch } = usePointsContext();
	const [detailsTargetId, setDetailsTargetId] = useState(0);

	const toggleMissionSelectMenu = () => {
		setSelectOverlayVisible(!selectOverlayVisible);
	};

	const toggleDetailsOverlay = (objectiveId: number) => {
		setDetailsTargetId(objectiveId);

		setDetailsOverlayVisible(!detailsOverlayVisible);
	};

	interface PointsInterFaceProps {
		objective: SecondaryObjective;
		subRuleIndex: number;
	}

	const DetailsOverlay = () => {
		const currentDetailsObjective = activeObjectives.find((m) => m.id === detailsTargetId);

		return (
			<Overlay
				overlayStyle={{ height: "auto", justifyContent: "center", padding: 30 }}
				onBackdropPress={() => toggleDetailsOverlay(0)}
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
								<View style={{ marginLeft: 10 }}>
									<PointsInterface objective={currentDetailsObjective} subRuleIndex={index} />
								</View>
							</View>
						))}
					</View>
				</View>
			</Overlay>
		);
	};

	// Buttons to increase points based on submissions
	const PointsInterface = ({ objective, subRuleIndex }: PointsInterFaceProps) => {
		const decreaseCumulativePoints = () => {
			if (
				typeof objective.subRules[subRuleIndex]?.cumulativeCount === "number" &&
				objective.subRules[subRuleIndex]?.cumulativeCount !== 0
			) {
				objective.subRules[subRuleIndex].cumulativeCount = (objective.subRules[subRuleIndex].cumulativeCount ?? 0) - 1;
				dispatch({
					type: "SUBTRACT_POINTS",
					payload: objective.subRules[subRuleIndex].pointsPerCompletion,
					target: isYourPoints ? "YOUR_POINTS" : "OPPONENT_POINTS",
				});
			}
		};

		const increaseCumulativePoints = () => {
			if (typeof objective.subRules[subRuleIndex]?.cumulativeCount === "number") {
				objective.subRules[subRuleIndex].cumulativeCount = (objective.subRules[subRuleIndex].cumulativeCount ?? 0) + 1;
				dispatch({
					type: "ADD_POINTS",
					payload: objective.subRules[subRuleIndex].pointsPerCompletion,
					target: isYourPoints ? "YOUR_POINTS" : "OPPONENT_POINTS",
				});
			}
		};

		const toggleGainedPoints = () => {
			setActiveObjectives(
				activeObjectives.map((o) => {
					if (o.id === objective.id) {
						const copy = JSON.parse(JSON.stringify(o)) as SecondaryObjective;
						copy.subRules[subRuleIndex].isChecked = !copy.subRules[subRuleIndex].isChecked;
						return copy;
					}

					return o;
				})
			);

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
	};

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

		if (!isActive && activeObjectives.length < 3) {
			setActiveObjectives([...activeObjectives, objective]);
		} else {
			setActiveObjectives(activeObjectives.filter((m) => m.id !== objective.id));
		}
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
					toggleActiveMission(random);
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
					<TouchableOpacity key={index} style={localStyles.objectiveEntry} onPress={() => toggleDetailsOverlay(objective.id)}>
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
			<DetailsOverlay />
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
