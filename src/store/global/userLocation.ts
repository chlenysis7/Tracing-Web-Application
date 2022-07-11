import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import {
  INominatimResponse,
  IUserLocation,
} from "../../interfaces/mapsInterfaces";

const initialState: IUserLocation | null = null;

export const getUserLocationAddressAction: any = createAsyncThunk(
  "getUserLocationAddress",
  async (_, { dispatch, getState }) => {
    const state: any = getState();
    if (state.userLocation)
      return await axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lon=${state.userLocation.lon}&lat=${state.userLocation.lat}&zoom=10&accept-language=id`
        )
        .then((resNominatim: AxiosResponse<INominatimResponse, any>) => {
          const { data } = resNominatim;
          dispatch(
            userLocationActions.setAll({
              ...state.userLocation,
              address: data.address,
            })
          );
          return data.address;
        });
    else return undefined;
  }
);

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    setAll(_, { payload }) {
      return payload;
    },
  },
});

export const userLocationActions = userLocationSlice.actions;

export default userLocationSlice.reducer;
