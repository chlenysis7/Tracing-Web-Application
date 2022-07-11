import React from "react";
import { useMap } from "react-leaflet";
import styled from "styled-components";
import loadable from "@loadable/component";
const Button = loadable(() => import("../Button"));

export const MapZoomBtn = () => {
  const map = useMap();

  map.doubleClickZoom.disable();

  return (
    <ZoomBtnStyle>
      <Button primary className="zoom" onClick={() => map.zoomIn()}>
        +
      </Button>
      <Button primary className={"zoom btm"} onClick={() => map.zoomOut()}>
        -
      </Button>
    </ZoomBtnStyle>
  );
};

const ZoomBtnStyle = styled.div`
  position: absolute;
  right: var(--px-l);
  max-height: calc(12vh + 10em);
  bottom: calc(22vh + 200px);
  z-index: 1000;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0.5em;

  button {
    font-weight: 100;
    padding: 0.2em 0.4em;
    justify-content: center;
    font-size: 2em;
  }
`;

export default MapZoomBtn;
