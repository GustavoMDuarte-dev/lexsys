// screens/ClienteNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Clientes from './Clientes';
import ClienteManter from './ClienteManter';

const Stack = createStackNavigator();

export default function ClienteNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false // O cabeçalho já é mostrado pelo menu principal (Drawer)
      }}
    >
      <Stack.Screen name="ClienteListar" component={Clientes} />
      <Stack.Screen name="ClienteManter" component={ClienteManter} />
    </Stack.Navigator>
  );
}