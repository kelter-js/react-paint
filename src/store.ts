import {
  configureStore,
  ThunkAction,
  Action,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import logger from "redux-logger";

import { currentStroke } from "./modules/currentStroke/slice";
import { modalVisible } from "./modules/modals/slice";
import { projectsList } from "./modules/projectsList/slice";
import { RootState } from "./types";
import historyIndex from "./modules/historyIndex/slice";
import strokes from "./modules/strokes/slice";

export const store = configureStore({
  reducer: {
    historyIndex,
    strokes,
    currentStroke,
    modalVisible,
    projectsList,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = ThunkDispatch<void, RootState, Action>;

export default store;
