import styled from "styled-components";
import loadable from "@loadable/component";

// Images
import IcPlus from "../../../../../images/ic-plus.svg";
import CloseIcon from "../../../../../images/ic-close-btn.svg";

import "./MobilityPath.css";

// Redux
import { RootState } from "../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../../../../store/global/snackbar";
import { mobilityAnalysisParamsActions } from "../../../../../store/mobility/mobilityAnalysisParams";

// Enums & Interfaces
import {
  IMobilityPathParams,
  IMobilityPointParams,
  IMobilityValidationErrors,
} from "../../../../../interfaces/mobilityInterfaces";
import { ISnackBarState } from "../../../../../interfaces/globalInterfaces";
import { MobilityPathType } from "../../../../../enums";

// Components
const Button = loadable(() => import("../../../../../components/Button"));
const TitledCard = loadable(() => import("../../../../../components/TitledCard"));
const MobilityPointCard = loadable(() => import("../PointCard/MobilityPointCard"));

export const MobilityPath = (props: {
  index: number;
  title: string;
  initialPointParams: IMobilityPointParams;
  isFromMobileBelowControls?: boolean;
}) => {
  // Start handlers
  const dispatch = useDispatch();
  const setSnackbarState = (state: ISnackBarState) => {
    dispatch(snackbarActions.setAll(state));
  };

  const analysisParams = useSelector<RootState, Array<IMobilityPathParams>>(
    (state) => state.mobilityAnalysisParams
  );

  const pathParams: IMobilityPathParams = analysisParams[props.index];

  const currDestCount: number = pathParams.points.length;

  const setAnalysisParams = (state: Array<IMobilityPathParams>) => {
    dispatch(mobilityAnalysisParamsActions.setAll(state));
  };

  const setIsOneToOne = (value: MobilityPathType) => {
    dispatch(
      mobilityAnalysisParamsActions.setOneToOne({
        pathIndex: props.index,
        content: value,
      })
    );
  };

  const analysisFormValidation = useSelector<
    any,
    Array<IMobilityValidationErrors>
  >((state) => state.mobilityAnalysisFormValidation);

  const clickAddDestinationBtn = () => {
    let newPoints = pathParams.points.concat(props.initialPointParams);
    changePathParams({ ...pathParams, points: newPoints });
    setSnackbarState({
      severity: "success",
      text: "Destination " + currDestCount + " added",
      isOpen: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      autoHideDuration: 2000,
    });
  };

  /**
   * Set analysis parameters in a path
   * @param {IMobilityPathParams} newPathParams - JSON of new paremeters
   */
  const changePathParams = (newPathParams: IMobilityPathParams) => {
    let newAnalysisParams = [...analysisParams];
    newAnalysisParams[props.index] = newPathParams;
    setAnalysisParams([...newAnalysisParams]);
  };

  /**
   * Delete a path
   */
  const deletePath = () => {
    let newAnalysisParams = analysisParams;
    // newAnalysisParams.splice(props.index, 1);
    newAnalysisParams = [
      ...newAnalysisParams.slice(0, props.index),
      ...newAnalysisParams.slice(props.index + 1),
    ];
    setAnalysisParams([...newAnalysisParams]);
    setSnackbarState({
      severity: "success",
      text: "Path " + (props.index + 1) + " deleted",
      isOpen: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      autoHideDuration: 2000,
    });
  };
  // End handlers

  let errorArray = analysisFormValidation.filter((e) => e.path === props.index);

  const pointErrorArray = (i: number): Array<IMobilityValidationErrors> => {
    return analysisFormValidation.filter(
      (e) => e.path === props.index && e.point === i
    );
  };

  return (
    <TitledCard
      expandable
      title={props.title}
      className="form"
      error={errorArray.length > 0}
      errorMessage={
        errorArray && errorArray.length > 0
          ? errorArray[0].pathErrorMessage
          : ""
      }
    >
      {props.index !== 0 ? (
        <img
          src={CloseIcon}
          alt="Delete icon"
          className="delete-path"
          onClick={deletePath}
        />
      ) : (
        ""
      )}
      <ModeSwitch value={pathParams.type} change={setIsOneToOne} />
      {pathParams.points.map((pointParams, i) => {
        return (
          <MobilityPointCard
            error={pointErrorArray(i).length > 0}
            key={i}
            pointIndex={i}
            path={props.title}
            pathIndex={props.index}
            closable={i > 1 ? true : false}
            text={i === 0 ? "Origin" : "Destination " + i}
            isFromMobileBelowControls={props.isFromMobileBelowControls}
          />
        );
      })}
      <Button
        warning
        cta
        blacktext
        fullwidth
        disabled={currDestCount > 3}
        className="btn"
        onClick={clickAddDestinationBtn}
      >
        <img width="18" height="18" src={IcPlus} alt="Plus icon" />
        <span>Add Destination</span>
      </Button>
    </TitledCard>
  );
};

const ModeSwitch = ({
  value,
  change,
}: {
  value: MobilityPathType;
  change: (value: MobilityPathType) => void;
}) => {
  return (
    <ModeSwitchStyle>
      <Button
        fullwidth
        nobg={value === MobilityPathType.ONE_TO_ONE ? false : true}
        onClick={() => change(MobilityPathType.ONE_TO_ONE)}
      >
        One to one
      </Button>
      <Button
        fullwidth
        marginLeft
        nobg={value !== MobilityPathType.ONE_TO_ONE ? false : true}
        onClick={() => change(MobilityPathType.ONE_TO_MANY)}
      >
        One to many
      </Button>
    </ModeSwitchStyle>
  );
};

const ModeSwitchStyle = styled.div`
  width: 100%;
  padding: 0.5em 0.8em;
  justify-content: center;
  background: var(--color-blue);
  display: inline-flex;
  border-radius: 10px;
  margin-bottom: 1em;
  box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
    0px 3px 5px rgba(176, 190, 197, 0.32);

  button {
    justify-content: center;
  }
`;

export default MobilityPath;