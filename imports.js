// imports.js

// React e React Native
import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import {
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Ícones
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Exporta tudo para usar no App.js
export {
  React,
  useState,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigationContainer,
  createDrawerNavigator,
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
  LayoutAnimation,
  Platform,
  UIManager,
  TextInput,
  ScrollView,
  FlatList,
};
