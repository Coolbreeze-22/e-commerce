import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CountdownType } from "./reducerTypes";

interface InitialStateProps {
  countdowns: Array<CountdownType>;
}
export const initialState: InitialStateProps = {
  countdowns: [],
};

const countdownSlice = createSlice({
  name: "countdown",
  initialState,
  reducers: {
    getCountdown(state, action: PayloadAction<Array<CountdownType>>) {
      state.countdowns = action.payload;
    },
    createCountdown(state, action: PayloadAction<CountdownType>) {
      state.countdowns.push(action.payload);
    },
    deleteCountdown(state, action: PayloadAction<string>) {
      const existingCountdown = state.countdowns.find(
        (countdown) => countdown.id === action.payload
      );
      if (existingCountdown?.id) {
        state.countdowns = state.countdowns.filter(
          (countdown) => countdown.id !== action.payload
        );
      }
    },
  },
});

export const { getCountdown, createCountdown, deleteCountdown } =
  countdownSlice.actions;
export default countdownSlice.reducer;
