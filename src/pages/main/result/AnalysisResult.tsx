import styled from "styled-components";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { PropsWithChildren, ReactNode } from "react";

export const AnalysisResult = ({ children }: PropsWithChildren<ReactNode>) => {
  return (
    <AnalysisResultStyle>
      <div className="inside shadow">
        <div className="header">Analysis Result</div>
        <div className="content">
          <div className="subcontent">
            {/* <span className="title">Graphs</span> */}
            {children}
          </div>
          <Alert className="alert-privacy" severity="warning">
            <AlertTitle>Data Privacy Alert</AlertTitle>
            All data used in this app contains confidential information of
            cellular provider users, only certain parties are legally allowed to
            access.
          </Alert>
          <span id="analysis-result-end" />
        </div>
      </div>
    </AnalysisResultStyle>
  );
};

const AnalysisResultStyle = styled.div`
  z-index: 10;
  position: absolute;
  left: 0;
  right: 0;
  top: 90vh;
  border-radius: 10px;
  padding: var(--px-xs);

  .inside {
    background: white;
    border-radius: 10px;
  }
  .header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    left: 0;
    top: 0;
    right: 0;
    padding: 1em;
    font-weight: 600;
    color: white;
    font-size: 1em;
    background: var(--color-blue);
  }
  .content {
    padding: var(--px-s);
  }
  .alert-privacy {
    border-radius: 10px;
    margin-bottom: 1em;
    margin-top: 1em;
    flex-grow: 2;
  }
  .title {
    color: var(--color-blue);
    font-weight: 800;
    font-size: 1.2em;
    margin-bottom: 1em;
  }
  .subcontent {
    display: flex;
    flex-direction: row;
  }
`;

export default AnalysisResult;