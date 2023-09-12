import {
  Action,
  UPDATE_STROKE,
  BEGIN_STROKE,
  SET_STROKE_COLOR,
} from "./actions";
import { END_STROKE } from "./modules/historyIndex/actions";
import { RootState } from "./utils/types";

const initialState: RootState = {
  currentStroke: { points: [], color: "#000" },
  strokes: [],
  historyIndex: 0,
};

export const rootReducer = (
  state: RootState = initialState,
  action: Action
) => {
  switch (action.type) {
    case BEGIN_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload],
        },
      };
    }
    case UPDATE_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, action.payload],
        },
      };
    }
    case SET_STROKE_COLOR: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          color: action.payload,
        },
      };
    }
    case END_STROKE: {
      if (!state.currentStroke.points.length) {
        return state;
      }

      const historyIndex = state.strokes.length - state.historyIndex;

      return {
        ...state,
        historyIndex: 0,
        currentStroke: { ...state.currentStroke, points: [] },
        strokes: [...state.strokes.slice(0, historyIndex), state.currentStroke],
      };
    }
    default:
      return state;
  }
};

export const currentStrokeSelector = (state: RootState) => state.currentStroke;
export const historyIndexSelector = (state: RootState) => state.historyIndex;
export const strokesSelector = (state: RootState) => state.strokes;

export default rootReducer;
