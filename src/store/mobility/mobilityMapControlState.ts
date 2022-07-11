import { createSlice } from "@reduxjs/toolkit";

const mobilityMapControlStateSlice = createSlice({
  name: "mobility-mapControlState",
  initialState: null,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const mobilityMapControlStateActions =
  mobilityMapControlStateSlice.actions;

export default mobilityMapControlStateSlice.reducer;
