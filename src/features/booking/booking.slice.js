import { toast } from "react-toastify";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bookingService from "./booking.service";

export const addBooking = createAsyncThunk(
  "booking/addBooking",
  async (booking, thunkAPI) => {
    try {
      return await bookingService.addBooking(booking);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBookings = createAsyncThunk(
  "booking/getBookings",
  async (thunkAPI) => {
    try {
      return await bookingService.getBookings();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (id, thunkAPI) => {
    try {
      return await bookingService.cancelBooking(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async ({ id, booking }, thunkAPI) => {
    try {
      return await bookingService.updateBooking(id, booking);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkAvailability = createAsyncThunk(
  "booking/checkAvailability",
  async (bookingForm, thunkAPI) => {
    try {
      return await bookingService.checkAvailability(bookingForm);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  bookings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const resetState = createAction("Reset_all");

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.addedBooking = action.payload.data.booking;
        state.payment_url = action.payload.data.payment_url;
        // toast.success(state.message);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(getBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.bookings = action.payload.data;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(cancelBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.cancelledBooking = action.payload.data;
        toast.success(state.message);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.updatedBooking = action.payload.data;
        toast.success(state.message);
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(checkAvailability.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.availableHalls = action.payload.data;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
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

export default bookingSlice.reducer;
