import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name, AadharrNum, firdate, trialdate, Address) {
  return {
    name,
    AadharrNum,
    firdate,
    trialdate,
    Address,
    history: [
      {
        date: "2020-01-05",
        crime: "Murder",
        PrisonStatus: "in prison",
        amount: "non-bailable"
      },
      {
        date: "2020-01-02",
        crime: "Theft",
        PrisonStatus: "in prison",
        amount: "bailable"
      }
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.AadharrNum}</TableCell>
        <TableCell align="right">{row.firdate}</TableCell>
        <TableCell align="right">{row.trialdate}</TableCell>
        <TableCell align="right">{row.Address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Crime</TableCell>
                    <TableCell align="right">Prison Status</TableCell>
                    <TableCell align="right">Bail Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.crime}</TableCell>
                      <TableCell align="right">{historyRow.PrisonStatus}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    AadharrNum: PropTypes.string.isRequired,
    firdate: PropTypes.string.isRequired,
    trialdate: PropTypes.string.isRequired,
    Address: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        crime: PropTypes.string.isRequired,
        PrisonStatus: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

const rows = [
  createData("Zephyrus", "6246 7600 2834", "2023-09-01", "2023-09-10", "X street")
];

const Tablee = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Aadhar Number</TableCell>
            <TableCell align="right">FIR Date</TableCell>
            <TableCell align="right">Trial Date</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tablee;
