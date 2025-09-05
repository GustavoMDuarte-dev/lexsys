// imports.ts

// --- React e Hooks ---
import React, { useState } from 'react';

// --- Componentes e APIs do React Native ---
import { 
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  LayoutAnimation,
  UIManager,
} from 'react-native';

// --- Navegação ---
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Mais moderno que o createStackNavigator

// --- Firebase (importando do seu arquivo de configuração) ---
// Certifique-se de que o caminho para o seu arquivo firebase.ts está correto
import { auth, firestore, storage } from '../firebase'; 

// --- Ícones ---
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// --- Re-exporta tudo para ser usado no aplicativo ---
export {
  // React
  React,
  useState,

  // React Native
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  LayoutAnimation,
  UIManager,

  // Navegação
  NavigationContainer,
  useNavigation,
  createDrawerNavigator,
  createNativeStackNavigator,

  // Firebase
  auth,
  firestore,
  storage,

  // Ícones
  AntDesign,
  Feather,
  MaterialIcons,
  FontAwesome,
};