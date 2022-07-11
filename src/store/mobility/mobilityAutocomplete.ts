import { RootState } from "..";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosResponse } from "axios";

import { autocompleteLibNew } from "../../autocompletelib/lib";

import { Environment } from "../../enums";
import { IAutocompleteLibrary } from "../../interfaces/mapsInterfaces";

import { getEnvironment } from "../../helpers/common";

export const getAutocompleteAction: any = createAsyncThunk<
  any,
  void,
  { state: RootState }
>("getAutocomplete", async (_, { dispatch, getState }) => {
  if (getEnvironment() !== Environment.DEV) {
    dispatch(mobilityAutocompleteActions.setAll(autocompleteLibNew));
    return;
  }

  return await axios
    .get("/autocomplete")
    .then((res: AxiosResponse<IAutocompleteLibrary, any>) => {
      const { data } = res;
      dispatch(mobilityAutocompleteActions.setAll(data));
      return data;
    });
});

const mobilityAutocomplete = createSlice({
  name: "mobility-autocomplete",
  initialState: autocompleteLibNew,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const mobilityAutocompleteActions = mobilityAutocomplete.actions;

export default mobilityAutocomplete.reducer;
