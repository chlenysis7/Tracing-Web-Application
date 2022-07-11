import { IndividualTracing } from "../../IndividualTracing";
import { MobilePopupWrapper } from "../../../components/MobilePopupWrapper";

import "./TracingPointCard.css";

// Images
import CheckIcon from "../../../../../images/ic-check.svg";
import ChevronLeft from "../../../../../images/ic-chevron-left.svg";

import { useSelector } from "react-redux";

export const TracingPointCard = (props) => {


    const analysisParams = useSelector(
      (state) => state.tracingAnalysisParams
    );

    return (
      <div className="destinationcard-parent mobile-controls">
        <MobilePopupWrapper
        title="Tracing Number"
        subtitle="Fill all required parameters"
        isFromMobileBelowControls
        trigger={
          <div className="destinationcard">
            <img
              className={
                analysisParams.isCompleted ? "check completed" : "check"
              }
              src={CheckIcon}
              alt="Check icon"
            />
            <span>{props.text}</span>
            <img className="chevron" src={ChevronLeft} alt="Chevron icon" />
          </div>
        }
      >
        <IndividualTracing isFromMobileBelowControls/>
      </MobilePopupWrapper>
     </div> 
    );
};
