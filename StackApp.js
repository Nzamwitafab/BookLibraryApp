import React, { useEffect, useContext } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddBookScreen from './src/screens/AddBookScreen';
import EditBookScreen from './src/screens/EditBookScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { createTables } from './src/services/database';
import { PaperProv, ThemeContext } from './src/context/ThemeContext';
import Ioicons from 'react-native-vector-icons/Ionicons';
import {DefaultTheme, DarkTheme as DarkThemeNative} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme } from 'react-native-paper';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
      <Stack.Screen name="AddBook" component={AddBookScreen} options={{ headerTitle: 'Add Book' }} />
      <Stack.Screen name="EditBook" component={EditBookScreen} options={{ headerTitle: 'Edit Book' }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ headerTitle: 'Book Detail' }} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function StackApp() {

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === DarkTheme;
  console.log(isDarkMode);

  return (
        <NavigationContainer theme={isDarkMode ? DarkThemeNative : DefaultTheme}>
          <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            sceneAnimationEnabled={false}
            screenOptions={({ route }) => ({
              // tabBarStyle: { backgroundColor: 'red' },
              tabBarIcon: ({ color }) => {
                let iconName;

                if (route.name === 'home') {
                  iconName = 'home';
                } else if (route.name === 'Settings') {
                  iconName = 'settings';
                }

                return <Ioicons name={iconName} color={color} size={26} />;
              },
            })}
          >
        <Tab.Screen
          name="home"
          component={HomeStack}
          options={{ headerShown: false }} // Hide the header for the tab screen
        />
            <Tab.Screen name="Settings" component={SettingsStack} />
          </Tab.Navigator>
        </NavigationContainer>
  );
}
