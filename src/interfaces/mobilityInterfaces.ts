import { Dispatch, SetStateAction } from "react";
import { LatLngExpression } from "leaflet";

import {
  ApiCallStatus,
  MobilityInputPopupParamType,
  MobilityPathType,
  MobilityValidationStatus,
} from "../enums";

import { IMapState } from "./mapsInterfaces";

// --- START SEARCH FORM
export interface IMobilityAnalysisParamsState {
  analysisParams: Array<IMobilityPathParams>;
  setAnalysisParams: Dispatch<SetStateAction<Array<IMobilityPathParams>>>;
}

export interface IMobilityPathParams {
  type: MobilityPathType;
  points: Array<IMobilityPointParams>;
}

export interface IMobilityPointParams {
  [key: string]: any;
  isCompleted: boolean;
  province?: string | null;
  city?: string | null;
  district?: string | null;
  subdistrict?: string | null;
  startDateTime?: string | null;
  endDateTime?: string | null;
}
// --- END SEARCH FORM

// --- START ANALYSIS RESULT
export interface IMobilityAnalysisResponse {
  analysisId?: string;
  timeStampStartAnalysis?: string;
  timeStampResultReceived?: string;
  userId?: string;
  params: Array<IMobilityPathParams>;
  analysisResult: Array<IMobilitySinglePathResult>;
  mapResult: IMapState;
  statistics: { maxTotal: number };
}

export interface IMobilitySinglePathResult {
  pathNo: number;
  type: MobilityPathType;
  timeAtLocation: Array<IMobilitySinglePathTimeLocationResult>;
}

export interface IMobilitySinglePathTimeLocationResult {
  id?: string;
  origin_name: string;
  destination_name: string;
  origin_latLon: LatLngExpression;
  destination_latLon: LatLngExpression;
  origin_startDateTime: string;
  origin_endDateTime: string;
  destination_startDateTime: string;
  destination_endDateTime: string;
  count: number;
}

export interface IMobilityResultState {
  errorMsg?: string;
  result?: IMobilityAnalysisResponse;
  status: ApiCallStatus;
}
// --- END ANALYSIS RESULT

// --- START VALIDATION
export interface IMobilityValidationErrors {
  [key: string]: any;
  path: number;
  point: number;
  status: MobilityValidationStatus;
  paramType?: MobilityInputPopupParamType;
  pathErrorMessage?: string;
  pointErrorMessage?: string;
}
// --- END VALIDATION
