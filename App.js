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
  TouchableOpacity,
  useState,
  LayoutAnimation,
  Platform,
  UIManager,
} from './imports';


const Drawer = createDrawerNavigator();

function Inicial({ navigation }) {
    const [expandido, setExpandido] = useState(false);
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/coruja.png')}
        style={styles.backgroundImage}
      />
    <View style = {styles.titleContent}>
      <Text style = {styles.title}>Bem-vindo ao <Text style={styles.appName}>LexSys</Text>, Dr. Gustavo</Text>  
    </View>
    <TouchableOpacity onPress={() => setExpandido(!expandido)}>
    <View style = {styles.card}>
      <View style = {styles.cardHeader}>
      <AntDesign name="folderopen" size={20} color="#333" style={{ marginRight: 8 }} />
      <Text style = {styles.cardTitle} >Resumo dos Processos</Text>
      </View>
      <View style = {styles.cardStatusRow}>
      <View style = {styles.statusDotGreen}/>
      <Text style = {styles.cardContent}>15 Processos Ativos </Text>
       <AntDesign
        name={expandido ? 'up' : 'down'}
        size={18}
        color="#333"
        style={{ marginLeft: 'auto' }}
      />
      </View>
       {expandido && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.cardContent}>• 10 Cíveis</Text>
              <Text style={styles.cardContent}>• 3 Trabalhistas</Text>
              <Text style={styles.cardContent}>• 2 Familiares</Text>
            </View>
          )}
    </View>
    </TouchableOpacity>

     <View style={styles.card}>
        <View style={styles.cardHeader}>
          <AntDesign name="calendar" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Audiência do Dia</Text>
        </View>
        <Text style={styles.cardContent}>Próxima audiência: 10/06 às 14h</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="alert-triangle" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Pendências Importantes</Text>
        </View>
        <Text style={styles.cardContent}>3 pendências críticas</Text>
      </View>

       <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="notifications" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Lembrete</Text>
        </View>
        <Text style={styles.cardContent}>Pagar taxa até 05/06</Text>
      </View>
      <TouchableOpacity style={styles.fabButton} onPress={() => alert('Ação rápida!')}>
        <AntDesign name = "plus" size={30} color = "#fff"/>
      </TouchableOpacity>
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


