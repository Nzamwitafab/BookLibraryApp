import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks as fetchBooksFromDb, addBook as addBookToDb, updateBook as updateBookInDb, deleteBook as deleteBookFromDb } from '../../services/database';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const books = await fetchBooksFromDb();
  return books;
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  await addBookToDb(book);
  return book;
});

export const updateBook = createAsyncThunk('books/updateBook', async (book) => {
  await updateBookInDb(book);
  return book;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  await deleteBookFromDb(id);
  return id;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book.id !== action.payload);
      });
  },
});

export default bookSlice.reducer;