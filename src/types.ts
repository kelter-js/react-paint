import { AnyAction } from "@reduxjs/toolkit";
import { END_STROKE } from "./constants";

export type Point = {
  x: number;
  y: number;
};

export type Stroke = {
  points: Point[];
  color: string;
};

export type Project = {
  image: string;
  name: string;
  id: string;
};

export type RootState = {
  currentStroke: Stroke;
  strokes: Stroke[];
  historyIndex: number;
  modalVisible: ModalState;
  projectsList: {
    error?: string;
    pending: boolean;
    projects: Project[];
  };
};

export type TScalerArgs = {
  file: Blob;
  scale: number;
};

export type ModalState = {
  isShown: boolean;
  modalName: string | null;
};

export type TSaveProjectArg = {
  projectName: string;
  thumbnail: string;
};

export type Action =
  | AnyAction
  | {
      type: typeof END_STROKE;
      payload: { stroke: Stroke; historyIndex: number };
    };
