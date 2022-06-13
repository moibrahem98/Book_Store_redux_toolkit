import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
export const getBooks = createAsyncThunk('book/getBooks', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch('http://localhost:3005/books')
        const data = await res.json()
        return data
    } catch (error) {
        rejectWithValue(error.message)
    }
})
export const insertBook = createAsyncThunk('book/insertBook', async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
        bookData.userName = getState().auth.userName
        const res = await fetch('http://localhost:3005/books', {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        const data = await res.json()
        return data
    }
    catch (error) {
        rejectWithValue(error.message)
    }
})
export const deleteBook = createAsyncThunk('book/deleteBoo', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        await fetch(`http://localhost:3005/books${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        return id
    }
    catch (error) {
        rejectWithValue(error.message)
    }
})
export const bookSlice = createSlice({
    name: 'book',
    initialState: { books: [], isLoading: false, error: null },
    extraReducers: {
        [getBooks.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books = action.payload
        },
        [getBooks.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },


        [insertBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null
        },
        [insertBook.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books.push(action.payload)
        },
        [insertBook.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },



        [deleteBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books = state.books.filter(item => item.id !== action.payload)
        },
        [deleteBook.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export default bookSlice.reducer