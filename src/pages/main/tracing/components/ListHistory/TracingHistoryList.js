import styled from "styled-components";
import Popup from "reactjs-popup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { TitledCard } from "../../../../../components/TitledCard";
import "./TracingHistoryList.css";

import { useDispatch, useSelector } from "react-redux";
import { tracingHistoryPopUpOpenStateActions } from "../../../../../store/tracing/tracingHistoryPopupOpen";

export const TracingHistoryList = () => {
  const dispatch = useDispatch();

  const historyState = useSelector((state) => state.tracingHistoryState);

  const historyPopUpOpenState = useSelector(
    (state) => state.tracingHistoryPopupOpen
  );

  const setHistoryPopUpOpenState = (state) => {
    dispatch(tracingHistoryPopUpOpenStateActions.setAll(state));
  };

  return (
    <Popup
      modal
      open={historyPopUpOpenState}
      onClose={() => setHistoryPopUpOpenState(false)}
    >
      <TitledCard
        className="tracing-history-popup"
        closable
        close={() => setHistoryPopUpOpenState(false)}
        title="History"
        subtitle={"Select From Your History"}
      >
        <PopupContentStyle>
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple tablefont"
              id="emp-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Hash Number
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Date
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Lower Limit (m)
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Upper Limit (m)
                  </TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {historyState.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.hashNo}
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.lowerLim}</TableCell>
                    <TableCell align="center">{row.upperLim}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </PopupContentStyle>
      </TitledCard>
    </Popup>
  );
};

const PopupContentStyle = styled.div`
  padding: var(--px-l);
  .mb {
    margin-bottom: var(--px-l);
  }
  .full-width {
    width: 100%;
  }
`;
