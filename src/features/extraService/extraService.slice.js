import { toast } from "react-toastify";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import extraServiceService from "./extraService.service";

export const addExtraService = createAsyncThunk(
  "extraService/addExtraService",
  async (extraService, thunkAPI) => {
    try {
      return await extraServiceService.addExtraService(extraService);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getExtraServices = createAsyncThunk(
  "extraService/getExtraServices",
  async (thunkAPI) => {
    try {
      return await extraServiceService.getExtraServices();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getExtraService = createAsyncThunk(
  "extraService/getExtraService",
  async (id, thunkAPI) => {
    try {
      return await extraServiceService.getExtraService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteExtraService = createAsyncThunk(
  "extraService/deleteExtraService",
  async (id, thunkAPI) => {
    try {
      return await extraServiceService.deleteExtraService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateExtraService = createAsyncThunk(
  "extraService/updateExtraService",
  async ({ id, extraService }, thunkAPI) => {
    try {
      return await extraServiceService.updateExtraService(id, extraService);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  extraServices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const resetState = createAction("Reset_all");

const extraServiceSlice = createSlice({
  name: "extraService",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addExtraService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addExtraService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.addedExtraService = action.payload.data;
        toast.success(state.message);
      })
      .addCase(addExtraService.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(getExtraServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExtraServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.extraServices = action.payload.data;
      })
      .addCase(getExtraServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(getExtraService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExtraService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.singleExtraService = action.payload.data;
      })
      .addCase(getExtraService.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        toast.error(state.message);
      })

      .addCase(deleteExtraService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExtraService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.deletedExtraService = action.payload.data;
        toast.success(state.message);
      })
      .addCase(deleteExtraService.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(updateExtraService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExtraService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.updatedExtraService = action.payload.data;
        toast.success(state.message);
      })
      .addCase(updateExtraService.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })
      .addCase(resetState, () => initialState);
  },
});

export default extraServiceSlice.reducer;
