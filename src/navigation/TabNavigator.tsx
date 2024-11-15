import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ExpensesScreen from '../screens/Expense/ExpensesScreen';
import InvestScreen from '../screens/Investment/InvestScreen';

type TabParamList = {
  Home: undefined;
  Expenses: undefined;
  Invest: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={require('../assets/icons/home.png')} 
                style={{ width: size, height: size, tintColor: color }} 
              />
            )
          }} 
        />
        <Tab.Screen 
          name="Expenses" 
          component={ExpensesScreen} 
          options={{ 
            tabBarLabel: 'Expenses',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={require('../assets/icons/price.png')} 
                style={{ width: size, height: size, tintColor: color }} 
              />
            )
          }} 
        />
        <Tab.Screen 
          name="Invest" 
          component={InvestScreen} 
          options={{ 
            tabBarLabel: 'Invest',
            tabBarIcon: ({ color, size }) => (
              <Image 
                source={require('../assets/icons/savings.png')}
                style={{ width: size, height: size, tintColor: color }} 
              />
            )
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
