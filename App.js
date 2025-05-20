import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';


const Drawer = createDrawerNavigator();

function Inicial({navigation}){
  return(
    <View style={styles.container}>
      <Image 
      source={require('./assets/coruja.png')}
      style = {styles.logo}
      />
    </View>
  )

}


function Processos({navigation}){
  return(
    <View style={styles.container}>
      <Image source={require('./assets/coruja.png')} style = {styles.logo}></Image>
    </View>
  )

}

function Clientes({navigation}){
  return(
    <View style = {styles.container}>
      <Image source={require('./assets/coruja.png')} style = {styles.logo}></Image>
    </View>
  )
}

export default function App(){
  return(
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
        //drawerInactiveBackgroundColor: "#fff",
        drawerLabelStyle: {
          fontSize: 20,
          color: "#fff"
        }
      }}>
        <Drawer.Screen name="Home"
         component={Inicial}
         options={{
          drawerLabel: "Home",
          headerTintColor: "#fff", // cor do texto do cabecalho
          headerStyle: {backgroundColor: "#44161F"}, // cor do fundo do cabecalho
          headerShown: true,
          drawerIcon: () => <AntDesign name = "home" color = "#fff" size = {34}/>

          
         }}/>
        <Drawer.Screen name="Pocessos" 
        component={Processos}
        options={{
          drawerLabel: "Processos",
          headerTintColor: "#fff",
          headerStyle: {backgroundColor: "#44161F"},
          headerShown: true,
          drawerIcon: () => <AntDesign name = "folderopen" color = "#fff" size = {34}/>
        }}/>

        <Drawer.Screen name = "Clientes"
        component={Clientes}
        options={{
          drawerLabel: "Clientes",
          headerTintColor: "#fff",
          headerStyle: {backgroundColor: "#44161F"},
          headerShown: true,
          drawerIcon: () => <Feather name = "users" color = "#fff" size = {34} />
        }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
  width: '90%',
  aspectRatio: 1.5, // ou 1.5 se sua imagem for mais larga
  opacity: 0.1,
  resizeMode: 'contain',
  alignSelf: 'center',
  height: '90%',
},
});
