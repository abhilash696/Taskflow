import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    isloading: false,
    error: null,
  },
  reducers: {
    deleteTask: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isloading = false;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.error = action.payload;
        state.isloading = false;
      });
  },
});

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token");
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/tasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.tasks;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Error while fetching tasks."
      );
    }
  }
);

export const { deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
