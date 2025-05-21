import styles from './styles/styles';
import {
  React,
  Text,
  View,
  Image,
  NavigationContainer,
  createDrawerNavigator,
  AntDesign,
  Feather,
  MaterialIcons,
  useFonts,
  PlayfairDisplay_700Bold,
  AppLoading,
} from './imports';


const Drawer = createDrawerNavigator();

function Inicial({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/coruja.png')}
        style={styles.backgroundImage}
      />
    <View style = {styles.titleContent}>
      <Text style = {styles.title}>Bem-vindo ao <Text style={styles.appName}>LexSys</Text>, Dr. Gustavo</Text>  
    </View>
    </View>
  );
}

function Processos({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/coruja.png')} style={styles.backgroundImage} />
    </View>
  );
}

function Clientes({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/coruja.png')} style={styles.backgroundImage} />
    </View>
  );
}

function Financeiro({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/coruja.png')} style={styles.backgroundImage} />
    </View>
  );
}

function Agenda({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/coruja.png')} style={styles.backgroundImage} />
    </View>
  );
}

export default function App() {
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
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Inicial}
          options={{
            drawerLabel: "Home",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <AntDesign name="home" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Processos"
          component={Processos}
          options={{
            drawerLabel: "Processos",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <AntDesign name="folderopen" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Clientes"
          component={Clientes}
          options={{
            drawerLabel: "Clientes",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <Feather name="users" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Financeiro"
          component={Financeiro}
          options={{
            drawerLabel: "Financeiro",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <MaterialIcons name="attach-money" color="#fff" size={34} />,
          }}
        />
        <Drawer.Screen
          name="Agenda"
          component={Agenda}
          options={{
            drawerLabel: "Agenda",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#44161F" },
            headerShown: true,
            drawerIcon: () => <AntDesign name="calendar" color="#fff" size={34} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


