import { forwardRef, ReactElement, Ref } from "react";
import loadable from "@loadable/component";

import { RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { mobilityMobileAnalysisFormOpenActions } from "../../../../store/mobility/mobilityMobileAnalysisFormOpen";

import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import CheckIcon from "../../../../images/ic-check.svg";
import ChevronLeft from "../../../../images/ic-chevron-left.svg";

const PeopleMobility = loadable(() => import("../PeopleMobility"));
const TitledCard = loadable(() => import("../../../../components/TitledCard"));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MobilityMobileAnalysisFormWrapper = () => {
  const dispatch = useDispatch();

  const setOpenState = (state: boolean) => {
    dispatch(mobilityMobileAnalysisFormOpenActions.setAll(state));
  };

  const openState: boolean = useSelector<RootState, boolean>(
    (state) => state.mobilityMobileAnalysisFormOpen
  );

  // const analysisParams = useSelector<RootState, Array<IMobilityPathParams>>(
  //   (state) => state.mobilityAnalysisParams
  // );

  const handleClose = () => {
    // Add validation for green check icon
    setOpenState(false);
  };

  return (
    <div className="destinationcard-parent mobile-controls">
      <div className="destinationcard" onClick={() => setOpenState(true)}>
        <img className={"check"} src={CheckIcon} alt="Check icon" />
        <span>{"Analysis Parameters"}</span>
        <img width="24" height="24" className="chevron" src={ChevronLeft} alt="Chevron icon" />
      </div>
      <Dialog fullScreen open={openState} TransitionComponent={Transition}>
        <TitledCard
          className="modal-mobile-mobility"
          closable
          close={handleClose}
          title={"People Mobility Analysis"}
          subtitle={"Fill all required parameters"}
        >
          <PeopleMobility isFromMobileBelowControls />
        </TitledCard>
      </Dialog>
    </div>
  );
};

export default MobilityMobileAnalysisFormWrapper;