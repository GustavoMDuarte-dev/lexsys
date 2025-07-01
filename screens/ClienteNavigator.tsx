import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Clientes from './Clientes';
import ClienteManter from './ClienteManter';
import { Cliente } from '../model/Cliente';

export type ClienteStackParamList = {
  ClienteListar: undefined;
  ClienteManter: { cliente?: Cliente };
};

const Stack = createStackNavigator<ClienteStackParamList>();

export default function ClienteNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClienteListar" component={Clientes} />
      <Stack.Screen name="ClienteManter" component={ClienteManter} />
    </Stack.Navigator>
  );
}