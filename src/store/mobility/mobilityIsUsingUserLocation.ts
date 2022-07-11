import { createSlice } from "@reduxjs/toolkit";

const tokenName = "mobility_access_location";
export const getToken = () => {
  return localStorage.getItem(tokenName);
};
const setToken = (val: boolean) => {
  localStorage.setItem(tokenName, val ? "1" : "0");
};
export const removeMobilityUserLocationToken = () => {
  localStorage.removeItem(tokenName);
};

const initialState: boolean | null = getToken()
  ? getToken() === "1"
    ? true
    : false
  : null;

const mobilityIsUsingUserLocationSlice = createSlice({
  name: "mobility-isUsingUserLocation",
  initialState,
  reducers: {
    setAll(_, action) {
      setToken(action.payload);
      return action.payload;
    },
  },
});

export const mobilityIsUsingUserLocationActions =
  mobilityIsUsingUserLocationSlice.actions;

export default mobilityIsUsingUserLocationSlice.reducer;
