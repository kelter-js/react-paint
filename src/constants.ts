import { ModalState, RootState } from "./types";

export const WIDTH = 1024;
export const HEIGHT = 768;
export const DOUBLE = 2;
export const MIN_COLORS_AMOUNT = 500;
export const modalInitiateState: ModalState = {
  isShown: true,
  modalName: null,
};
export const currentStrokeInitialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
};
export const projectsListInitialState: RootState["projectsList"] = {
  error: undefined,
  pending: false,
  projects: [],
};
export const strokesInitialState: RootState["strokes"] = [];
export const END_STROKE = "END_STROKE";
