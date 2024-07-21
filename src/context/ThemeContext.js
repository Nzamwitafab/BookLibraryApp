import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';

export const ThemeContext = createContext();

export const PaperProv = ({ children }) => {
  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setTheme(DarkTheme);
      } else {
        setTheme(DefaultTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === DefaultTheme ? DarkTheme : DefaultTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme === DarkTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
