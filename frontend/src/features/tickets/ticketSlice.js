import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";
const initialState = {
    tickets:[],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createTicket = createAsyncThunk('tickets/create', async (ticket, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticket, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) ||
                        error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})


export const getTickets = createAsyncThunk('tickets/get', async (_, thunkAPI) => {
    try {
       const token = thunkAPI.getState().auth.user.token
        // const user  = JSON.parse(localStorage.getItem('user'))
     return await ticketService.getTickets(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) ||
                        error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
    }
})

export const getTicket = createAsyncThunk('tickets/ticket', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTicket(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const closeTicket = createAsyncThunk('ticket/close', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

 const ticketSlice = createSlice({
    name:'ticket',
    initialState,
    reducers : {
        reset : (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTicket.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTickets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tickets = action.payload
        })
        .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.ticket = action.payload
        })
        .addCase(getTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(closeTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(closeTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tickets.map((ticket) => ticket._did === action.payload._id ? (ticket.status = 'closed'): ticket)
        })
        .addCase(closeTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
       
    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer