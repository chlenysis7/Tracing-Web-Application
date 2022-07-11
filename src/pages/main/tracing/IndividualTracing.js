import styled from "styled-components";

// Global Components
import { TitledCard } from "../../../components/TitledCard";

// Individual-Tracing Specific Components
import { TracingForm } from "./components/TracingForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TracingBelowControls } from "./components/TracingBelowControls";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { tracingAnalysisParamsActions } from "../../../store/tracing/tracingAnalysisParams";
import { tracingSearchFormExpandedActions } from "../../../store/tracing/tracingSearchFormExpanded";

export const IndividualTracing = (props) => {
  // Start Handlers
  const dispatch = useDispatch();

  const analysisParams = useSelector((state) => state.tracingAnalysisParams);
  const isSearchFormExpanded = useSelector(
    (state) => state.tracingSearchFormExpanded
  );
  const setSearchFormExpanded = (state) => {
    dispatch(tracingSearchFormExpandedActions.setAll(state));
  };
  const changeDataHandler = (state) => {
    dispatch(tracingAnalysisParamsActions.setAll(state));
  };

  const onDatePickerChange = (date) => {
    changeDataHandler({
      ...analysisParams,
      date: date,
    });
  };

  const onHashNoChange = (hashNo) => {
    changeDataHandler({
      ...analysisParams,
      hashNumber: hashNo,
    });
  };

  const onLowerLimitChange = (lowerLimit) => {
    changeDataHandler({
      ...analysisParams,
      lowerLimit: parseInt(lowerLimit),
    });
  };

  const onUpperLimitChange = (upperLimit) => {
    changeDataHandler({
      ...analysisParams,
      upperLimit: parseInt(upperLimit),
    });
  };

  if (!props.isFromMobileBelowControls)
    return (
      <div>
        <IndividualTracingStyle searchFormExpanded={isSearchFormExpanded}>
          <TitledCard
            expandable
            title="Tracing Number"
            className="header"
            isExpanded={isSearchFormExpanded}
            setIsExpanded={setSearchFormExpanded}
          >
            <div className="form-tracing">
              <TracingForm
                placeholder={"Hash Number"}
                onInputChange={onHashNoChange}
                changedValue={analysisParams.hashNumber}
              />
              <br></br>
            </div>

            <div className="form-tracing">
              <DatePicker
                selected={analysisParams.date}
                onChange={(date) => onDatePickerChange(date)}
                placeholderText="Date"
              />
            </div>

            <br></br>
            <h4>Surrounding Number</h4>
            <br></br>

            <div className="form-tracing">
              <TracingForm
                placeholder={"Lower Limit (meter)"}
                onInputChange={onLowerLimitChange}
                changedValue={analysisParams.lowerLimit}
              />
              <br></br>
              <TracingForm
                placeholder={"Upper Limit (meter)"}
                onInputChange={onUpperLimitChange}
                changedValue={analysisParams.upperLimit}
              />
            </div>

            <TracingBelowControls />
          </TitledCard>
        </IndividualTracingStyle>
      </div>
    );
  else
    return (
      <AnalyzeFormMobileStyle>
        <div className="form-tracing">
          <TracingForm
            placeholder={"Hash Number"}
            onInputChange={onHashNoChange}
            changedValue={analysisParams.hashNumber}
          />
          <br></br>
        </div>

        <div className="form-tracing">
          <DatePicker
            selected={analysisParams.date}
            onChange={(date) => onDatePickerChange(date)}
            placeholderText="Date"
          />
        </div>

        <br></br>
        <h4>Surrounding Number</h4>
        <br></br>

        <div className="form-tracing">
          <TracingForm
            placeholder={"Lower Limit (meter)"}
            onInputChange={onLowerLimitChange}
            changedValue={analysisParams.lowerLimit}
          />
          <br></br>
          <TracingForm
            placeholder={"Upper Limit (meter)"}
            onInputChange={onUpperLimitChange}
            changedValue={analysisParams.upperLimit}
          />
        </div>
      </AnalyzeFormMobileStyle>
    );
};

const IndividualTracingStyle = styled.div`
  position: absolute;
  top: 6em;
  bottom: ${(props) => (props.searchFormExpanded === false ? "unset" : "12vh")};
  display: inline-flex;

  .header {
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

  .form-tracing {
    justify-content: center;
  }

  input:focus {
    box-shadow: none;
    outline: none !important;
    border-color: var(--color-blue);
  }

  input {
    padding: 0.8em;
    border: 1px solid var(--color-gray);
    border-radius: 10px;
    font-size: 1rem;
    width: 100%;
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

  .header {
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

  .form-tracing {
    justify-content: center;
  }

  input:focus {
    box-shadow: none;
    outline: none !important;
    border-color: var(--color-blue);
  }

  input {
    padding: 0.8em;
    border: 1px solid var(--color-gray);
    border-radius: 10px;
    font-size: 1rem;
    width: 100%;
  }
`;

export default IndividualTracing;