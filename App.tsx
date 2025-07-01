// App.tsx

import { React, useEffect, NavigationContainer, createDrawerNavigator, AntDesign, Feather, MaterialIcons } from './imports';
import * as Database from './database/Database'; // Importe o Database

// Suas telas
import Inicial from './screens/Inicial';
import ProcessoNavigator from './screens/ProcessoNavigator';
import ClientesNavigator from './screens/ClienteNavigator';

const Drawer = createDrawerNavigator();

// As telas de Financeiro e Agenda que você já tinha
function Financeiro() {
  return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Tela Financeiro</Text></View>;
}

function Agenda() {
  return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Tela Agenda</Text></View>;
}


export default function App() {

  // Este hook será executado uma vez quando o app iniciar
  useEffect(() => {
    Database.initDb(); // Chama nossa função para criar o banco e a tabela
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#44161F",
            width: "60%",
          },
          drawerActiveTintColor: "#fff",
          drawerActiveBackgroundColor: "#360C14",
          drawerLabelStyle: {
            fontSize: 20,
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#44161F" },
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Inicial}
          options={{
            drawerLabel: "Home",
            drawerIcon: () => <AntDesign name="home" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Processos"
          component={ProcessoNavigator} // <<< Altere esta linha
          options={{
            drawerLabel: "Processos",
            drawerIcon: () => <AntDesign name="folderopen" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Clientes"
          component={ClientesNavigator}
          options={{
            drawerLabel: "Clientes",
            drawerIcon: () => <Feather name="users" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Financeiro"
          component={Financeiro}
          options={{
            drawerLabel: "Financeiro",
            drawerIcon: () => <MaterialIcons name="attach-money" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Agenda"
          component={Agenda}
          options={{
            drawerLabel: "Agenda",
            drawerIcon: () => <AntDesign name="calendar" color="#fff" size={34} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}