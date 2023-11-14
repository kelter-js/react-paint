import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { logger } from "redux-logger";

import { currentStroke } from "./modules/currentStroke/slice";
import { modalVisible } from "./modules/modals/slice";
import { RootState } from "./utils/types";
import historyIndex from "./modules/historyIndex/slice";
import strokes from "./modules/strokes/slice";

const store = configureStore({
  reducer: {
    historyIndex,
    strokes,
    currentStroke,
    modalVisible,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
