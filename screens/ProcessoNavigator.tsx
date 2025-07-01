// screens/ProcessoNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Processos from './Processos';
import ProcessoManter from './ProcessoManter';
import { Processo } from '../model/Processo';

// O "Mapa" da nossa navegação de Processos
export type ProcessoStackParamList = {
  ProcessoListar: undefined; // A tela de lista não recebe parâmetros
  ProcessoManter: { processo?: Processo }; // A tela de manutenção pode receber um processo opcional
};

const Stack = createStackNavigator<ProcessoStackParamList>();

export default function ProcessoNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false // Usamos o cabeçalho do menu principal
      }}
    >
      <Stack.Screen name="ProcessoListar" component={Processos} />
      <Stack.Screen name="ProcessoManter" component={ProcessoManter} />
    </Stack.Navigator>
  );
}