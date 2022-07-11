import React from "react";
import styled from "styled-components";

export const TracingLegends = (props) => {
  return (
    <LegendsStyle mobile={props.isFromMobileBelowControls}>
      <span>{!props.isFromMobileBelowControls ? "Legends" : ""}</span>

      <LegendItem
        mobile={props.isFromMobileBelowControls}
        text={"Tracing Start Point"}
        style={{ marginBottom: 16, marginTop: 40 }}
      >
        <div style={{ marginBottom: -16 }}>
          <div className="tracing-start-legend-pin"></div>
        </div>
      </LegendItem>

      <LegendItem
        mobile={props.isFromMobileBelowControls}
        text={"Tracing Stop Point"}
        style={{ marginBottom: 16, marginTop: 40 }}
      >
        <div style={{ marginBottom: -16 }}>
          <div className="tracing-stop-legend-pin"></div>
        </div>
      </LegendItem>

      <LegendItem
        mobile={props.isFromMobileBelowControls}
        text={"Tracing Transit Point"}
        style={{ marginBottom: 16, marginTop: 40 }}
      >
        <div style={{ marginBottom: -16 }}>
          <div className="tracing-transit-legend-pin"></div>
        </div>
      </LegendItem>

      <LegendItem
        mobile={props.isFromMobileBelowControls}
        text={"Tracing Surrounding (Lower Limit)"}
        style={{ marginBottom: 16, marginTop: 40 }}
      >
        <div style={{ marginBottom: -16 }}>
          <div className="tracing-lower-legend-pin"></div>
        </div>
      </LegendItem>

      <LegendItem
        mobile={props.isFromMobileBelowControls}
        text={"Tracing Surrounding (Upper Limit)"}
        style={{ marginBottom: 16, marginTop: 40 }}
      >
        <div style={{ marginBottom: -16 }}>
          <div className="tracing-upper-legend-pin"></div>
        </div>
      </LegendItem>

      <LegendItem
        mobile={props.isFromMobileBelowControls}
        text={"Route"}
        style={{ marginBottom: 16, marginTop: 40 }}
      >
        <div style={{ marginBottom: -16 }}>
          <div className="tracing-route-legend-pin"></div>
        </div>
      </LegendItem>
    </LegendsStyle>
  );
};

const LegendItem = (props) => {
  return (
    <LegendItemStyle mobile={props.mobile}>
      {props.children}
      <span>{props.text}</span>
    </LegendItemStyle>
  );
};

const LegendItemStyle = styled.div`
  border-radius: 100%;
  display: grid;
  grid-template-columns: ${(p) => (!p.mobile ? "1fr 5fr" : "0.5fr 5fr")};
  margin-right: 1em;
  margin-bottom: 0.2em;
  font-size: 13px;
  span {
    color: var(--color-blue);
  }
`;

const LegendsStyle = styled.div`
  position: ${(p) => (!p.mobile ? "absolute" : "")};
  bottom: 12vh;
  right: var(--px-xs);
  box-shadow: ${(p) =>
    !p.mobile
      ? "0px 8px 24px rgba(176, 190, 197, 0.32),0px 3px 5px rgba(176, 190, 197, 0.32)"
      : ""};
  padding: 1em;
  background: ${(p) => (!p.mobile ? "white" : "")};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: ${(p) => (!p.mobile ? "100vw" : "100%")};
  max-width: ${(p) => (!p.mobile ? "18em" : "")};
  min-width: ${(p) => (!p.mobile ? "14em" : "")};

  > span {
    color: var(--color-blue);
    font-weight: 800;
    font-size: 1.2em;
    margin-bottom: 1em;
  }

  .tracing-start-legend-pin {
    z-index: 1;
    width: 13px;
    height: 13px;
    border-radius: 50% 50% 50% 0;
    background: var(--color-orange);
    position: relative;
    transform: rotate(-45deg);
    margin-right: 0.5em;
  }

  .tracing-stop-legend-pin {
    z-index: 1;
    width: 13px;
    height: 13px;
    border-radius: 50% 50% 50% 0;
    background: var(--color-yellow);
    position: relative;
    transform: rotate(-45deg);
    margin-right: 0.5em;
  }

  .tracing-transit-legend-pin {
    z-index: 1;
    width: 13px;
    height: 13px;
    border-radius: 50% 50% 50% 0;
    background: var(--color-red);
    position: relative;
    transform: rotate(-45deg);
    margin-right: 0.5em;
  }

  .tracing-lower-legend-pin {
    z-index: 1;
    width: 13px;
    height: 13px;
    border-radius: 50% 50% 50% 0;
    background: var(--color-blue);
    position: relative;
    transform: rotate(-45deg);
    margin-right: 0.5em;
  }

  .tracing-upper-legend-pin {
    z-index: 1;
    width: 13px;
    height: 13px;
    border-radius: 50% 50% 50% 0;
    background: var(--color-green);
    position: relative;
    transform: rotate(-45deg);
    margin-right: 0.5em;
  }

  .tracing-route-legend-pin {
    z-index: 1;
    width: 20px;
    height: 7px;
    background: var(--color-red);
    position: relative;
    margin-right: 0.5em;
    top: 4px;
  }

  .mobile {
    position: unset;
    padding: 1em;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 15vw;
    max-width: 15em;
    min-width: 14em;
  }
`;

export default TracingLegends;
