/**
 * @format
 * @flow
 */

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

const Stack = createStackNavigator();

const httpLink = createHttpLink({
  uri: 'http://192.168.73.252:5000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

import Screen1 from './App/Containers/Screens/Screen1.js';
import Screen2 from './App/Containers/Screens/Screen2.js';
import Screen3 from './App/Containers/Screens/Screen3.js';
import Screen4 from './App/Containers/Screens/Screen4.js';

const App = (): function => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Screen1"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
          <Stack.Screen name="Screen3" component={Screen3} />
          <Stack.Screen name="Screen4" component={Screen4} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
