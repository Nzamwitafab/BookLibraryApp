import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { DarkTheme } from 'react-native-paper';

const BookItem = ({ book, onPress }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === DarkTheme;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.itemContainer, { backgroundColor: isDarkMode ? 'transparent' : 'transparent', shadowColor: isDarkMode ? '#888' : '#333' }]}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={[styles.title, { color: isDarkMode ? 'white' : '#121212' }]}>{book.title}</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: isDarkMode ? 'white' : '#121212' }]}>By  </Text>
          <Text style={[styles.author, { color: isDarkMode ? 'white' : '#121212' }]}>{book.author}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: isDarkMode ? 'white' : '#121212' }]}>Date:</Text>
          <Text style={[styles.value, { color: isDarkMode ? 'white' : '#121212' }]}>{book.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: isDarkMode ? 'white' : '#121212' }]}>Type:</Text>
          <Text style={[styles.value, { color: isDarkMode ? 'white' : '#121212' }]}>{book.type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: isDarkMode ? 'white' : '#121212' }]}>Rating:</Text>
          <Text style={[styles.value, { color: isDarkMode ? 'white' : '#121212' }]}>{book.rating}</Text>
        </View>
        <Text style={[styles.status, { color: book.read ? '#4CAF50' : '#F44336' }]}>
          {book.read ? 'Read' : 'Unread'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    fontSize: 14,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default BookItem;
