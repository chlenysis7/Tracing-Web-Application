import { useState } from "react";

import { Button } from "../../../../../components/Button";

import IcSearch from "../../../../../images/ic-search.svg";
import IcBtnArrowDown from "../../../../../images/ic-btn-arrow-down.svg";

import { MobilityPathType } from "../../../../../enums";
import { IMobilityAnalysisResponse } from "../../../../../interfaces/mobilityInterfaces";

import { generateReadableDate } from "../../../../../helpers/common";
import { generateLocationString } from "../../../../../helpers/mobility";

export const MobilityHistoryItem = ({
  singleHistory,
  handleClick,
}: {
  singleHistory: IMobilityAnalysisResponse;
  handleClick: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mobility-history-item">
      <div className="id-timestamp">
        <span>Analysis ID: {singleHistory.analysisId}</span>
        {singleHistory.timeStampStartAnalysis ? (
          <span>
            {"Time stamp: " +
              generateReadableDate(singleHistory.timeStampStartAnalysis)}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="mid">
        <div className="path-title-type">
          <img
            src={IcBtnArrowDown}
            style={{ transform: "rotate(180deg)" }}
            alt="Button show previous path"
            className={activeIndex === 0 ? "disabled" : ""}
            onClick={() =>
              activeIndex !== 0 ? setActiveIndex(activeIndex - 1) : ""
            }
          />
          <div>
            <b>Path {activeIndex + 1}</b>
            <br />
            <span>
              {singleHistory.params[activeIndex].type ===
              MobilityPathType.ONE_TO_ONE
                ? "One to one"
                : "One to many"}
            </span>
          </div>
          <img
            src={IcBtnArrowDown}
            alt="Button show next path"
            className={
              activeIndex === singleHistory.params.length - 1 ? "disabled" : ""
            }
            onClick={() =>
              activeIndex !== singleHistory.params.length - 1
                ? setActiveIndex(activeIndex + 1)
                : ""
            }
          />
        </div>
        <div className="path-routes-times">
          {singleHistory.params[activeIndex].points.map((point, i) => (
            <div key={activeIndex + "history-point" + i}>
              <div className="single">
                <span>{i === 0 ? "Origin" : "Destination " + i}</span>
                <h4>{generateLocationString(point)}</h4>
                <div>
                  <blockquote>
                    Start
                    <br />
                    End
                  </blockquote>
                  <blockquote>
                    {generateReadableDate(point.startDateTime!)}
                    <br />
                    {generateReadableDate(point.endDateTime!)}
                  </blockquote>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="path-btn">
          <Button primary onClick={handleClick}>
            <img src={IcSearch} alt="asdasd" />
          </Button>
        </div>
      </div>
    </div>
  );
};
