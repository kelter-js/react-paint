import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { strokesInitialState } from "../../constants";
import { endStroke } from "../sharedActions";
import { RootState, TSaveProjectArg } from "../../types";
import newProject, { getProject } from "./api";

export const loadProject = createAsyncThunk(
  "LOAD_PROJECT",
  async (projectId: string) => {
    try {
      const { project } = await getProject(projectId);
      return project.strokes;
    } catch (err) {
      console.log(err);
    }
  }
);

export const saveProject = createAsyncThunk(
  "SAVE_PROJECT",
  async ({ projectName, thumbnail }: TSaveProjectArg, { getState }) => {
    try {
      const response = await newProject(
        projectName,
        (getState() as RootState)?.strokes,
        thumbnail
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
);

const strokes = createSlice({
  name: "strokes",
  initialState: strokesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { historyIndex, stroke } = action.payload;

      if (historyIndex === 0) {
        state.push(stroke);
      } else {
        state.splice(-historyIndex, historyIndex, stroke);
      }
    });
    builder.addCase(loadProject.fulfilled, (state, action) => action.payload);
  },
});

export default strokes.reducer;

export const strokesLengthSelector = (state: RootState) => state.strokes.length;

export const strokesSelector = (state: RootState) => state.strokes;
