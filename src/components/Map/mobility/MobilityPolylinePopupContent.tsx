//CSS
import styled from "styled-components";

// Enums & Interfaces
import { MobilityPathType } from "../../../enums";
import { IMobilityAnalysisResponse } from "../../../interfaces/mobilityInterfaces";

// Helpers
import { generateLocationString } from "../../../helpers/mobility";

export const MobilityPolylinePopupContent = ({
  result,
  i,
}: {
  result: IMobilityAnalysisResponse;
  i: number;
}) => {
  let firstOriginManyToMany = (
    <>
      <h4 className="blue">Origin</h4>
      <h3>{" " + generateLocationString(result.params[i].points[0])}</h3>
      <br />
    </>
  );

  const pathColor = result.mapResult.colors?.[i];

  return (
    <MobilityPolylinePopupContentStyle>
      <span>
        <div className="color-box" style={{ background: pathColor }} />
        Path {i + 1} Mobility Line
      </span>

      {result.params[i].type === MobilityPathType.ONE_TO_ONE ? (
        <>
          <div>
            <div className="box">
              <blockquote className="orange">Type</blockquote>
              <h2>One to one</h2>
            </div>
            <div className="box">
              <blockquote className="orange">Total</blockquote>
              <h2>
                {result.analysisResult[i].timeAtLocation[0].count.toString()}
              </h2>
            </div>
          </div>

          <div>
            <br />
            {result.params[i].points.map((point, index) => {
              return (
                <div key={index} className="onetoone">
                  {index !== 0 ? (
                    <svg
                      style={{ stroke: "var(--color-blue)" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="4" x2="12" y2="20" />
                      <polyline points="18 14 12 20 6 14" />
                    </svg>
                  ) : (
                    ""
                  )}
                  <h4 className="blue">
                    {index === 0 ? "Origin :" : `Destination ${index} :`}
                  </h4>
                  <h3>{" " + generateLocationString(point)}</h3>
                  <br />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="box">
              <blockquote className="orange">Type</blockquote>
              <h2>One to many</h2>
            </div>
          </div>

          <div>
            <br />
            {result.params[i].points.map((point, index) => {
              if (index === 0) return "";
              else
                return (
                  <div key={index} className="manytomany-parent">
                    <div className="manytomany">
                      {firstOriginManyToMany}
                      <svg
                        style={{ stroke: "var(--color-blue)" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="4" x2="12" y2="20" />
                        <polyline points="18 14 12 20 6 14" />
                      </svg>
                      <h4 className="orange">
                        {index === 0 ? "Origin :" : `Destination ${index} :`}
                      </h4>
                      <h3>{" " + generateLocationString(point)}</h3>
                      <br />
                    </div>
                    <div className="box">
                      <blockquote className="orange">Total</blockquote>
                      <h2>
                        {
                          result.analysisResult[i].timeAtLocation[index - 1]
                            .count
                        }
                      </h2>
                    </div>
                  </div>
                );
            })}
          </div>
        </>
      )}
    </MobilityPolylinePopupContentStyle>
  );
};

const MobilityPolylinePopupContentStyle = styled.div`
  text-align: left;
  white-space: nowrap;
  display: flex;
  flex-direction: column;

  span {
    font-size: 1.5em;
    font-weight: 600;
    color: var(--color-blue);
    display: flex;
    gap: 0.5em;
  }

  .color-box {
    width: 24px;
    border-radius: 5px;
    height: 24px;
    background: blue;
    box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
      0px 3px 5px rgba(176, 190, 197, 0.32);
  }

  h3 {
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    width: 100%;
  }

  span + div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-weight: bold;
    margin-top: 1em;
    gap: 1em;
    border-radius: 10px;
  }

  .box {
    background: var(--color-blue);
    color: white;
    padding: 0.5em 1em;
    border-radius: 10px;
    box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
      0px 3px 5px rgba(176, 190, 197, 0.32);
  }

  .orange {
    color: var(--color-orange);
  }
  .blue {
    color: var(--color-blue);
  }

  .onetoone {
    width: 30em;
  }

  .manytomany-parent {
    margin-bottom: 0.8em;
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr 0.2fr;

    .box {
      text-align: center;
      display: grid;
      align-content: center;
    }
  }

  .manytomany {
    padding: 0.5em 1em;
    border-radius: 10px;
    box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
      0px 3px 5px rgba(176, 190, 197, 0.32);
    width: 30em;
  }
`;

export default MobilityPolylinePopupContent;