import { configureStore } from "@reduxjs/toolkit";

// Global
import authReducer from "./global/auth";
import snackbarReducer from "./global/snackbar";
import isMobileReducer from "./global/isMobile";
import loginState from "./global/loginState";
import userLocation from "./global/userLocation";
import mapType from "./global/mapType";

// Mobility
import mobilityAnalysisParamsReducer from "./mobility/mobilityAnalysisParams";
import mobilityAnalyzeFormExpandedReducer from "./mobility/mobilityAnalyzeFormExpanded";
import mobilityHistoryPopUpOpenReducer from "./mobility/mobilityHistoryPopupOpen";
import mobilityHistoryStateReducer from "./mobility/mobilityHistoryState";
import mobilityMapControlStateReducer from "./mobility/mobilityMapControlState";
import mobilityAnalysisResultReducer from "./mobility/mobilityAnalysisResult";
import mobilityAnalysisFormValidationReducer from "./mobility/mobilityAnalysisFormValidation";
import mobilityMobileAnalysisFormOpenReducer from "./mobility/mobilityMobileAnalysisFormOpen";
import mobilityAutocomplete from "./mobility/mobilityAutocomplete";
import mobilityIsUsingUserLocation from "./mobility/mobilityIsUsingUserLocation";

// Tracing
import tracingAnalysisParamsReducer from "./tracing/tracingAnalysisParams";
import tracingSearchFormExpandedReducer from "./tracing/tracingSearchFormExpanded";
import tracingHistoryPopupOpenReducer from "./tracing/tracingHistoryPopupOpen";
import tracingHistoryStateReducer from "./tracing/tracingHistoryState";
import tracingMapControlStateReducer from "./tracing/tracingMapControlState";
import tracingMapStateReducer from "./tracing/tracingMapState";
import tracingAnalysisResultReducer from "./tracing/tracingAnalysisResult";

// Any
import { getEnvironment } from "../helpers/common";
import { Environment } from "../enums";

const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    isMobile: isMobileReducer,
    loginState: loginState,
    userLocation: userLocation,
    mapType: mapType,
    mobilityAnalysisParams: mobilityAnalysisParamsReducer,
    mobilityAnalyzeFormExpanded: mobilityAnalyzeFormExpandedReducer,
    mobilityHistoryPopUpOpen: mobilityHistoryPopUpOpenReducer,
    mobilityHistoryState: mobilityHistoryStateReducer,
    mobilityMapControlState: mobilityMapControlStateReducer,
    mobilityAnalysisResult: mobilityAnalysisResultReducer,
    mobilityAnalysisFormValidation: mobilityAnalysisFormValidationReducer,
    mobilityMobileAnalysisFormOpen: mobilityMobileAnalysisFormOpenReducer,
    mobilityAutocomplete: mobilityAutocomplete,
    mobilityIsUsingUserLocation: mobilityIsUsingUserLocation,
    tracingAnalysisParams: tracingAnalysisParamsReducer,
    tracingSearchFormExpanded: tracingSearchFormExpandedReducer,
    tracingHistoryPopupOpen: tracingHistoryPopupOpenReducer,
    tracingHistoryState: tracingHistoryStateReducer,
    tracingMapControlState: tracingMapControlStateReducer,
    tracingMapState: tracingMapStateReducer,
    tracingAnalysisResult: tracingAnalysisResultReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: getEnvironment() === Environment.DEV ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
