import { toast } from "react-toastify";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import menuService from "./menu.service";

export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (menu, thunkAPI) => {
    try {
      return await menuService.addMenu(menu);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMenus = createAsyncThunk("menu/getMenus", async (thunkAPI) => {
  try {
    return await menuService.getMenus();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getMenuById = createAsyncThunk(
  "menu/getMenuById",
  async (id, thunkAPI) => {
    try {
      return await menuService.getMenu(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (id, thunkAPI) => {
    try {
      return await menuService.deleteMenu(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({ id, menu }, thunkAPI) => {
    console.log(id);
    try {
      return await menuService.updateMenu(id, menu);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  menus: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const resetState = createAction("Reset_all");

const menuSlice = createSlice({
  name: "menu",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMenu.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.addedMenu = action.payload.data;
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(addMenu.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(getMenus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.menus = action.payload.data;
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
      })

      .addCase(getMenuById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMenuById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleMenu = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getMenuById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
      })

      .addCase(deleteMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedMenu = action.payload.data;
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(updateMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedMenu = action.payload.data;
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.payload.response?.data.error || "Something went wrong!";
        toast.error(state.message);
      })

      .addCase(resetState, () => initialState);
  },
});

export default menuSlice.reducer;
