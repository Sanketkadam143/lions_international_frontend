import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Checkbox,
  TextField,
} from "@mui/material";
import { UPDATE_REPORT } from "../../constants/actionTypes";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    maxHeight: 400,
  },
  checkbox: {
    padding: 0,
  },
}));

const StepFourForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.adminReporting.adminReports);
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Step Four
      </Typography>

      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Sr no</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Checkbox</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reports.map(({ id, title, multiple, selected, count }, index) => (
                index + 1 > 30 &&
                index + 1 <= 40 && <TableRow key={id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{title}</TableCell>

                <TableCell>
                  <TextField
                    disabled={multiple === 0}
                    type="number"
                    value={count}
                    name="counter"
                    onChange={(event) => {
                      dispatch({
                        type: UPDATE_REPORT,
                        payload: {
                          name: event.target.name,
                          count: event.target.value,
                          id,
                        },
                      });
                    }}
                  />
                </TableCell>

                <TableCell className={classes.checkbox}>
                  <Checkbox
                    checked={selected}
                    name="checkbox"
                    onChange={(event) => {
                      dispatch({
                        type: UPDATE_REPORT,
                        payload: {
                          name: event.target.name,
                          selected: event.target.checked,
                          id,
                        },
                      });
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default StepFourForm;