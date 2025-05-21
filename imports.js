// imports.js

// React e React Native
import React from 'react';
import { Text, View, Image } from 'react-native';

// Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Ícones
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Fontes e Loading
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import AppLoading from 'expo-app-loading';

// Exporta tudo para usar no App.js
export {
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
};
