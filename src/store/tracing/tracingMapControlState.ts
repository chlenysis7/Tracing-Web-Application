import { createSlice } from "@reduxjs/toolkit";

const tracingMapControlStateSlice = createSlice({
  name: "tracing-mapControlState",
  initialState: [true, true],
  reducers: {
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const tracingMapControlStateActions = tracingMapControlStateSlice.actions;

export default tracingMapControlStateSlice.reducer;
