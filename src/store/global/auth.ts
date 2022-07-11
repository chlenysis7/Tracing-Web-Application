import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiCallStatus, AuthApiCallStatus } from "../../enums";
import { IAuthState } from "../../interfaces/globalInterfaces";
import { removeMobilityUserLocationToken } from "../mobility/mobilityIsUsingUserLocation";

const initialAuthState: IAuthState = {
  status: AuthApiCallStatus.IDLE,
  isAuthenticated: false,
  user: {
    name: "",
    email: "",
    access_token: "",
  },
};

const getToken = () => {
  return localStorage.getItem("access_token");
};
const setToken = (val: string) => {
  localStorage.setItem("access_token", val);
};
const removeToken = () => {
  localStorage.removeItem("access_token");
};

export const getTokenAction: any = createAsyncThunk(
  "getToken",
  async (_, { dispatch, getState }) => {
    let state: any = getState();

    return axios
      .post("/token", new URLSearchParams(state.loginState))
      .then(async (resToken: AxiosResponse<any, any>) => {
        const { data } = resToken;
        setToken(data.access_token);
      })
      .catch(function (error: AxiosError) {
        return error;
      });
  }
);

export const logoutUserAction: any = createAsyncThunk(
  "logoutUser",
  async (_) => {
    removeToken();
    removeMobilityUserLocationToken();
    return AuthApiCallStatus.SUCCESS_LOGOUT;
  }
);

export const getUserInfoAction: any = createAsyncThunk(
  "getUserInfo",
  async (_) => {
    let token = getToken();

    if (token !== null) {
      return await axios
        .get("/users/me/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((resUser: AxiosResponse<any, any>) => {
          let newUserData = {
            status: ApiCallStatus.SUCCESS,
            isAuthenticated: resUser.data.disabled === false,
            user: {
              name: resUser.data.username,
              email: resUser.data.email,
              access_token: token,
            },
          };
          return newUserData;
        })
        .catch(function (error: AxiosError) {
          if (error.response?.status === 401) removeToken();
        });
    }
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setAll(_, { payload }) {
      return payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTokenAction.pending, (state, action) => {
      state.status = AuthApiCallStatus.LOADING_TOKEN;
    });
    builder.addCase(getTokenAction.fulfilled, (state, { payload }) => {
      if (payload instanceof AxiosError) {
        if (payload.code === "ERR_NETWORK")
          state.status = AuthApiCallStatus.NO_NETWORK;
        else if (payload.response?.status === 401)
          state.status = AuthApiCallStatus.NO_USER;
        else state.status = AuthApiCallStatus.FAILED_TOKEN;
        return;
      }
      state.status = AuthApiCallStatus.SUCCESS_TOKEN;
    });
    builder.addCase(getTokenAction.rejected, (state, action) => {
      state.status = AuthApiCallStatus.FAILED_TOKEN;
    });
    builder.addCase(getUserInfoAction.pending, (state, action) => {
      state.status = AuthApiCallStatus.LOADING_USER;
    });
    builder.addCase(
      getUserInfoAction.fulfilled,
      (state: IAuthState, { payload }) => {
        if (payload) {
          state.status = AuthApiCallStatus.SUCCESS_USER;
          state.isAuthenticated = payload.isAuthenticated;
          state.user = payload.user;
        } else state.status = AuthApiCallStatus.IDLE;
      }
    );
    builder.addCase(getUserInfoAction.rejected, (state, { payload }) => {
      state.status = AuthApiCallStatus.FAILED_USER;
    });
    builder.addCase(
      logoutUserAction.fulfilled,
      (state: IAuthState, { payload }) => {
        state.status = payload;
        state.isAuthenticated = false;
        state.user = {
          name: "",
          email: "",
          access_token: "",
        };
      }
    );
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
