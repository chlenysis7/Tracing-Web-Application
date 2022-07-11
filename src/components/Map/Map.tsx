// React
import React, { ReactElement, useEffect, useRef } from "react";
import loadable from "@loadable/component";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// Leaflet
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";

// CSS
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

// Helpers
import { MapGenerator } from "./MapGenerator";

// Enums & Interfaces
import { MapType, MobilityPathType, TracingMarkerType } from "../../enums";
import { IMapState } from "../../interfaces/mapsInterfaces";
import { IMobilityAnalysisResponse } from "../../interfaces/mobilityInterfaces";

// Any
import { Markup } from "interweave";

// Popup Components
import { MobilityMarkerPopupText } from "./mobility/MobilityMarkerPopupText";
import { MobilityPolylinePopupContent } from "./mobility/MobilityPolylinePopupContent";

// Components
const MapZoomBtn = loadable(() => import("./MapZoomBtn"));
const MapUserLocationMarker = loadable(() => import("./MapUserLocationMarker"));

export const Map = ({ path }: { path: string }) => {
  // STATES
  const mobilityAnalysisResult = useSelector<
    RootState,
    IMobilityAnalysisResponse | undefined
  >((state) => state.mobilityAnalysisResult.result);

  const mobilityMapState: IMapState | undefined =
    mobilityAnalysisResult?.mapResult;

  const tracingMapState: IMapState | null = useSelector<
    RootState,
    IMapState | null
  >((state) => state.tracingMapState);

  const mapState: IMapState | undefined | null =
    path === "/tracing" ? tracingMapState : mobilityMapState;

  const mobilityMapControlState: Array<boolean> = useSelector<
    any,
    Array<boolean>
  >((state) => state.mobilityMapControlState);

  const tracingMapControlState: Array<boolean> = useSelector<
    any,
    Array<boolean>
  >((state) => state.tracingMapControlState);

  const mapType: MapType = useSelector<RootState, MapType>(
    (state) => state.mapType
  );
  // End STATES

  const tileRef = useRef<any>(null);
  const popupRef = useRef<any>(null);

  const defaultPosition: LatLngExpression = [-7.765141, 110.372482];

  const urlMapHybrid: string =
    "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}";
  const urlMapSatelite: string =
    "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
  const urlMapStreet: string =
    "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";

  useEffect(() => {
    if (tileRef.current) {
      tileRef.current.setUrl(
        mapType === MapType.SATELITE
          ? urlMapSatelite
          : mapType === MapType.HYBRID
          ? urlMapHybrid
          : urlMapStreet
      );
    }
  }, [mapType]);

  const generateMobilityPolylineColor = (total: number): string => {
    if (mobilityAnalysisResult) {
      let scale = total / mobilityAnalysisResult.statistics.maxTotal;
      let [aR, aG, aB, bR, bG, bB] = [0, 0, 255, 255, 0, 0];
      let r = (bR - aR) * scale + aR;
      let g = (bG - aG) * scale + aG;
      let b = (bB - aB) * scale + aB;
      return `rgb(${r}, ${g}, ${b})`;
    }
    return "rgb(0, 0, 0)";
  };

  return (
    <MapStyle>
      <MapContainer center={defaultPosition} zoom={10} zoomControl={false}>
        <MapDisableZoomOnScroll />
        <TileLayer
          attribution='Maps by <a href="https://maps.google.com">Google Maps</a>'
          ref={tileRef}
          url={
            mapType === MapType.SATELITE
              ? urlMapSatelite
              : mapType === MapType.HYBRID
              ? urlMapHybrid
              : urlMapStreet
          }
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        {/* <ScaleControl position="bottomright" /> */}

        {/* Mobility/Tracing Polylines */}
        {mapState?.polyLines.map((polyLine, i) => {
          let _polyline;
          if (
            mobilityAnalysisResult &&
            mobilityMapControlState &&
            mobilityMapControlState[i] === true &&
            mapState?.type === "MOBILITY"
          ) {
            if (
              mobilityAnalysisResult.analysisResult[i].type ===
              MobilityPathType.ONE_TO_ONE
            )
              _polyline = (
                <Polyline
                  stroke={true}
                  pathOptions={{
                    color: generateMobilityPolylineColor(
                      mobilityAnalysisResult.analysisResult[i].timeAtLocation[0]
                        .count
                    ),
                  }}
                  positions={polyLine.points}
                  key={`${mapState.type}_${i}`}
                >
                  <Popup ref={popupRef}>
                    {polyLine.popup ? (
                      <Markup content={polyLine.popup} />
                    ) : (
                      <MobilityPolylinePopupContent
                        result={mobilityAnalysisResult}
                        i={i}
                      />
                    )}
                  </Popup>
                </Polyline>
              );
            else if (
              mobilityAnalysisResult.analysisResult[i].type ===
              MobilityPathType.ONE_TO_MANY
            )
              _polyline = (
                <>
                  {polyLine.points.map((point: any, index: number) => (
                    <Polyline
                      stroke={true}
                      pathOptions={{
                        color: generateMobilityPolylineColor(
                          mobilityAnalysisResult.analysisResult[i]
                            .timeAtLocation[index].count
                        ),
                      }}
                      positions={point}
                      key={`${mapState.type}_${i}_${index}`}
                    >
                      <Popup ref={popupRef}>
                        {polyLine.popup ? (
                          <Markup content={polyLine.popup} />
                        ) : (
                          <MobilityPolylinePopupContent
                            result={mobilityAnalysisResult}
                            i={i}
                          />
                        )}
                      </Popup>
                    </Polyline>
                  ))}
                </>
              );
          } else if (mapState?.type === "TRACING") {
            _polyline = (
              <Polyline
                stroke={true}
                pathOptions={{
                  color: mapState.colors?.[i]
                    ? mapState.colors?.[i]
                    : "#DC3545",
                }}
                positions={polyLine.points}
                key={mapState.type + i}
              >
                <Popup ref={popupRef}>
                  {polyLine.popup ? (
                    <Markup content={polyLine.popup} />
                  ) : (
                    "Route"
                  )}
                </Popup>
              </Polyline>
            );
          }
          return _polyline;
        })}

        {/* Tracing */}
        {mapState?.markerPoints.tracingPoints?.map((point, i) => {
          let marker;
          if (
            tracingMapControlState &&
            tracingMapControlState[0] === true &&
            point.tracingMarkerType === TracingMarkerType.LOWER_POINT
          )
            marker = (
              <Marker
                key={mapState.type + i}
                position={point.coordinates}
                icon={MapGenerator.generateMarker(point)}
              >
                <Popup ref={popupRef}>
                  {point.popup ? <Markup content={point.popup} /> : "Tracing Surrounding (Lower Limit)"}
                </Popup>
              </Marker>
            );
          else if (
            tracingMapControlState &&
            tracingMapControlState[1] === true &&
            point.tracingMarkerType === TracingMarkerType.UPPER_POINT
          )
            marker = (
              <Marker
                key={mapState.type + i}
                position={point.coordinates}
                icon={MapGenerator.generateMarker(point)}
              >
                <Popup ref={popupRef}>
                  {point.popup ? <Markup content={point.popup} /> : "Tracing Surrounding (Upper Limit)"}
                </Popup>
              </Marker>
            );
          else if (
            point.tracingMarkerType === TracingMarkerType.START_POINT
          )
            marker = (
              <Marker
                key={mapState.type + i}
                position={point.coordinates}
                icon={MapGenerator.generateMarker(point)}
              >
                <Popup ref={popupRef}>
                  {point.popup ? <Markup content={point.popup} /> : "Tracing Start Point"}
                </Popup>
              </Marker>
            );
            else if (
              point.tracingMarkerType === TracingMarkerType.STOP_POINT
            )
            marker = (
              <Marker
                key={mapState.type + i}
                position={point.coordinates}
                icon={MapGenerator.generateMarker(point)}
              >
                <Popup ref={popupRef}>
                  {point.popup ? <Markup content={point.popup} /> : "Tracing Stop Point"}
                </Popup>
              </Marker>
            );
            else if (
              point.tracingMarkerType === TracingMarkerType.TRANSIT_POINT
            )
            marker = (
              <Marker
                key={mapState.type + i}
                position={point.coordinates}
                icon={MapGenerator.generateMarker(point)}
              >
                <Popup ref={popupRef}>
                  {point.popup ? <Markup content={point.popup} /> : "Tracing Transit Point"}
                </Popup>
              </Marker>
            );
          return marker;
        })}

        {/* Mobility */}
        {mapState?.markerPoints.mobilityPathPoints?.map((path, i) => {
          const pathMarkers: Array<ReactElement> = [];
          path.map((point, j) => {
            if (mobilityMapControlState[i])
              pathMarkers.push(
                <Marker
                  key={mapState.type + i.toString() + "|" + j.toString()}
                  position={point.coordinates}
                  icon={MapGenerator.generateMarker(
                    point,
                    mapState.colors?.[
                      point.mobilityPathIndex !== undefined
                        ? point.mobilityPathIndex
                        : 0
                    ]
                  )}
                >
                  <Popup>
                    <Markup
                      parsedContent={MobilityMarkerPopupText(
                        i,
                        point.mobilityMarkerText,
                        mapState.colors?.[i],
                        mobilityAnalysisResult?.params[i].points[j]
                      )}
                    />
                  </Popup>
                </Marker>
              );
            return null;
          });
          return pathMarkers;
        })}
        <MapZoomBtn />
        {path === "/mobility" ? <MapUserLocationMarker /> : ""}
      </MapContainer>
    </MapStyle>
  );
};

const MapDisableZoomOnScroll = () => {
  const map = useMap();

  useEffect(() => {
    map.scrollWheelZoom.disable();
    map.on("focus", function () {
      map.scrollWheelZoom.enable();
    });
    map.on("blur", function () {
      map.scrollWheelZoom.disable();
    });
  }, [map]);

  return <></>;
};

const MapStyle = styled.div`
  position: fixed;
  z-index: 0;

  .leaflet-container {
    width: 100vw;
    height: 100vh;
  }

  .leaflet-popup-content {
    text-align: center;
    min-width: 150px;
    width: fit-content !important;
    margin-right: 1em !important;
    margin-left: 1em !important;
  }

  .leaflet-popup-content-wrapper {
    width: fit-content !important;
  }

  .leaflet-popup-close-button {
    background: var(--color-red) !important;
    border-radius: 50%;
    width: 36px !important;
    height: 36px !important;
    display: grid;
    align-content: center !important;
    margin-right: -1em;
    margin-top: -1em;
    color: white !important;

    span {
      font-size: 1.5em !important;
    }
  }
`;

export default Map;
