import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Processos from './Processos';
import ProcessoManter from './ProcessoManter';
import { Processo } from '../model/Processo';

export type ProcessoStackParamList = {
  ProcessoListar: undefined; 
  ProcessoManter: { processo?: Processo };
};

const Stack = createStackNavigator<ProcessoStackParamList>();

export default function ProcessoNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProcessoListar" component={Processos} />
      <Stack.Screen name="ProcessoManter" component={ProcessoManter} />
    </Stack.Navigator>
  );
}