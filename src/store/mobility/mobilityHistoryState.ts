import { createSlice } from "@reduxjs/toolkit";
import { IMobilityAnalysisResponse } from "../../interfaces/mobilityInterfaces";
import { sampleMobilityAnalysisResponse } from "../../resources";

const initialMobilityHistoryState: Array<IMobilityAnalysisResponse> = [
  sampleMobilityAnalysisResponse,
  sampleMobilityAnalysisResponse,
];

const mobilityHistoryStateSlice = createSlice({
  name: "mobility-historyState",
  initialState: initialMobilityHistoryState,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const mobilityHistoryStateActions = mobilityHistoryStateSlice.actions;

export default mobilityHistoryStateSlice.reducer;
