import { LatLngExpression } from "leaflet";
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from "react";
import { MapResultType, TracingMarkerType } from "../enums";

export interface IUserLocation {
  lat: number;
  lon: number;
  bbox?: string[];
  address?: INominatimAddress;
}

export interface INominatimResponse {
  address?: INominatimAddress;
}
export interface INominatimAddress {
  [key: string]: any;
  "ISO3166-2-lvl4"?: string;
  village?: string;
  municipality?: string;
  county?: string;
  state?: string;
  country?: string;
  country_code?: string;
}
export interface IMapControlsProps {
  children?: PropsWithChildren<ReactNode>;
  isFromMobileBelowControls?: boolean;
}

export interface IMapStateProps {
  mapState: IMapState;
  controlState: Array<boolean>;
  setControlState: Dispatch<SetStateAction<Array<boolean>>>;
}

export interface IMapState {
  type: MapResultType;
  polyLines: Array<IPolylineProps>;
  colors?: Array<string>;
  markerPoints: {
    mobilityPathPoints?: Array<Array<IMarkerPoints>>;
    tracingPoints?: Array<IMarkerPoints>;
  };
}

export interface IMobilityMarkerPoints {
  coordinates: LatLngExpression;
  mobilityMarkerText: string;
  mobilityPathIndex: number;
}

export interface IMarkerPoints {
  coordinates: LatLngExpression;
  tracingMarkerType?: TracingMarkerType | string;
  mobilityMarkerText?: string;
  tracingMarkerText?: number;
  mobilityPathIndex?: number;
  popup?: string;
}

export interface IPolylineProps {
  popup?: string;
  // points: Array<LatLngExpression> | Array<Array<LatLngExpression>>;
  points: any;
}

export interface IAutocompleteLibrary {
  provinces: Array<IProvinceLibrary>;
}
export interface IProvinceLibrary {
  id: string;
  name: string;
  coordinates: LatLngExpression;
  cities: Array<ICityLibrary>;
}

export interface ICityLibrary {
  id: string;
  name: string;
  coordinates: LatLngExpression;
  districts: Array<IDistrictLibrary>;
}

export interface IDistrictLibrary {
  id: string;
  name: string;
  coordinates?: LatLngExpression | null;
}
