import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tracingSearchFormExpandedActions } from "./tracingSearchFormExpanded";
import { tracingMapControlStateActions } from "./tracingMapControlState";
import { tracingMapStateActions } from "./tracingMapState";
import { generateISODateTimeFromWIB, Log } from "../../helpers/common";
import { ApiCallStatus } from "../../enums";

import axios, { AxiosError, AxiosResponse } from "axios";

const scrollToBottom = () => {
  const scrollingElement = document.scrollingElement || document.body;
  scrollingElement.scrollTop = scrollingElement.scrollHeight;
};

export const getTracingResult: any = createAsyncThunk(
  "tracingAnalysisResult/getTracingResult",
  async (_, { dispatch, getState }) => {
    let state: any = getState();
    
    Log(
      "%c TRACING ANALYSIS PARAMETERS ",
      "color:blue; background-color: white"
    );
    Log(state.tracingAnalysisParams);

    scrollToBottom();

    const toISOStringWithTimezone = (date: any) => {
      const tzOffset = -date.getTimezoneOffset();
      const diff = tzOffset >= 0 ? '+' : '-';
      const pad = (n: any) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
      return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        diff + pad(tzOffset / 60) +
        ':' + pad(tzOffset % 60);
    };

    let yourDate = new Date(state.tracingAnalysisParams.date);
    // let abc = yourDate.toISOString().split("T")[0];
    // let abc = yourDate.getFullYear()+ '-' + (yourDate.getMonth().toString().length < 2 ? '0' + yourDate.getMonth().toString() : yourDate.getMonth().toString()) + '-' + (yourDate.getDay().toString().length < 2 ? '0' + yourDate.getDay().toString() : yourDate.getDay().toString());
    const isoDate = toISOStringWithTimezone(yourDate);
    let abc = isoDate?.split("T")[0];


    let url = `/tracing?hashNo=${state.tracingAnalysisParams.hashNumber}&date=${abc}&lowerLim=${state.tracingAnalysisParams.lowerLimit}&upperLim=${state.tracingAnalysisParams.upperLimit}`;
    Log(url);
    return await axios
      .get(url, {
        headers: { Authorization: `Bearer ${state.auth.user.access_token}` },
      })
      .then((result: AxiosResponse<any, any>) => {
        let json = result.data;
        json.analysisResult.forEach((el: any, i: number) => {
          el.id = i;
        });
        Log(JSON.stringify(json));

        dispatch(tracingMapControlStateActions.setAll([true, true]));

        dispatch(tracingMapStateActions.setAll(json.mapResult));

        dispatch(tracingSearchFormExpandedActions.setAll(false));
        return json;
      });
  }
);

export interface ITracingResultState {
  errorMsg?: string;
  result?: any;
  status: ApiCallStatus;
}

const initialState = {
  errorMsg: undefined,
  result: undefined,
  status: ApiCallStatus.IDLE,
} as ITracingResultState;

const tracingAnalysisResultStateSlice = createSlice({
  name: "tracing-analysisResult",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTracingResult.pending, (state, action) => {
      state.status = ApiCallStatus.LOADING;
    });
    builder.addCase(getTracingResult.fulfilled, (state, { payload }) => {
      if (payload instanceof AxiosError) {
        state.status = ApiCallStatus.FAILED_GENERAL;
        if (payload.code === "ERR_NETWORK")
          state.errorMsg = "Cannot connect to server, please try again later";
        // else if (payload.response?.status === 404)
        //   state.status = ApiCallStatus.FAILED_NETWORK;
        else
          state.errorMsg =
            "Sorry, your request currently cannot be processed, please try again later";
        return;
      }
      state.status = ApiCallStatus.SUCCESS;
      state.result = payload;
    });
    builder.addCase(getTracingResult.rejected, (state, action) => {
      state.status = ApiCallStatus.FAILED_GENERAL;
    });
  },
});

export default tracingAnalysisResultStateSlice.reducer;
