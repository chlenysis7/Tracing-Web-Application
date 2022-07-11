import styled from "styled-components";
import loadable from "@loadable/component";

// Components Tracing
import { TracingMapControls } from "../../../components/Map/tracing/TracingMapControls";
import { TracingBelowControls } from "../tracing/components/TracingBelowControls";
import { TracingLegends } from "../tracing/components/TracingLegends";
import { TracingPointCard } from "../tracing/components/PointCard/TracingPointCard";

// Components Mobility
const MobilityMapControls = loadable(() => import("../../../components/Map/mobility/MobilityMapControls"));
const MobilityBelowControls = loadable(() => import("../mobility/components/MobilityBelowControls"));
const MobilityLegends = loadable(() => import("../mobility/components/MobilityLegends"));
const MobilityMobileAnalysisFormWrapper = loadable(() => import("../mobility/components/MobilityMobileAnalysisFormWrapper"));

// Components Both
const Button = loadable(() => import("../../../components/Button"));
const MobilePopupWrapper = loadable(() => import("./MobilePopupWrapper"));
const MapControls = loadable(() => import("../../../components/Map/MapControls"));

export const MobileBelowControls = (props: { path: string }) => {
  return (
    <MobileBelowControlsStyle>
      <SingleControlStyle>
        {props.path === "/mobility" ? (
          <>
            <span>People Mobility Analysis</span>
            <MobilityMobileAnalysisFormWrapper />
            <MobilityBelowControls isFromMobileBelowControls />
          </>
        ) : props.path === "/tracing" ? (
          <>
            <span>Individual Tracing Analysis</span>
            <TracingPointCard
              text={"Tracing Parameters"}
              isFromMobileBelowControls
            />
            <TracingBelowControls isFromMobileBelowControls />
          </>
        ) : null}
      </SingleControlStyle>

      <SingleControlStyle>
        <span>Map</span>
        <div>
          <MobilePopupWrapper
            title="Map Settings"
            trigger={
              <Button cta primary fullwidth>
                <span>Map Settings</span>
              </Button>
            }
          >
            <MapControls isFromMobileBelowControls>
              {props.path === "/mobility" ? (
                <MobilityMapControls />
              ) : props.path === "/tracing" ? (
                <TracingMapControls />
              ) : (
                ""
              )}
            </MapControls>
          </MobilePopupWrapper>

          <MobilePopupWrapper
            title="Map Legends"
            trigger={
              <Button cta primary fullwidth>
                <span>Map Legends</span>
              </Button>
            }
          >
            {props.path === "/mobility" ? (
              <MobilityLegends isFromMobileBelowControls />
            ) : props.path === "/tracing" ? (
              <TracingLegends isFromMobileBelowControls />
            ) : null}
          </MobilePopupWrapper>
        </div>
      </SingleControlStyle>
    </MobileBelowControlsStyle>
  );
};

const MobileBelowControlsStyle = styled.div`
  position: absolute;
  bottom: 9vh;
  padding: var(--px-xs);
  right: 0;
  border-radius: 10px;
  display: grid;
  gap: 0.5em;
  grid-template-columns: 1fr 0.4fr;
  width: 100%;

  > span {
    color: var(--color-blue);
    font-weight: 800;
    font-size: 1.2em;
    margin-bottom: 1em;
  }
`;

const SingleControlStyle = styled.div`
  box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
    0px 3px 5px rgba(176, 190, 197, 0.32);
  padding: var(--px-xs);
  background: white;
  border-radius: 10px;
  width: 100%;

  > span {
    color: var(--color-blue);
    font-weight: 800;
    font-size: 1em;
  }

  > div {
    display: grid;
    gap: 0.5em;
    margin-top: 0.5em;

    button {
      justify-content: center;
      padding: 1em 1em;
      span {
        font-weight: 100;
        font-size: clamp(0.8rem, 3vw, 1rem);
      }
    }
  }
`;

export default MobileBelowControls;