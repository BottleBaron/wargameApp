import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DicePage from "./Pages/DicePage";
import PointsCounterPage from "./Pages/PointsCounterPage";
import { PointsProvider } from "./Utilities/PointsContext";

export default function App() {
	const Tab = createBottomTabNavigator();

	return (
		<PointsProvider>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={{
						headerStyle: {
							backgroundColor: "#d4d4d4",
						},
						headerTitleStyle: {
							fontWeight: "bold",
						},
						tabBarStyle: {
							backgroundColor: "#d4d4d4",
						},
						tabBarLabelStyle: {
							fontWeight: "bold",
							fontSize: 14,
						},
					}}>
					<Tab.Screen
						name="Game Tracker"
						component={PointsCounterPage}
						options={{
							tabBarIcon: (props) => <MaterialCommunityIcons name="sword-cross" size={24} color="black" />,
						}}
					/>
					<Tab.Screen
						name="Dice"
						component={DicePage}
						options={{
							tabBarIcon: (props) => <MaterialCommunityIcons name="dice-6" size={24} color="black" />,
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</PointsProvider>
	);
}
