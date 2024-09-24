import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { PROJECT_LIST_ACTION_TYPES } from "../../entities/projectList";
import { projectsListInitialState } from "../../constants";
import { RootState } from "../../types";
import fetchProjectsList from "./api";

export const getProjectsList = createAsyncThunk(
  PROJECT_LIST_ACTION_TYPES.GET_PROJECTS_LIST,
  async () => await fetchProjectsList()
);

const slice = createSlice({
  name: "projectsList",
  initialState: projectsListInitialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProjectsList.pending, (state) => {
      state.pending = true;
    });

    builder.addCase(getProjectsList.fulfilled, (state, action) => {
      state.pending = false;
      state.projects = action.payload;
      state.error = undefined;
    });

    builder.addCase(getProjectsList.rejected, (state) => {
      state.pending = false;
      state.error = "Something went wrong";
    });
  },
});

export const projectsList = slice.reducer;

export const projectsListSelector = (state: RootState) =>
  state.projectsList.projects;
export const projectsListPendingSelector = (state: RootState) =>
  state.projectsList.pending;
export const projectsListErrorSelector = (state: RootState) =>
  state.projectsList.error;
