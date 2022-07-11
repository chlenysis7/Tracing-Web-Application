import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "..";
import { ApiCallStatus } from "../../enums";
import { Log } from "../../helpers/common";
import { mobilityConvertMultipleArrayofResultsToOne } from "../../helpers/mobility";

import {
  IMobilityAnalysisResponse,
  IMobilityResultState,
} from "../../interfaces/mobilityInterfaces";

import { mobilityMapControlStateActions } from "./mobilityMapControlState";

const scrollToBottom = () => {
  const scrollingElement = document.scrollingElement || document.body;
  scrollingElement.scrollTop = scrollingElement.scrollHeight;
};

export const getMobilityResult: any = createAsyncThunk<
  any,
  void,
  { state: RootState }
>(
  "mobilityAnalysisResult/getMobilityResult",
  async (_, { dispatch, getState }) => {
    let state: RootState = getState();

    Log(
      "%c MOBILITY ANALYSIS PARAMETERS ",
      "color:blue; background-color: white"
    );
    Log(state.mobilityAnalysisParams);

    scrollToBottom();

    let requests: any = [];

    state.mobilityAnalysisParams.forEach((el) => {
      requests.push(
        axios.post("/mobility", [el], {
          headers: { Authorization: `Bearer ${state.auth.user.access_token}` },
        })
      );
    });

    return axios
      .all(requests)
      .then((results) => {
        let temp: IMobilityAnalysisResponse[] = results.map((r: any) => r.data);
        let data = mobilityConvertMultipleArrayofResultsToOne(temp);
        Log(
          "%c MOBILITY ANALYSIS RESULT ",
          "color:red; background-color: white"
        );
        Log(data);
        dispatch(
          mobilityMapControlStateActions.setAll(
            new Array(data.mapResult.colors?.length).fill(true)
          )
        );
        return data;
      })
      .catch(function (error: AxiosError) {
        return error;
      });
  }
);

const initialState = {
  errorMsg: undefined,
  result: undefined,
  status: ApiCallStatus.IDLE,
} as IMobilityResultState;

const mobilityAnalysisResultStateSlice = createSlice({
  name: "mobilityAnalysisResult",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMobilityResult.pending, (state, action) => {
      state.status = ApiCallStatus.LOADING;
    });
    builder.addCase(getMobilityResult.fulfilled, (state, { payload }) => {
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
    builder.addCase(getMobilityResult.rejected, (state, action) => {
      state.status = ApiCallStatus.FAILED_GENERAL;
    });
  },
});

export default mobilityAnalysisResultStateSlice.reducer;
