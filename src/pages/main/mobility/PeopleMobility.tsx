import { useEffect, useState } from "react";
import styled from "styled-components";
import loadable from "@loadable/component";

// Images
import IcPlus from "../../../images/ic-plus.svg";

// Other Resources
import { mobilityInitialPointParams } from "../../../resources";

// Enums & Interfaces
import { MobilityPathType } from "../../../enums";
import { IMobilityPathParams } from "../../../interfaces/mobilityInterfaces";
import { ISnackBarState } from "../../../interfaces/globalInterfaces";

// Redux
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../../store/global/snackbar";
import { mobilityAnalysisParamsActions } from "../../../store/mobility/mobilityAnalysisParams";
import { mobilityAnalyzeFormExpandedActions } from "../../../store/mobility/mobilityAnalyzeFormExpanded";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { mobilityIsUsingUserLocationActions } from "../../../store/mobility/mobilityIsUsingUserLocation";

// Global Components
const Button = loadable(() => import("../../../components/Button"));
const TitledCard = loadable(() => import("../../../components/TitledCard"));

// Mobility-specific Components
const MobilityPath = loadable(() => import("./components/Path/MobilityPath"));
const MobilityBelowControls = loadable(() => import("./components/MobilityBelowControls"));

export const PeopleMobility = (props: {
  isFromMobileBelowControls?: boolean;
}) => {
  const initialPathParams: IMobilityPathParams = {
    type: MobilityPathType.ONE_TO_ONE,
    points: [mobilityInitialPointParams(), mobilityInitialPointParams()],
  };

  // Start Handlers
  const dispatch = useDispatch();

  const setSnackbarState = (state: ISnackBarState) => {
    dispatch(snackbarActions.setAll(state));
  };

  const analysisParams = useSelector<RootState, Array<IMobilityPathParams>>(
    (state) => state.mobilityAnalysisParams
  );
  const setAnalysisParams = (state: Array<IMobilityPathParams>) => {
    dispatch(mobilityAnalysisParamsActions.setAll(state));
  };

  const isAnalyzeFormExpanded = useSelector<RootState, boolean>(
    (state) => state.mobilityAnalyzeFormExpanded
  );
  const setAnalyzeFormExpanded = (state: boolean) => {
    dispatch(mobilityAnalyzeFormExpandedActions.setAll(state));
  };

  const currPathCount = analysisParams.length;

  const clickAddPathBtn = () => {
    setAnalysisParams([...analysisParams, initialPathParams]);
    setSnackbarState({
      severity: "success",
      text: "Path " + (currPathCount + 1) + " added",
      isOpen: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      autoHideDuration: 2000,
    });
  };

  // ENABLE LOCATION DIALOG
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  const mobilityIsUsingUserLocation = useSelector<RootState, boolean | null>(
    (state) => state.mobilityIsUsingUserLocation
  );

  const handleCloseAgree = () => {
    dispatch(mobilityIsUsingUserLocationActions.setAll(true));
    setLocationDialogOpen(false);

    setSnackbarState({
      severity: "success",
      text: "You can fill analysis parameters using your location",
      isOpen: true,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      autoHideDuration: 2000,
    });
  };

  const handleCloseDisagree = () => {
    dispatch(mobilityIsUsingUserLocationActions.setAll(false));
    setLocationDialogOpen(false);
  };

  useEffect(() => {
    setLocationDialogOpen(true);
  }, []);
  // END ENABLE LOCATION DIALOG

  // End Handlers

  if (!props.isFromMobileBelowControls)
    return (
      <div>
        {mobilityIsUsingUserLocation === null ? (
          <Dialog
            open={locationDialogOpen}
            onClose={handleCloseDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Enable location permission"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your location only will be used to make your analysis experience
                better. If you let this app to access your location, you will be
                able to fill analysis parameters using your location.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button blacktext onClick={handleCloseDisagree}>
                Disagree
              </Button>
              <Button primary onClick={handleCloseAgree}>Agree</Button>
            </DialogActions>
          </Dialog>
        ) : (
          ""
        )}
        {/* Section: Analyze Form */}
        <AnalyzeFormStyle analyzeFormExpanded={isAnalyzeFormExpanded}>
          <TitledCard
            expandable
            title="People Mobility Analysis"
            className="analyze-form"
            isExpanded={isAnalyzeFormExpanded}
            setIsExpanded={setAnalyzeFormExpanded}
          >
            {analysisParams.map((_pathParams, i) => (
              <MobilityPath
                title={"Path " + (i + 1)}
                key={i}
                index={i}
                isFromMobileBelowControls={props.isFromMobileBelowControls}
                initialPointParams={mobilityInitialPointParams()}
              />
            ))}
            <Button
              warning
              cta
              blacktext
              className="add-path"
              disabled={currPathCount > 2}
              onClick={clickAddPathBtn}
            >
              <img src={IcPlus} alt="Plus icon" />
              <span>Add Path</span>
            </Button>
            <MobilityBelowControls />
          </TitledCard>
        </AnalyzeFormStyle>
        {/* EndSection: Analyze Form */}
      </div>
    );
  else
    return (
      <AnalyzeFormMobileStyle>
        {mobilityIsUsingUserLocation === null ? (
          <Dialog
            open={locationDialogOpen}
            onClose={handleCloseDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Enable location permission"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your location only will be used to make your analysis experience
                better. If you let this app to access your location, you will be
                able to fill analysis parameters using your location.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button blacktext onClick={handleCloseDisagree}>
                Disagree
              </Button>
              <Button primary onClick={handleCloseAgree}>Agree</Button>
            </DialogActions>
          </Dialog>
        ) : (
          ""
        )}
        {analysisParams.map((_pathParams, i) => (
          <MobilityPath
            title={"Path " + (i + 1)}
            key={i}
            index={i}
            initialPointParams={mobilityInitialPointParams()}
            isFromMobileBelowControls={props.isFromMobileBelowControls}
          />
        ))}
        <Button
          warning
          cta
          blacktext
          className="add-path"
          disabled={currPathCount > 2}
          onClick={clickAddPathBtn}
        >
          <img width="18" height="18" src={IcPlus} alt="Plus icon" />
          <span>Add Path</span>
        </Button>
      </AnalyzeFormMobileStyle>
    );
};

const AnalyzeFormStyle = styled.div`
  position: absolute;
  top: 6em;
  bottom: ${(props: { analyzeFormExpanded: boolean }) =>
    props.analyzeFormExpanded === false ? "unset" : "12vh"};
  display: inline-flex;

  .analyze-form {
    margin-bottom: 0;
    max-height: 100%;
    > :not(:first-child) {
      padding: 1em;
    }
    width: 24rem;

    > .content {
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      position: absolute;
      left: 0;
      top: 3.5em;
      right: 0;
      bottom: 0;

      ::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .form {
    width: 100%;
    .content {
      padding: 1em;
    }
  }

  .btn,
  .add-path {
    position: relative;
    margin: 0 auto;
    justify-content: center;
    margin-top: 1em;
    img {
      margin-right: 1em;
    }
  }

  @media screen and (max-width: 892px) {
    padding-top: 1em;
    .analyze-form > .content {
      top: 4.5em;
    }
  }

  @media screen and (max-width: 768px) {
    padding-top: 0;
    top: 7.5em;
    .analyze-form > .content {
      top: 3.5em;
    }
  }

  @media only screen and (max-width: 516px) {
    top: 8.5em;
  }
`;

const AnalyzeFormMobileStyle = styled.div`
  overflow: scroll;
  max-height: 50vh;
  box-sizing: border-box;
  margin-bottom: 1em;
  background-color: white;
  padding: var(--px-m);
  .btn-ok {
    margin-top: 1em;
  }

  .analyze-form {
    margin-bottom: 0;
    max-height: 100%;
    > :not(:first-child) {
      padding: 1em;
    }
    width: 24rem;

    > .content {
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      position: absolute;
      left: 0;
      top: 3.5em;
      right: 0;
      bottom: 0;

      ::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .form {
    width: 100%;
    .content {
      padding: 1em;
    }
  }

  .btn,
  .add-path {
    position: relative;
    margin: 0 auto;
    justify-content: center;
    margin-top: 1em;
    img {
      margin-right: 1em;
    }
  }

  .title {
    display: grid !important;
  }
`;

export default PeopleMobility