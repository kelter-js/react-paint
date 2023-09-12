import { Point } from "./utils/types";

export const BEGIN_STROKE = "BEGIN_STROKE";
export const UPDATE_STROKE = "UPDATE_STROKE";
export const END_STROKE = "END_STROKE";
export const SET_STROKE_COLOR = "SET_STROKE_COLOR";
export const UNDO = "UNDO";
export const REDO = "REDO";

export type Action =
  | {
      type: typeof UNDO;
    }
  | {
      type: typeof REDO;
    }
  | {
      type: typeof BEGIN_STROKE;
      payload: Point;
    }
  | {
      type: typeof SET_STROKE_COLOR;
      payload: string;
    }
  | {
      type: typeof UPDATE_STROKE;
      payload: Point;
    }
  | {
      type: typeof END_STROKE;
    };

export const beginStroke = (x: number, y: number) => ({
  type: BEGIN_STROKE,
  payload: { x, y },
});

export const updateStroke = (x: number, y: number) => ({
  type: UPDATE_STROKE,
  payload: { x, y },
});

export const setStrokeColor = (color: string) => ({
  type: SET_STROKE_COLOR,
  payload: color,
});

export const undo = () => ({ type: UNDO });
export const redo = () => ({ type: REDO });
export const endStroke = () => ({ type: END_STROKE });
