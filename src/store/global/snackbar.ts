import { createSlice } from "@reduxjs/toolkit";
import { ISnackBarState } from "../../interfaces/globalInterfaces";

const initialSnackBarState: ISnackBarState = {
  severity: "success",
  text: "Snackbar Opened",
  isOpen: false,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  autoHideDuration: 6000,
};

const snackbarSlice = createSlice({
  name: "global-snackbar",
  initialState: initialSnackBarState,
  reducers: {
    setOpen(state, action) {
      state.isOpen = action.payload;
    },
    setAll(_, action) {
      return action.payload;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice.reducer;
