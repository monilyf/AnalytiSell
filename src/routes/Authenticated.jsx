import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import { ROUTE } from './routes';
import Details from '../screens/Details';
import Header from '../components/ui/Header';

const Authenticated = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName={ROUTE.DASHBOARD} screenOptions={{headerShown:false}}>
        <Stack.Screen name={ROUTE.DASHBOARD} component={Dashboard} />
        <Stack.Screen name={ROUTE.DETAILS} component={Details} />
      </Stack.Navigator>
    </>
  );
};

export default Authenticated;
