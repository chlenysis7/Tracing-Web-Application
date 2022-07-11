import loadable from "@loadable/component";

import "./MobilityPointCard.css";

// Images
import CheckIcon from "../../../../../images/ic-check.svg";
import ChevronLeft from "../../../../../images/ic-chevron-left.svg";
import CloseIcon from "../../../../../images/ic-close-btn.svg";

// Interfaces
import {
  IMobilityPathParams,
  IMobilityPointParams,
} from "../../../../../interfaces/mobilityInterfaces";
import { ISnackBarState } from "../../../../../interfaces/globalInterfaces";

// Redux
import { RootState } from "../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../../../../store/global/snackbar";
import { mobilityAnalysisParamsActions } from "../../../../../store/mobility/mobilityAnalysisParams";

const MobilityInputPopup = loadable(() => import("../InputPopup/MobilityInputPopup"));

export const MobilityPointCard = (props: {
  key: number;
  pointIndex: number;
  path: string;
  pathIndex: number;
  closable?: boolean;
  text: string;
  error?: boolean;
  isFromMobileBelowControls?: boolean;
}) => {
  // Start Handlers
  const dispatch = useDispatch();
  const setSnackbarState = (state: ISnackBarState) => {
    dispatch(snackbarActions.setAll(state));
  };

  const setAnalysisParams = (state: Array<IMobilityPathParams>) => {
    dispatch(mobilityAnalysisParamsActions.setAll(state));
  };
  const analysisParams = useSelector<RootState, Array<IMobilityPathParams>>(
    (state) => state.mobilityAnalysisParams
  );

  const pathParams: IMobilityPathParams = analysisParams[props.pathIndex];
  const pointParams: IMobilityPointParams = pathParams.points[props.pointIndex];

  /**
   * Delete a destination point card in a path at a specified index
   */
  const deleteDestinationPoint = () => {
    let newAnalysisParams = analysisParams;
    let newPoints = [...analysisParams[props.pathIndex].points];
    newPoints.slice();
    newPoints.splice(props.pointIndex, 1);
    let newPathParams = {
      ...analysisParams[props.pathIndex],
      points: newPoints,
    };
    newAnalysisParams = [
      ...analysisParams.slice(0, props.pathIndex),
      newPathParams,
      ...analysisParams.slice(props.pathIndex + 1),
    ];
    setAnalysisParams([...newAnalysisParams]);
    setSnackbarState({
      severity: "success",
      text:
        "Destination " +
        props.pointIndex +
        " in path " +
        (props.pathIndex + 1) +
        " deleted",
      isOpen: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      autoHideDuration: 2000,
    });
  };
  // End Handlers

  return (
    <div className={"destinationcard-parent"}>
      {props.closable ? (
        <img
          src={CloseIcon}
          alt="Delete icon"
          className="delete"
          onClick={() => deleteDestinationPoint()}
        />
      ) : (
        ""
      )}
      <MobilityInputPopup
        title={props.path + " - " + props.text}
        pointIndex={props.pointIndex}
        pathIndex={props.pathIndex}
        isFromMobileBelowControls={props.isFromMobileBelowControls}
      >
        <div
          className={
            "destinationcard " + (props.error ? "destinationcard-error" : "")
          }
        >
          <img
            width="24" height="24"
            className={pointParams.isCompleted ? "check completed" : "check"}
            src={CheckIcon}
            alt="Check icon"
          />
          <span>{props.text}</span>
          <img width="24" height="24" className="chevron" src={ChevronLeft} alt="Chevron icon" />
        </div>
      </MobilityInputPopup>
    </div>
  );
};

export default MobilityPointCard;