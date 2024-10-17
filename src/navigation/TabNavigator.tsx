import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import IncomeScreen from '../screens/IncomeScreen';

type TabParamList = {
  Home: undefined;
  Expenses: undefined;
  Income: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="Expenses" component={ExpensesScreen} options={{ tabBarLabel: 'Expenses' }} />
        <Tab.Screen name="Income" component={IncomeScreen} options={{ tabBarLabel: 'Income' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
