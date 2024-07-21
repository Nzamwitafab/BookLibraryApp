import React, {useContext} from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { deleteBook } from '../store/slices/bookSlice';

const BookDetailScreen = ({ route, navigation }) => {
  const { bookId } = route.params;
  const book = useSelector((state) =>
    state.books.books.find((b) => b.id === bookId)
  );

  const dispatch = useDispatch();
  const { theme, toggleTheme, DarkTheme } = useContext(ThemeContext);
  const isDarkMode = theme === DarkTheme;

  const handleDelete = () => {
    dispatch(deleteBook(bookId));
    navigation.goBack();
  };

  if (!book) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
        <Text style={{ color: !isDarkMode ? '#121212' : 'white' }}>Book not found!</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <Text style={[styles.title, { color: !isDarkMode ? '#121212' : 'white' }]}>Title: {book.title}</Text>
      <Text style={[styles.author, { color: !isDarkMode ? '#121212' : 'white' }]}>Author: {book.author}</Text>
      <Text style={{ color: !isDarkMode ? '#121212' : 'white' }}>Rating: {book.rating}</Text>
      <Text style={{ color: !isDarkMode ? '#121212' : 'white' }}>Date: {book.date}</Text>
      <Text style={{ color: !isDarkMode ? '#121212' : 'white' }}>Type: {book.type}</Text>
      <Text style={{ color: !isDarkMode ? '#121212' : 'white' }}>Status: {book.read ? "Read" : "Unread"}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('EditBook', { bookId })} />
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: 120,
    height: 180,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 18,
    color: '#666',
  },
});

export default BookDetailScreen;
