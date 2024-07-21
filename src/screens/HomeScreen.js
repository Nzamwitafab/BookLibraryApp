import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, TextInput, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchBooks } from '../store/slices/bookSlice';
import BookItem from '../components/BookItem';
import { FAB } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import Ioicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const [sortCriterion, setSortCriterion] = useState('title');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, DarkTheme } = useContext(ThemeContext);
  const isDarkMode = theme === DarkTheme;

  useEffect(() => {
    dispatch(fetchBooks());
    loadPreferences();
  }, [dispatch]);

  const loadPreferences = async () => {
    try {
      const storedFilterType = await AsyncStorage.getItem('filterType');
      const storedSortCriterion = await AsyncStorage.getItem('sortCriterion');
      if (storedFilterType !== null) {
        setFilterType(storedFilterType);
      }
      if (storedSortCriterion !== null) {
        setSortCriterion(storedSortCriterion);
      }
    } catch (error) {
      console.error('Failed to load preferences from AsyncStorage', error);
    }
  };

  const saveFilterType = async (type) => {
    try {
      await AsyncStorage.setItem('filterType', type);
    } catch (error) {
      console.error('Failed to save filterType to AsyncStorage', error);
    }
  };

  const saveSortCriterion = async (criterion) => {
    try {
      await AsyncStorage.setItem('sortCriterion', criterion);
    } catch (error) {
      console.error('Failed to save sortCriterion to AsyncStorage', error);
    }
  };

  const handleFilterTypeChange = (itemValue) => {
    setFilterType(itemValue);
    saveFilterType(itemValue);
  };

  const handleSortCriterionChange = (itemValue) => {
    setSortCriterion(itemValue);
    saveSortCriterion(itemValue);
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((book) =>
      filterType.trim().toLowerCase() !== 'all'
        ? book.type.trim().toLowerCase() === filterType.toLowerCase()
        : book
    );

  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortCriterion === 'title') {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    } else if (sortCriterion === 'author') {
      return a.author.toLowerCase().localeCompare(b.author.toLowerCase());
    } else if (sortCriterion === 'rating') {
      return b.rating - a.rating;
    } else if (sortCriterion === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
      <View style={styles.searchSection}>
        <Ioicons style={styles.searchIcon} name="search" size={20} color="#000"/>
        <TextInput
          placeholder="Search for books..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.searchInput, { backgroundColor: isDarkMode ? '#1c1c1c' : '#f0f0f0', color: isDarkMode ? 'white' : '#121212' }]}
          placeholderTextColor={isDarkMode ? 'white' : '#121212'}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Text style={[styles.pickerLabel,{ color: isDarkMode ? 'white' : '#121212' } ]}>Sort by:</Text>
        <Picker
          selectedValue={sortCriterion}
          onValueChange={handleSortCriterionChange}
          style={[styles.picker, { color: isDarkMode ? 'white' : '#121212' }]}
        >
          <Picker.Item label="Title" value="title" />
          <Picker.Item label="Author" value="author" />
          <Picker.Item label="Rating" value="rating" />
          <Picker.Item label="Date" value="date" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={[styles.pickerLabel, { color: isDarkMode ? 'white' : '#121212' }]}>Filter by:</Text>
        <Picker
          selectedValue={filterType}
          onValueChange={handleFilterTypeChange}
          style={[styles.picker, { color: isDarkMode ? 'white' : '#121212' }]}
        >
          <Picker.Item label="All Types" value="all" />
          <Picker.Item label="Fiction" value="Fiction" />
          <Picker.Item label="Non-Fiction" value="Non-Fiction" />
          <Picker.Item label="Sci-Fi" value="Sci-Fi" />
          <Picker.Item label="Biography" value="Biography" />
        </Picker>
      </View>
      <FlatList
        data={sortedBooks}
        renderItem={({ item }) => (
          <BookItem book={item} onPress={() => navigation.navigate('BookDetail', { bookId: item.id })} />
        )}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={[styles.fab, { backgroundColor: 'blue' }]}
        icon="plus"
        onPress={() => navigation.navigate('AddBook')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerLabel: {
    marginRight: 10,
    fontSize: 16,
    color: '#000',
  },
  picker: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default HomeScreen;
