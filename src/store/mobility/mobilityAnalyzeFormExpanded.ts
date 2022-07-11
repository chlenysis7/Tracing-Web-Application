import { createSlice } from "@reduxjs/toolkit";

const mobilityAnalyzeFormExpandedSlice = createSlice({
  name: "mobility-analyzeformExpanded",
  initialState: true,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const mobilityAnalyzeFormExpandedActions = mobilityAnalyzeFormExpandedSlice.actions;

export default mobilityAnalyzeFormExpandedSlice.reducer;
