import styled from "styled-components";
import Popup from "reactjs-popup";

// Components
import { TitledCard } from "../../../../../components/TitledCard";
import { MobilityHistoryItem } from "./MobilityHistoryItem";

import {
  IMobilityAnalysisResponse,
  IMobilityPathParams,
} from "../../../../../interfaces/mobilityInterfaces";

import "./MobilityHistoryList.css";

// Redux
import { RootState } from "../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { mobilityAnalysisParamsActions } from "../../../../../store/mobility/mobilityAnalysisParams";
import { mobilityHistoryPopUpOpenStateActions } from "../../../../../store/mobility/mobilityHistoryPopupOpen";

export const MobilityHistoryList = () => {
  // Start Handlers
  const dispatch = useDispatch();

  const setAnalysisParams = (state: Array<IMobilityPathParams>) => {
    dispatch(mobilityAnalysisParamsActions.setAll(state));
  };

  const historyState = useSelector<RootState, Array<IMobilityAnalysisResponse>>(
    (state) => state.mobilityHistoryState
  );

  const historyPopUpOpenState = useSelector<RootState, boolean>(
    (state) => state.mobilityHistoryPopUpOpen
  );
  const setHistoryPopUpOpenState = (state: boolean) => {
    dispatch(mobilityHistoryPopUpOpenStateActions.setAll(state));
  };

  const handleHistoryItemClick = (index: number) => {
    setAnalysisParams(historyState[index].params);
  };
  // End Handlers

  return (
    <Popup
      modal
      open={historyPopUpOpenState}
      onClose={() => setHistoryPopUpOpenState(false)}
    >
      <TitledCard
        className="mobility-history-popup"
        closable
        close={() => setHistoryPopUpOpenState(false)}
        title="History"
        subtitle={"Click search button to edit and re-analyze"}
      >
        <PopupContentStyle>
          {historyState.map((singleHistory, i) => (
            <MobilityHistoryItem
              key={i}
              singleHistory={singleHistory}
              handleClick={() => {
                handleHistoryItemClick(i);
                setHistoryPopUpOpenState(false);
              }}
            />
          ))}
        </PopupContentStyle>
      </TitledCard>
    </Popup>
  );
};

const PopupContentStyle = styled.div`
  padding: var(--px-l);
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-height: 100%;

  .mb {
    margin-bottom: var(--px-l);
  }
  .full-width {
    width: 100%;
  }
`;
