import { createSlice } from "@reduxjs/toolkit";
import { MapType } from "../../enums";

const mapTypeSlice = createSlice({
  name: "shared-mapType",
  initialState: MapType.STREET,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const mapTypeActions = mapTypeSlice.actions;

export default mapTypeSlice.reducer;
