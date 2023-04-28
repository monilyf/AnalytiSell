import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ROUTE } from './routes';
import Login from '../screens/Login';

const Unauthenticated = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={ROUTE.LOGIN} screenOptions={{headerShown:false}}>
      <Stack.Screen name={ROUTE.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default Unauthenticated;
