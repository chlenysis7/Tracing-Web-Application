import { createSlice } from "@reduxjs/toolkit";
import { resources } from "../../resources";

const tracingAnalysisParamsStateSlice = createSlice({
    name: "tracing-analysisParamsState",
    initialState: resources.tracingInitialParams,
    reducers: {
      setAll(_, action) {
        return action.payload;
      },
    },
});

export const tracingAnalysisParamsActions = tracingAnalysisParamsStateSlice.actions;

export default tracingAnalysisParamsStateSlice.reducer;
