import { toast } from "react-toastify";
import hallService from "./hall.service";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const addHall = createAsyncThunk(
  "hall/addHall",
  async (hall, thunkAPI) => {
    try {
      return await hallService.addHall(hall);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getHalls = createAsyncThunk("hall/getHalls", async (thunkAPI) => {
  try {
    return await hallService.getHalls();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getHallById = createAsyncThunk(
  "hall/getHallById",
  async (id, thunkAPI) => {
    try {
      return await hallService.getHallById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteHall = createAsyncThunk(
  "hall/deleteHall",
  async (id, thunkAPI) => {
    try {
      return await hallService.deleteHall(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateHall = createAsyncThunk(
  "hall/updateHall",
  async ({ id, hall }, thunkAPI) => {
    try {
      return await hallService.updateHall(id, hall);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeImage = createAsyncThunk(
  "hall/removeImage",
  async ({ id, imageId }, thunkAPI) => {
    try {
      return await hallService.removeImage(id, imageId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  halls: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const resetState = createAction("Reset_all");

export const hallSlice = createSlice({
  name: "hall",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addHall.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addHall.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addedHall = action.payload.data;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(addHall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(getHalls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHalls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.halls = action.payload.data;
      })
      .addCase(getHalls.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(deleteHall.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHall.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.deletedHall = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(deleteHall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(getHallById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHallById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleHall = action.payload.data;
      })
      .addCase(getHallById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(updateHall.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHall.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.updatedHall = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(updateHall.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(removeImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.singleHall = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(removeImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })
      .addCase(resetState, () => initialState);
  },
});

export default hallSlice.reducer;
