import React from "react";
import styled from "styled-components";
import { Button } from "../../../../components/Button";

// Icon Resources
import IcSearch from "../../../../images/ic-search.svg";
import IcHistory from "../../../../images/ic-clock-history.svg";
import IcTrash from "../../../../images/ic-trash.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { tracingAnalysisParamsActions } from "../../../../store/tracing/tracingAnalysisParams";
import { tracingHistoryPopUpOpenStateActions } from "../../../../store/tracing/tracingHistoryPopupOpen";
import { getTracingResult } from "../../../../store/tracing/tracingAnalysisResult";
import { resources } from "../../../../resources";
import { snackbarActions } from "../../../../store/global/snackbar";
import { Log } from "../../../../helpers/common";

export const TracingBelowControls = (props) => {

  const dispatch = useDispatch();

  const setAnalysisParams = (state) => {
    dispatch(tracingAnalysisParamsActions.setAll(state));
  };

  const analysisParams = useSelector(
    (state) => state.tracingAnalysisParams
  );

  const setTracingHistoryPopupOpen = (state) => {
    dispatch(tracingHistoryPopUpOpenStateActions.setAll(state));
  };

  /**
   * Handler for reset button click
   */
  const handleResetBtn = () => {
    // TODO: Add alert before resetting params
    setAnalysisParams(resources.tracingInitialParams);
  };

  /**
   * Handler for history button click
   */
  // const handleHistoryBtn = () => {
  //   setTracingHistoryPopupOpen(true);
  // };

  /**
   * Handler for search button click
   */
  const handleSearchBtn = () => {
    Log(analysisParams)
    if (analysisParams.hashNumber === "") {
      setSnackbarState(defaultSnackBarError);
      return;
    }
    if (analysisParams.date === null) {
      setSnackbarState({
        ...defaultSnackBarError,
        text: "Please fill date",
      });
      return;
    }
    if (analysisParams.lowerLimit === "") {
      setSnackbarState({
        ...defaultSnackBarError,
        text: "Please fill lower limit",
      });
      return;
    }
    if (analysisParams.upperLimit === "") {
      setSnackbarState({
        ...defaultSnackBarError,
        text: "Please fill upper limit",
      });
      return;
    }
    if (
      analysisParams.lowerLimit > analysisParams.upperLimit ||
      analysisParams.lowerLimit === analysisParams.upperLimit
    ){
      setSnackbarState({
        ...defaultSnackBarError,
        text: "Lower limit should less than upper limit",
      });
      return;
    }
  
    dispatch(getTracingResult());

    // TODO: Call API Analyze (success)
  };

  const setSnackbarState = (state) => {
    dispatch(snackbarActions.setAll(state));
  };

  // Error search form
  const defaultSnackBarError = {
    severity: "error",
    text: "Please fill hash number",
    isOpen: true,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
    autoHideDuration: 1000,
  };

  if (!props.isFromMobileBelowControls)
  return (
    <BelowControlsStyle>
      <Button primary cta fullwidth onClick={handleSearchBtn}>
        <img src={IcSearch} alt="Search icon" />
        <span>Search</span>
      </Button>
      <div className="reset-history">
        <Button danger cta fullwidth onClick={handleResetBtn}>
          <img src={IcTrash} alt="Trash icon" />
          <span>Reset</span>
        </Button>
        {/* <Button green cta onClick={handleHistoryBtn}>
          <img src={IcHistory} alt="History icon" />
          <span>History</span>
        </Button> */}
      </div>
    </BelowControlsStyle>
  );
  else
  return (
    <MobileBelowControlsStyle>
        <div>
          <Button danger cta onClick={handleResetBtn}>
            <img src={IcTrash} alt="Trash icon" />
          </Button>
          {/* <Button green cta onClick={handleHistoryBtn}>
            <img src={IcHistory} alt="History icon" />
          </Button> */}
          <Button primary cta onClick={handleSearchBtn}>
            <img src={IcSearch} alt="Search icon" />
            <span>Search</span>
          </Button>
        </div>
      </MobileBelowControlsStyle>
  );
};

const BelowControlsStyle = styled.div`
  padding: 0.1em 1em 1em 1em;
  background: white;
  box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
    0px 3px 5px rgba(176, 190, 197, 0.32);
  border-radius: 10px;
  margin-top: 2em;

  > div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1em;
  }

  button {
    justify-content: center;
    margin-top: 1em;
    img {
      margin-right: 1em;
    }
  }
`;

const MobileBelowControlsStyle = styled.div`
  > div {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.5em;
  }

  button {
    justify-content: center;
    padding: 0.8em 0em;
    img{
      margin-right: 0;
    }
    span {
      font-weight: 400;
      margin-left: 0.2em;
    }
  }
`;
