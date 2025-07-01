// screens/ClienteNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Clientes from './Clientes';
import ClienteManter from './ClienteManter';
import { Cliente } from '../model/Cliente'; // Importamos nosso modelo

// Este é o nosso "Mapa" da Navegação
export type ClienteStackParamList = {
  ClienteListar: undefined; // A tela de lista não recebe parâmetros
  ClienteManter: { cliente?: Cliente }; // A tela de manter pode receber um cliente opcional
};

// Informamos ao StackNavigator sobre o nosso mapa
const Stack = createStackNavigator<ClienteStackParamList>();

export default function ClienteNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="ClienteListar" component={Clientes} />
      <Stack.Screen name="ClienteManter" component={ClienteManter} />
    </Stack.Navigator>
  );
}