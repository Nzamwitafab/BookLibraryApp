// src/utils/preferences.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePreference = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving preference', error);
  }
};

export const getPreference = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error getting preference', error);
  }
};
