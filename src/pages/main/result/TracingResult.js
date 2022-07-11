import styled from "styled-components";

import { DataGrid } from "@mui/x-data-grid";
import { generateReadableDate } from "../../../helpers/common";
import { useSelector, useDispatch } from "react-redux";
import { ApiCallStatus } from "../../../enums";
import { getTracingResult } from "../../../store/tracing/tracingAnalysisResult";
import { Button } from "../../../components/Button";


const columns = [
  { field: "start_time", 
    headerName: "Start Time", 
    width: 200,
    valueGetter: (params) =>
      `${generateReadableDate(params.row.start_time)}`, 
  },
  {
    field: "end_time",
    headerName: "End Time",
    width: 200,
    valueGetter: (params) =>
      `${generateReadableDate(params.row.end_time)}`,
  },
  { 
    field: "point_sequence", 
    headerName: "Sequence", 
    width: 200,
  },
  { 
    field: "hash_number", 
    headerName: "Hash Number", 
    width: 200,
  },
  { 
    field: "surrounding_number", 
    headerName: "Surrounding Number", 
    width: 200,
  },
  { 
    field: "surrounding_class", 
    headerName: "Surrounding Class", 
    width: 200,
  },
];

export const TracingResult = () => {

  const dispatch = useDispatch();

  const response = useSelector((state) => state.tracingAnalysisResult.result);

  const status = useSelector((state) => state.tracingAnalysisResult.status);

  const errorMsg = useSelector((state) => state.tracingAnalysisResult.errorMsg);

  if (response !== undefined){
    return (
      <TracingResultStyle>
      {status === ApiCallStatus.LOADING?(
          <ProgressStyle>
            <div>
            <span style={{ width: "100%" }} />
            </div>
            <p>Fetching new analysis result...</p>
          </ProgressStyle>
      ): status === ApiCallStatus.FAILED_GENERAL ?(
        <ErrorStyle>
            <p>New analysis result request failed</p>
            <p className="bold">{errorMsg}</p>
            <Button primary onClick={() => dispatch(getTracingResult())}>
              Try again
            </Button>
          </ErrorStyle>
      ): (
        ""
      )}
     <TracingResultTableStyle >
       <DataGrid
            rows={response.analysisResult}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            id="emp-table"
          />
      </TracingResultTableStyle>
      </TracingResultStyle>
    );
  } else if(status === "loading" && response === undefined) {
    return(
    <TracingResultStyle>
      <ProgressStyle>
          <div>
            <span style={{ width: "100%" }} />
          </div>
          <p>Please wait</p>
        </ProgressStyle>
        </TracingResultStyle>
    );
  } else if (
    status === ApiCallStatus.FAILED_GENERAL &&
    response === undefined
  ){
    return(
    <TracingResultStyle>
    <ErrorStyle>
      <p className="bold">{errorMsg}</p>
      <Button primary onClick={() => dispatch(getTracingResult())}>
        Try again
      </Button>
    </ErrorStyle>
  </TracingResultStyle>
    );
  } else if (
    status === ApiCallStatus.IDLE && 
    response === undefined)
    return (
      <TracingResultNoSearchStyle>
          <h3>You haven&apos;t done any analysis yet</h3>
          <h5><b>Fill</b> required parameters, then click <b>search</b> button</h5>
      </TracingResultNoSearchStyle>
    );  
    else return <TracingResultNoSearchStyle></TracingResultNoSearchStyle>
};

const TracingResultTableStyle = styled.div`
  height: 400px;
  width: 100%;
  -webkit-touch-callout: text;
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const TracingResultStyle = styled.div`
  width: 100%;
  .tabs {
    border: 1px solid rgba(224, 224, 224, 1);
    border-radius: 5px;
    margin-bottom: 0.5em;
  }
`;

const TracingResultNoSearchStyle = styled.div`
  width: 100%;
  text-align: center;
  margin: 1em 0;
  h3 {
    color: var(--color-red);
  }
  h5 {
    margin-top: 0.5em;
    font-weight: 400;
    color: var(--color-black);
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

// const ButtonStyle = styled.div`
//   button {
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     background: var(--color-green-darker);
//     border-radius: var(--px-xs, 10px);
//     padding: ${(props) => (props.cta ? "1em 2em" : "0.6em 2em")};
//     margin-bottom: 20px;
//     color: ${(props) => (props.blacktext ? "black" : "white")};
//     font-weight: 600;
//     font-size: 16px;
//     transition: 100ms ease-in;
//     border: none;
//     margin-left: ${(props) => (props.marginLeft ? "5px" : "0")};
//     width: ${(props) => (props.fullwidth ? "100%" : "")};

//     :hover {
//       background: ${(props) =>
//         props.nobg ? "#FD7E14AA" : "var(--color-orange)"};
//     }
//   }
// `;

export default TracingResult;