import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ShoppingList from './screens/ShoppingList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShoppingList">
        <Stack.Screen
          name="ShoppingList"
          component={ShoppingList}
          options={{
            title: 'My shopping list',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
