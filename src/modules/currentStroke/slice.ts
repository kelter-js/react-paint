import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { currentStrokeInitialState } from "../../constants";
import { RootState, Point } from "../../types";
import { endStroke } from "../sharedActions";

const slice = createSlice({
  name: "currentStroke",
  initialState: currentStrokeInitialState,
  reducers: {
    beginStroke: (state, action: PayloadAction<Point>) => {
      state.points = [action.payload];
    },
    updateStroke: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload);
    },
    setStrokeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state) => {
      state.points = [];
    });
  },
});

export const currentStroke = slice.reducer;

export const { beginStroke, updateStroke, setStrokeColor } = slice.actions;

export const currentStrokeSelector = (state: RootState) => state.currentStroke;
