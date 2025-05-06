import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getNotes = createAsyncThunk(
  "notes/get",
  async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addNote = createAsyncThunk("notes/add", async ({ticketId, text}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.addNotes({ticketId, text}, token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
})


const noteSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
        reset : (state) => initialState
    },
    extraReducers:(builder) => {
        builder.addCase(getNotes.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes = action.payload
        })
        .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(addNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addNote.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes.push(action.payload)
        })
        .addCase(addNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = noteSlice.actions
 export default noteSlice.reducer