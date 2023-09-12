import { Point, Stroke } from "../../utils/types";

export const BEGIN_STROKE = "BEGIN_STROKE";
export const UPDATE_STROKE = "UPDATE_STROKE";
export const END_STROKE = "END_STROKE";
export const SET_STROKE_COLOR = "SET_STROKE_COLOR";

export type Action =
  | {
      type: typeof BEGIN_STROKE;
      payload: Point;
    }
  | {
      type: typeof UPDATE_STROKE;
      payload: Point;
    }
  | {
      type: typeof SET_STROKE_COLOR;
      payload: string;
    }
  | {
      type: typeof END_STROKE;
      payload: { stroke: Stroke; historyIndex: number };
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

export const endStroke = (historyIndex: number, stroke: Stroke) => ({
  type: END_STROKE,
  payload: { historyIndex, stroke },
});
