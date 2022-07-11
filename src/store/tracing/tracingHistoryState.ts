import { createSlice } from "@reduxjs/toolkit";
import { sampleTracingAnalysisResponse } from "../../resources";

const tracingHistoryStateSlice = createSlice({
  name: "tracing-historyState",
  initialState: sampleTracingAnalysisResponse.traceHistory,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const tracingHistoryStateActions = tracingHistoryStateSlice.actions;

export default tracingHistoryStateSlice.reducer;
