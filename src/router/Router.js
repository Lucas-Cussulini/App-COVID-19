import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Search from '../screens/Search'
import Results from '../screens/Results'

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
            title: 'App - Covid-19',
            headerStyle: {
              backgroundColor: '#ceadff',
            },
            headerShown: false,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}
        />
          <Stack.Screen 
            name="Search" 
            component={Search} 
            options={{
            title: 'Voltar',
            headerStyle: {
              backgroundColor: '#ceadff',
            },
            headerShown: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}
        />
          <Stack.Screen 
            name="Results" 
            component={Results} 
            options={{
            title: 'Voltar',
            headerStyle: {
              backgroundColor: '#cba8ff',
            },
            headerShown: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};


export default Router;