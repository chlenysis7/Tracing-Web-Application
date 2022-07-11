import { useLocation } from "react-router-dom";
import loadable from "@loadable/component";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import styled from "styled-components";

// Components
const Navbar = loadable(() => import("../../components/Navbar"));
const Map = loadable(() => import("../../components/Map/Map"));

// Tracing & Mobility Parent Components
const IndividualTracing = loadable(() => import("./tracing/IndividualTracing"));
const PeopleMobility = loadable(() => import("./mobility/PeopleMobility"));

// Map Controls
const MapControls = loadable(() => import("../../components/Map/MapControls"));
const MobilityMapControls = loadable(
  () => import("../../components/Map/mobility/MobilityMapControls")
);
const TracingMapControls = loadable(
  () => import("../../components/Map/tracing/TracingMapControls")
);

// History List
// import { MobilityHistoryList } from "./mobility/components/History/MobilityHistoryList";
// import { TracingHistoryList } from "./tracing/components/ListHistory/TracingHistoryList";

// Legends
const MobilityLegends = loadable(
  () => import("./mobility/components/MobilityLegends")
);
const TracingLegends = loadable(
  () => import("./tracing/components/TracingLegends")
);

// Mobile Only Controls
const MobileBelowControls = loadable(
  () => import("./components/MobileBelowControls")
);

// Analysis Result
const AnalysisResult = loadable(() => import("./result/AnalysisResult"));
const TracingResult = loadable(() => import("./result/TracingResult"));
const MobilityResult = loadable(() => import("./result/MobilityResult"));

export const Main = () => {
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useSelector<RootState, boolean>((state) => state.isMobile);

  return (
    <div>
      {/* History Popup
      <TracingHistoryList />
      <MobilityHistoryList /> */}

      {/* Map */}
      <Map path={path} />

      <AppStyle>
        {/* Navigation Bar */}
        <Navbar path={path} />

        {/* Analysis Form */}
        {path === "/tracing" && !isMobile ? (
          <IndividualTracing />
        ) : path === "/mobility" && !isMobile ? (
          <PeopleMobility isFromMobileBelowControls={false} />
        ) : null}

        {/* Analysis Result */}
        <AnalysisResult>
          {path === "/tracing" ? (
            <TracingResult />
          ) : path === "/mobility" ? (
            <MobilityResult />
          ) : null}
        </AnalysisResult>

        {/* Legends */}
        {path === "/tracing" && !isMobile ? (
          <TracingLegends isFromMobileBelowControls={false} />
        ) : path === "/mobility" && !isMobile ? (
          <MobilityLegends isFromMobileBelowControls={false} />
        ) : null}

        {/* Map Controls */}
        {!isMobile ? (
          <MapControls>
            {path === "/mobility" ? (
              <MobilityMapControls />
            ) : path === "/tracing" ? (
              <TracingMapControls />
            ) : (
              ""
            )}
          </MapControls>
        ) : (
          ""
        )}

        {/* MOBILE: Below Controls */}
        {isMobile ? <MobileBelowControls path={path} /> : null}
      </AppStyle>
    </div>
  );
};

const AppStyle = styled.div`
  padding: var(--px-xs);
  width: 100vw;
  overflow: scroll;
`;
