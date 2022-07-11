import { createSlice } from "@reduxjs/toolkit";

const mobilityMobileAnalysisFormOpen = createSlice({
  name: "mobility-mobileAnalysisFormOpen",
  initialState: false,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const mobilityMobileAnalysisFormOpenActions =
mobilityMobileAnalysisFormOpen.actions;

export default mobilityMobileAnalysisFormOpen.reducer;
