import { configureStore } from "@reduxjs/toolkit";
import hallReducer from "../features/hall/hall.slice";
import menuReducer from "../features/menu/menu.slice";
import extraServiceReducer from "../features/extraService/extraService.slice";
import bookingReducer from "../features/booking/booking.slice";

export const store = configureStore({
  reducer: {
    hall: hallReducer,
    menu: menuReducer,
    extraService: extraServiceReducer,
    booking: bookingReducer,
  },
});
