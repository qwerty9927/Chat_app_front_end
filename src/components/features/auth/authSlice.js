import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as request from "../../../api/axiosAuth"

const login = createAsyncThunk(
  "/login",
  async (data, thunkAPI) => {
    const response = await request.post("auth/login", {
      Username: data.username,
      Password: data.password
    }, {
      withCredentials: true
    })
    if(response.status < 200 || response.status > 300){
      return thunkAPI.rejectWithValue(data)
    }
    return response.data
  }
)

const resgister = createAsyncThunk(
  '/resgister',
  async (data, thunkAPI) => {
    const response = await request.post('auth/resgister', {
      Username: data.username,
      Password: data.password, 
      Name: data.name
    })
    if(response.status < 200 || response.status > 300){
      return thunkAPI.rejectWithValue(data)
    }
    return response.data
  }
)

const logout = createAsyncThunk(
  '/logout',
  async (data, thunkAPI) => {
    const response = await request.get('auth/logout', {
      withCredentials: true
    })
    if(response.status < 200 || response.status > 300){
      return thunkAPI.rejectWithValue(data)
    }
    return response.data
  }
)

const initialState = JSON.parse(localStorage.getItem('auth')) || {
  isFetching: false,
  isSuccess: false,
  isError: false,
  currentUser: null,
  counter: 0
}

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1
    },
    reset: (state) => {
      state = initialState
      return state
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('auth', JSON.stringify(state))
      state.isSuccess = true
      state.isFetching = false
      state.currentUser = action.payload
    })
    builder.addCase(login.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(login.rejected, (state) => {
      state.isFetching = false
      state.isError = true
    })
    builder.addCase(resgister.fulfilled, (state) => {
      // state.isSuccess = true
      state.isFetching = false
    })
    builder.addCase(resgister.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(resgister.rejected, (state) => {
      state.isFetching = false
      state.isError = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      localStorage.removeItem('auth')
      state.isFetching = false
      state.isSuccess = false
      state.isError = false
      state.currentUser = null
    })
  }
})

const selectState = (state) => state.auth


export { login, resgister, selectState, logout } 
export const { increment, reset } = authSlice.actions
export default authSlice.reducer