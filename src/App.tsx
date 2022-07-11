// Dependencies
import { forwardRef, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";

// CSS
import GlobalStyle from "./globalStyle";

import { Snackbar, Alert } from "@mui/material";

// Redux
import { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "./store/global/snackbar";
import { isMobileActions } from "./store/global/isMobile";
import { getAutocompleteAction } from "./store/mobility/mobilityAutocomplete";

import { ISnackBarState } from "./interfaces/globalInterfaces";
import { getUserInfoAction } from "./store/global/auth";

const CustomAlert: any = forwardRef(function CustomAlert(props, ref: any) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App() {
  const dispatch = useDispatch();

  // ----- SECTION CHECK WINDOW SIZE -----
  function handleWindowSizeChange() {
    dispatch(isMobileActions.setWidth(window.innerWidth <= 768));
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  });
  // ----- END SECTION CHECK WINDOW SIZE -----

  // ----- SECTION SNACKBAR -----
  const snackbarProps = useSelector<RootState, ISnackBarState>(
    (state) => state.snackbar
  );

  const setSnackbarOpen = (isOpen: boolean) => {
    dispatch(snackbarActions.setOpen(isOpen));
  };
  // ----- END SECTION SNACKBAR -----

  useEffect(() => {
    dispatch(getUserInfoAction())
  }, [dispatch])

  // ----- FETCH AUTOCOMPLETE -----
  useEffect(() => {
    dispatch(getAutocompleteAction());
  }, [dispatch]);
  // ----- END FETCH AUTOCOMPLETE -----

  return (
    <Router>
      {/* Section: Snackbar alert */}
      <Snackbar
        open={snackbarProps.isOpen}
        autoHideDuration={snackbarProps.autoHideDuration}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={snackbarProps.anchorOrigin}
      >
        <CustomAlert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarProps.severity}
          sx={{ width: "100%" }}
        >
          {snackbarProps.text}
        </CustomAlert>
      </Snackbar>
      {/* End Section: Snackbar alert */}

      <GlobalStyle />
      <AppRoutes />
    </Router>
  );
}
