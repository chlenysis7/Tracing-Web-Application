import { useSelector } from "react-redux";
import styled from "styled-components";
import { IMobilityAnalysisResponse } from "../../../../interfaces/mobilityInterfaces";
import { RootState } from "../../../../store";

export const MobilityLegends = (props: {
  isFromMobileBelowControls: boolean;
}) => {
  const mobilityAnalysisResult = useSelector<
    RootState,
    IMobilityAnalysisResponse | undefined
  >((state) => state.mobilityAnalysisResult.result);

  return (
    <LegendsStyle mobile={props.isFromMobileBelowControls}>
      {!props.isFromMobileBelowControls ? <span>Legends</span> : ""}
      <p>Mobility line</p>
      <div className="color" />
      <div>
        <span>0</span>
        <span>
          {mobilityAnalysisResult?.statistics?.maxTotal
            ? mobilityAnalysisResult.statistics.maxTotal
            : "n/a"}
        </span>
      </div>
      <LegendItem
        mobile={props.isFromMobileBelowControls}
        text={"Origin point(s)"}
        style={{ marginBottom: 16, marginTop: 10 }}
      >
        <div style={{ marginBottom: -16 }}>
          <div className="mobility-marker-legend-pin"></div>
          <span className="mobility-marker-legend-text">O</span>
        </div>
      </LegendItem>
      <LegendItem
        text={"Destination point(s)"}
        mobile={props.isFromMobileBelowControls}
      >
        <div style={{ marginBottom: -24 }}>
          <div className="mobility-marker-legend-pin"></div>
          <span className="mobility-marker-legend-text">D</span>
        </div>
      </LegendItem>
    </LegendsStyle>
  );
};

const LegendItem = (props: any) => {
  return (
    <LegendItemStyle mobile={props.mobile} style={props.style}>
      {props.children}
      <span>{props.text}</span>
    </LegendItemStyle>
  );
};

const LegendItemStyle = styled.div<{ mobile: boolean }>`
  border-radius: 100%;
  display: grid;
  grid-template-columns: ${(p) => (!p.mobile ? "1fr 5fr" : "0.5fr 5fr")};
  margin-right: 1em;
  margin-bottom: 0.2em;
  span {
    color: var(--color-blue);
  }
`;

const LegendsStyle = styled.div<{ mobile: boolean }>`
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
  width: ${(p) => (!p.mobile ? "15vw" : "100%")};
  max-width: ${(p) => (!p.mobile ? "15em" : "")};
  min-width: ${(p) => (!p.mobile ? "14em" : "")};

  > span {
    color: var(--color-blue);
    font-weight: 800;
    font-size: 1.2em;
    margin-bottom: 1em;
  }

  > p {
    color: var(--color-blue);
    margin-bottom: 0.5em;
    :before {
      border-top: 4px solid black;
      display: inline-block;
      position: relative;
      transform: translateY(10px);
      top: -13px;
      width: 2em;
      margin-right: ${(p) => (!p.mobile ? "6px" : "8px")};
      content: "";
    }
  }

  img {
    width: 100%;
  }

  .color {
    width: 100%;
    height: 1em;
    background: linear-gradient(90deg, #0000ff 0%, #ff0000 100%);
    border-radius: 4px;
  }

  .color + div {
    font-size: 0.8em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 1em;

    span:not(:last-child):before {
      transform: translateY(2px);
      position: relative;
      display: inline-block;
      height: 1em;
      content: "";
      border-left: 2px solid #00000022;
      margin-right: 6px;
    }
    span:last-child:after {
      transform: translateY(2px);
      position: relative;
      display: inline-block;
      height: 1em;
      content: "";
      border-right: 2px solid #00000022;
      margin-left: 6px;
    }
    span:last-child {
      justify-self: right;
    }
  }

  .mobility-marker-legend-pin {
    z-index: 1;
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 50% 0;
    background: var(--color-blue);
    position: relative;
    transform: rotate(-45deg);
    top: -10px;
    margin-right: 0.5em;
  }

  /* to draw white circle */
  .mobility-marker-legend-pin::after {
    content: "";
    width: 24px;
    height: 24px;
    margin: 3px 0 0 3px;
    background: #fff;
    position: absolute;
    border-radius: 50%;
  }

  .mobility-marker-legend-text {
    width: 100%;
    text-align: center;
    position: relative;
    top: -33px;
    left: 9px;
    z-index: 1;
    color: black;
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

export default MobilityLegends;