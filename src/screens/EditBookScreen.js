import React, { useState, useEffect,useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, updateBook } from '../store/slices/bookSlice';
import { ThemeContext } from '../context/ThemeContext';

const EditBookScreen = ({ route, navigation }) => {
  const { bookId } = route.params || {};
  const book = useSelector((state) =>
    state.books.books.find((b) => b.id === bookId)
  );

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const [read, setRead] = useState(false);
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();
  const { theme, DarkTheme } = useContext(ThemeContext);
  const isDarkMode = theme === DarkTheme;

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setRating(book.rating.toString());
      setRead(book.read);
      setImage(book.image);
      setDate(book.date);
      setType(book.type);
    } else {
      clearForm();
    }
  }, [book, bookId]);

  const handleSave = () => {
    if (book) {
      dispatch(updateBook({ id: bookId, title, author, rating: parseInt(rating), read, image, date, type }));
    } else {
      dispatch(addBook({ title, author, rating: parseInt(rating), read, image, date, type }));
    }
    clearForm();
    navigation.goBack();
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setRating('');
    setRead(false);
    setImage('');
    setDate('');
    setType('');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { backgroundColor: !isDarkMode ? '#121212' : 'white', color: isDarkMode ? '#121212' : 'white' }]}
        placeholderTextColor={{color: isDarkMode ? '#121212' : 'white'}}
      />
      <TextInput
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
        style={[styles.input, { backgroundColor: !isDarkMode ? '#121212' : 'white', color: isDarkMode ? '#121212' : 'white' }]}
        placeholderTextColor={{color: isDarkMode ? '#121212' : 'white'}}
      />
      <TextInput
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
        style={[styles.input, { backgroundColor: !isDarkMode ? '#121212' : 'white', color: isDarkMode ? '#121212' : 'white' }]}
        placeholderTextColor={{color: isDarkMode ? '#121212' : 'white'}}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={[styles.input, { backgroundColor: !isDarkMode ? '#121212' : 'white', color: isDarkMode ? '#121212' : 'white' }]}
        placeholderTextColor={{color: isDarkMode ? '#121212' : 'white'}}
      />
      <TextInput
        placeholder="Date"
        value={date}
        onChangeText={setDate}
        style={[styles.input, { backgroundColor: !isDarkMode ? '#121212' : 'white', color: isDarkMode ? '#121212' : 'white' }]}
        placeholderTextColor={{color: isDarkMode ? '#121212' : 'white'}}
      />
      <TextInput
        placeholder="Type"
        value={type}
        onChangeText={setType}
        style={[styles.input, { backgroundColor: !isDarkMode ? '#121212' : 'white', color: isDarkMode ? '#121212' : 'white' }]}
        placeholderTextColor={{color: isDarkMode ? '#121212' : 'white'}}
      />
      <Button title={read ? "Mark as Unread" : "Mark as Read"} onPress={() => setRead((prev) => !prev)} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    padding: 8,
    marginBottom: 8,
  },
});

export default EditBookScreen;
