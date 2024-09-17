import { AnyAction, createAction } from "@reduxjs/toolkit";
import { Stroke } from "../../types";

export const END_STROKE = "END_STROKE";

export type Action =
  | AnyAction
  | {
      type: typeof END_STROKE;
      payload: { stroke: Stroke; historyIndex: number };
    };

export const endStroke = createAction<{
  stroke: Stroke;
  historyIndex: number;
}>("endStroke");
