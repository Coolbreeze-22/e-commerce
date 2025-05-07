import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CountdownType } from "./reducerTypes";

export const countdownInitial = {
  name: "",
  startDate: "",
  endDate: "",
  id: "",
};

export const initialState: Array<CountdownType> = [];

const countdownSlice = createSlice({
  name: "countdown",
  initialState,
  reducers: {
    getCountdown(state, action: PayloadAction<Array<CountdownType>>) {
      state = action.payload;
      console.log("redux", state);
      console.log("redux", state);
    },
    createCountdown(state, action: PayloadAction<CountdownType>) {
      state.push(action.payload);
    },
    deleteCountdown(state, action: PayloadAction<string>) {
      const existingCountdown = state.find(
        (countdown) => countdown.id === action.payload
      );
      if (existingCountdown?.id) {
        state = state.filter((countdown) => countdown.id !== action.payload);
      }
    },
  },
});

export const { getCountdown, createCountdown, deleteCountdown } =
  countdownSlice.actions;
export default countdownSlice.reducer;
