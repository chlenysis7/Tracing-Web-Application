import { createSlice } from "@reduxjs/toolkit";

const mobilityHistoryPopUpOpenStateSlice = createSlice({
  name: "mobility-historyPopUpOpenState",
  initialState: false,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const mobilityHistoryPopUpOpenStateActions =
  mobilityHistoryPopUpOpenStateSlice.actions;

export default mobilityHistoryPopUpOpenStateSlice.reducer;
