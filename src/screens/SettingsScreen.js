import React, { useContext } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { DarkTheme,Text, useTheme} from 'react-native-paper';

const SettingsScreen = () => {
  const { theme, toggleTheme, DarkTheme } = useContext(ThemeContext);
  const isDarkMode = theme === DarkTheme;
  const paperTheme = useTheme();
  const isDarkMode1 = theme === paperTheme.dark;

  return (
    <View style={[styles.continer,{ backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
      <Text style={{color: !isDarkMode ? '#121212' : 'white'}}>Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
    continer: {
        flex: 1
    }
})

export default SettingsScreen;
