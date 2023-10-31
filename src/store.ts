import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";

import { currentStroke } from "./modules/currentStroke/slice";
import { modalVisible } from "./modules/modals/slice";
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

export default store;
