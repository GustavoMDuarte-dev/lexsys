// imports.ts

// React e React Native
import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, FlatList, Alert, StyleSheet } from 'react-native';
import {
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Navegação
import { NavigationContainer, useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';


// Ícones
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Exporta tudo para que possamos usar noutros ficheiros
export {
  React,
  useState,
  useEffect,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigationContainer,
  createDrawerNavigator,
  createStackNavigator,
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
  Alert,
  StyleSheet,
  useFocusEffect,
  useNavigation,
  useRoute,
  RouteProp,
  StackNavigationProp
};