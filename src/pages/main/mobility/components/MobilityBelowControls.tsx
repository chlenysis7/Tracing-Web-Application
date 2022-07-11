import styled from "styled-components";
import { Button } from "../../../../components/Button";

// Enums & Interfaces
import {
  IMobilityPathParams,
  IMobilityValidationErrors,
} from "../../../../interfaces/mobilityInterfaces";
import { ISnackBarState } from "../../../../interfaces/globalInterfaces";
import { MobilityPathType } from "../../../../enums";

// Icon Resources
import IcSearch from "../../../../images/ic-search.svg";
// import IcHistory from "../../../../images/ic-clock-history.svg";
import IcTrash from "../../../../images/ic-trash.svg";

// Resources
import { mobilityInitialPointParams } from "../../../../resources";

// Redux
import { RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { mobilityAnalysisParamsActions } from "../../../../store/mobility/mobilityAnalysisParams";
// import { mobilityHistoryPopUpOpenStateActions } from "../../../../store/mobility/mobilityHistoryPopupOpen";
import { getMobilityResult } from "../../../../store/mobility/mobilityAnalysisResult";
import { mobilityAnalysisFormValidationActions } from "../../../../store/mobility/mobilityAnalysisFormValidation";
import { snackbarActions } from "../../../../store/global/snackbar";

// Helpers
import { validateAnalysisForm } from "../../../../helpers/mobility";
import { Log } from "../../../../helpers/common";

export const MobilityBelowControls = (props: {
  isFromMobileBelowControls?: boolean;
}) => {
  const initialPathParams: IMobilityPathParams = {
    type: MobilityPathType.ONE_TO_ONE,
    points: [mobilityInitialPointParams(), mobilityInitialPointParams()],
  };

  const dispatch = useDispatch();

  const setSnackbarState = (state: ISnackBarState) => {
    dispatch(snackbarActions.setAll(state));
  };

  const setAnalysisParams = (state: Array<IMobilityPathParams>) => {
    dispatch(mobilityAnalysisParamsActions.setAll(state));
  };

  // const setMobilityHistoryPopupOpen = (state: boolean) => {
  //   dispatch(mobilityHistoryPopUpOpenStateActions.setAll(state));
  // };

  const setAnalysisFormValidation = (
    state: Array<IMobilityValidationErrors>
  ) => {
    dispatch(mobilityAnalysisFormValidationActions.setAll(state));
  };

  const analysisParams = useSelector<RootState, Array<IMobilityPathParams>>(
    (state) => state.mobilityAnalysisParams
  );

  /**
   * Handler for reset button click
   */
  const handleResetBtn = () => {
    // TODO: Add alert before resetting params
    setAnalysisFormValidation([]);
    setAnalysisParams([initialPathParams]);
  };

  /**
   * Handler for history button click
   */
  // const handleHistoryBtn = () => {
  //   setMobilityHistoryPopupOpen(true);
  // };

  /**
   * Handler for analyze button click
   */
  const handleSearchBtn = () => {
    let errorList = validateAnalysisForm(analysisParams);
    setAnalysisFormValidation(errorList);
    Log(
      "%c MOBILITY VALIDATION RESULT ",
      "color:green; background-color: white"
    );
    Log(errorList);
    if (errorList.length === 0) dispatch(getMobilityResult());
    else setSnackbarState({
      severity: "error",
      text: "Please fill all required parameters",
      isOpen: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      autoHideDuration: 2000,
    });
    // dispatch(getMobilityResult()); // Uncomment if you want to disable validation before hitting API
  };

  if (!props.isFromMobileBelowControls)
    return (
      <BelowControlsStyle>
        <Button primary cta fullwidth onClick={handleSearchBtn}>
          <img width="18" height="18" src={IcSearch} alt="Search icon" />
          <span>Search</span>
        </Button>
        <div className="reset-history">
          <Button danger cta onClick={handleResetBtn} fullwidth>
            <img width="18" height="18" src={IcTrash} alt="Trash icon" />
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
    img {
      margin-right: 0;
    }
    span {
      font-weight: 400;
      margin-left: 0.2em;
    }
  }
`;

export default MobilityBelowControls;