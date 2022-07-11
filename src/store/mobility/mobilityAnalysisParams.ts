import { createSlice } from "@reduxjs/toolkit";
import { MobilityPathType } from "../../enums";
import { IMobilityPathParams } from "../../interfaces/mobilityInterfaces";
import { mobilityInitialPointParams } from "../../resources";

const mobilityInitialPathParams: IMobilityPathParams = {
  type: MobilityPathType.ONE_TO_ONE,
  points: [mobilityInitialPointParams(), mobilityInitialPointParams()],
};

const initialMobilityAnalysisParamsState = [
  mobilityInitialPathParams,
];

const mobilityAnalysisParamsStateSlice = createSlice({
  name: "mobility-analysisParamsState",
  initialState: initialMobilityAnalysisParamsState,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
    setPathWithIndex(state, action) {
      state[action.payload.pathIndex] = action.payload.content;
    },
    setOneToOne(state, action) {
      state[action.payload.pathIndex].type = action.payload.content;
    },
  },
});

export const mobilityAnalysisParamsActions =
  mobilityAnalysisParamsStateSlice.actions;

export default mobilityAnalysisParamsStateSlice.reducer;
