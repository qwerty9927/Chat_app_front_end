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
  isResgister: false,
}

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    reset: (state) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isSuccess = true
      state.isFetching = false
      state.isError = false
      state.currentUser = action.payload
      localStorage.setItem('auth', JSON.stringify(state))
    })
    builder.addCase(login.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(login.rejected, (state) => {
      state.isFetching = false
      state.isError = true
    })
    builder.addCase(resgister.fulfilled, (state) => {
      state.isResgister = true
      state.isFetching = false
      state.isError = false
    })
    builder.addCase(resgister.pending, (state) => {
      state.isFetching = true
    })
    builder.addCase(resgister.rejected, (state) => {
      state.isResgister = false
      state.isFetching = false
      state.isError = true
    })
    builder.addCase(logout.fulfilled, (state) => {
      localStorage.removeItem('auth')
      return initialState
    })
  }
})

const selectState = (state) => state.auth


export { login, resgister, selectState, logout } 
export const { reset } = authSlice.actions
export default authSlice.reducer