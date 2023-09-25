import { Overlay } from "@rneui/themed";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
	SecondaryObjective,
	secondaryObjectives,
} from "../../assets/ObjectivesData";

export default function ObjectivesInterface() {
	const [selectOverlayVisible, setSelectOverlayVisible] = useState(false);
	const [activeMissions, setActiveMissions] = useState<SecondaryObjective[]>(
		[]
	);

	const toggleMissionSelectMenu = () => {
		setSelectOverlayVisible(!selectOverlayVisible);
	};

	const toggleActiveMission = (objective: SecondaryObjective) => {
		const isActive = activeMissions.some((m) => m.id === objective.id);
		console.log(isActive);
		if (!isActive) {
			setActiveMissions([...activeMissions, objective]);
		} else {
			setActiveMissions(
				activeMissions.filter((m) => m.id !== objective.id)
			);
		}
	};

	return (
		<View style={localStyles.container}>
			<View style={localStyles.buttonContainer}>
				<View style={{ margin: 10 }}>
					<Button
						title='Select mission'
						onPress={toggleMissionSelectMenu}
					/>
				</View>
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
							<Button
								title='X'
								onPress={toggleMissionSelectMenu}
							/>
						</View>
					</View>
					{secondaryObjectives.map((objective, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => toggleActiveMission(objective)}
							style={{ flexDirection: "row", padding: 10 }}>
							<Checkbox
								color='#2296f3'
								value={activeMissions.some(
									(m) => m.id === objective.id
								)}
								onValueChange={() =>
									toggleActiveMission(objective)
								}
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
					))}
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
});
