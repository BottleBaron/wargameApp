import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DicePage from './Pages/DicePage';
import PointsCounterPage from './Pages/PointsCounterPage';


export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#ade879',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#ade879'
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 14,
        }
      }}>
        <Tab.Screen name="Counter" component={PointsCounterPage} />
        <Tab.Screen name="Dice" component={DicePage} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}


