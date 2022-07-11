export enum MapResultType {
  MOBILITY = "MOBILITY",
  TRACING = "TRACING",
}

export enum TracingMarkerType {
  START_POINT = "START_POINT",
  STOP_POINT = "STOP_POINT",
  TRANSIT_POINT = "TRANSIT_POINT",
  LOWER_POINT = "LOWER_POINT",
  UPPER_POINT = "UPPER_POINT",
}

export enum MobilityValidationStatus {
  DATA_NOT_FULL = "DATA_NOT_FULL",
  DATA_IS_EMPTY = "DATA_IS_EMPTY",
  START_DATE_IS_EQUAL_TO_END_DATE = "START_DATE_IS_EQUAL_TO_END_DATE",
  START_DATE_IS_GREATER_THAN_END_DATE = "START_DATE_IS_GREATER_THAN_END_DATE",
  NEXT_DEST_START_DATE_LESS_THAN_PREVIOUS_DEST_DATE = "NEXT_DEST_START_DATE_LESS_THAN_PREVIOUS_DEST_DATE",
  VALID = "VALID",
}

export enum MobilityInputPopupParamType {
  PROVINCE = "province",
  CITY = "city",
  DISTRICT = "district",
  START_DATE_TIME = "startDateTime",
  END_DATE_TIME = "endDateTime",
}

export enum MobilityPathType {
  ONE_TO_ONE = "ONE_TO_ONE",
  ONE_TO_MANY = "ONE_TO_MANY",
}

export enum MapType {
  HYBRID = "HYBRID",
  SATELITE = "SATELITE",
  STREET = "STREET",
}

export enum ApiCallStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  FAILED_GENERAL = "failed_general",
}

export enum AuthApiCallStatus {
  IDLE = "idle",
  LOADING_TOKEN = "loading_token",
  LOADING_USER = "loading_user",
  SUCCESS_TOKEN = "success_token",
  SUCCESS_USER = "success_user",
  FAILED_USER = "failed_user",
  FAILED_TOKEN = "failed_token",
  SUCCESS_LOGOUT = "success_logout",
  NO_USER = "no_user",
  NO_NETWORK = "no_network"
}

export enum Environment {
  PROD = "production", // For production site tracing-mobility.web.app
  STG = "staging", // For staging site (main branch / PR branch / npm build) stg-tracing-mobility.web.app
  DEV = "development", // For development site (npm start/local) localhost:3000
}
