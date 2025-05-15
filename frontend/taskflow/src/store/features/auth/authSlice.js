import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
require("dotenv").config();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    isloading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isloading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isloading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isloading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isloading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      });
  },
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        credentials
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", response.data.expiresAt);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Error while logging in"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        credentials
      );
      return response.data.token;
    } catch (err) {
      console.log(err);
      return rejectWithValue(
        err.response?.data?.error || "User registration failed"
      );
    }
  }
);

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
