import { React, NavigationContainer, createDrawerNavigator, AntDesign, Feather, MaterialIcons, View, Text } from './imports';

// A importação do Database foi removida

import Inicial from './screens/Inicial';
import ProcessoNavigator from './screens/ProcessoNavigator';
import ClienteNavigator from './screens/ClienteNavigator';
import Clientes from './screens/Clientes';

const Drawer = createDrawerNavigator();

function Financeiro() {
  return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Tela Financeiro</Text></View>;
}

function Agenda() {
  return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Tela Agenda</Text></View>;
}

export default function App() {
  // O useEffect para iniciar o DB foi removido

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
          component={ProcessoNavigator}
          options={{
            drawerLabel: "Processos",
            drawerIcon: () => <AntDesign name="folderopen" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Clientes"
          component={ClienteNavigator}
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