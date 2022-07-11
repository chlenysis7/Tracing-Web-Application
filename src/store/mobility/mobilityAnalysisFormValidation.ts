import { createSlice } from "@reduxjs/toolkit";

const mobilityAnalysisFormValidationSlice = createSlice({
  name: "mobility-analysisFormValidation",
  initialState: [],
  reducers: {
    setAll(_, { payload }) {
      return payload;
    },
  },
});

export const mobilityAnalysisFormValidationActions =
  mobilityAnalysisFormValidationSlice.actions;

export default mobilityAnalysisFormValidationSlice.reducer;
