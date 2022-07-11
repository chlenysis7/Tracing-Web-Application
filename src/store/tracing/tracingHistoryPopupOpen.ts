import { createSlice } from "@reduxjs/toolkit";

const initialTracingHistoryPopUpOpenState = false;

const tracingHistoryPopUpOpenStateSlice = createSlice({
  name: "tracing-historyPopUpOpenState",
  initialState: initialTracingHistoryPopUpOpenState,
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const tracingHistoryPopUpOpenStateActions = tracingHistoryPopUpOpenStateSlice.actions;

export default tracingHistoryPopUpOpenStateSlice.reducer;
