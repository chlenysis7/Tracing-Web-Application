import loadable from "@loadable/component";
import styled from "styled-components";
import { SyntheticEvent, useState } from "react";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { IMobilityAnalysisResponse } from "../../../interfaces/mobilityInterfaces";
import { ApiCallStatus } from "../../../enums";

import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { getMobilityResult } from "../../../store/mobility/mobilityAnalysisResult";

import { generateReadableDate } from "../../../helpers/common";

const Button = loadable(() => import("../../../components/Button"));

const columns: GridColDef[] = [
  { field: "count", headerName: "Count", width: 100 },
  { field: "origin_name", headerName: "Origin Location", width: 400 },
  {
    field: "origin_startDateTime",
    headerName: "Origin Start Time",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${generateReadableDate(params.row.origin_startDateTime)}`,
  },
  {
    field: "origin_endDateTime",
    headerName: "Origin End Time",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${generateReadableDate(params.row.origin_endDateTime)}`,
  },
  { field: "destination_name", headerName: "Destination Location", width: 400 },
  {
    field: "destination_startDateTime",
    headerName: "Destination Start Time",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${generateReadableDate(params.row.destination_startDateTime)}`,
  },
  {
    field: "destination_endDateTime",
    headerName: "Destination End Time",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${generateReadableDate(params.row.destination_endDateTime)}`,
  },
];

// const scrollToHash = (id: string) => {
//   if (id) {
//     /* Find matching element by id */
//     const anchor = document.getElementById(id);

//     if (anchor) {
//       /* Scroll to that element if present */
//       anchor.scrollIntoView();
//     }
//   }
// };

export const MobilityResult = () => {
  const dispatch = useDispatch();
  const response = useSelector<
    RootState,
    IMobilityAnalysisResponse | undefined
  >((state) => state.mobilityAnalysisResult.result);

  const errorMsg: string = useSelector<RootState, string>(
    (state) => state.mobilityAnalysisResult.errorMsg!
  );

  const status: ApiCallStatus = useSelector<RootState, ApiCallStatus>(
    (state) => state.mobilityAnalysisResult.status
  );

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange: (event: SyntheticEvent, value: any) => void = (
    event,
    newValue
  ) => {
    setTabValue(newValue);
  };

  if (response !== undefined) {
    return (
      <MobilityResultStyle>
        {status === ApiCallStatus.LOADING ? (
          <ProgressStyle>
            <div>
              <span style={{ width: "100%" }} />
            </div>
            <p>Fetching new analysis result...</p>
          </ProgressStyle>
        ) : status === ApiCallStatus.FAILED_GENERAL ? (
          <ErrorStyle>
            <p>New analysis result request failed</p>
            <p className="bold">{errorMsg}</p>
            <Button primary onClick={() => dispatch(getMobilityResult())}>
              Try again
            </Button>
          </ErrorStyle>
        ) : (
          ""
        )}
        <Tabs
          className="tabs"
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          aria-label="Path tabs"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          {response.analysisResult.map((_, i) => (
            <Tab label={"Path " + (i + 1)} key={i} />
          ))}
        </Tabs>

        <MobilityResultTableStyle>
          <DataGrid
            rows={response.analysisResult[tabValue].timeAtLocation}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
          />
        </MobilityResultTableStyle>
      </MobilityResultStyle>
    );
  } else if (status === "loading" && response === undefined) {
    return (
      <MobilityResultStyle>
        <ProgressStyle>
          <div>
            <span style={{ width: "100%" }} />
          </div>
          <p>Please wait</p>
        </ProgressStyle>
        {/* TODO: Add graphs, full data */}
      </MobilityResultStyle>
    );
  } else if (
    status === ApiCallStatus.FAILED_GENERAL &&
    response === undefined
  ) {
    return (
      <MobilityResultStyle>
        <ErrorStyle>
          <p className="bold">{errorMsg}</p>
          <Button primary onClick={() => dispatch(getMobilityResult())}>
            Try again
          </Button>
        </ErrorStyle>
      </MobilityResultStyle>
    );
  } else if (status === ApiCallStatus.IDLE && response === undefined)
    return (
      <MobilityResultNoSearchStyle>
        <h3>You haven&apos;t done any analysis yet</h3>
        <h4>
          <b>Fill</b> required parameters, then click <b>search</b> button
        </h4>
      </MobilityResultNoSearchStyle>
    );
  else return <MobilityResultNoSearchStyle></MobilityResultNoSearchStyle>;
};

const ErrorStyle = styled.div`
  display: grid;
  text-align: center;
  justify-content: center;
  > p {
    color: #666666;
    margin-top: 1em;
  }
  .bold {
    font-weight: bold;
  }
  > button {
    margin-top: 1em;
    margin-bottom: 1em;
    width: 10em;
    flex-flow: column;
    justify-self: center;
    height: 3em;
    font-size: 1.2em;
    justify-content: center;
  }
`;
const ProgressStyle = styled.div`
  margin-bottom: 1em;

  div {
    width: 100%;
    height: 6px;
    background: #fff;
    overflow: hidden;
  }

  div > span {
    display: block;
    height: 100%;
    background: linear-gradient(
      90deg,
      #0d6efdff,
      #0d6efd88 17%,
      #0d6efd88 34%,
      #0d6efdff 51%,
      #0d6efdff 68%,
      #0d6efd88 85%,
      #0d6efd88
    );
    background-size: 300% 100%;
    animation: progress-animation 1s linear infinite;
  }

  @keyframes progress-animation {
    0% {
      background-position: 100%;
    }
    100% {
      background-position: 0;
    }
  }

  p {
    text-align: center;
    font-weight: bold;
    color: #666666;
    margin-top: 0.5em;
  }
`;

const MobilityResultStyle = styled.div`
  width: 100%;
  .tabs {
    border: 1px solid rgba(224, 224, 224, 1);
    border-radius: 5px;
    margin-bottom: 0.5em;
  }
`;

const MobilityResultNoSearchStyle = styled.div`
  width: 100%;
  text-align: center;
  margin: 1em 0;
  h3 {
    color: var(--color-red);
  }
  h4 {
    font-size: 0.83em;
    margin-top: 0.5em;
    font-weight: 400;
  }
`;

const MobilityResultTableStyle = styled.div`
  height: 300px;
  width: 100%;
  -webkit-touch-callout: text;
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

export default MobilityResult;