import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import video from '../assets/video2.mp4';

const columns = [
  { id: 'Applicant Name', label: 'Applicant Name', minWidth: 100 },
  { id: 'Application ID', label: 'Application ID', minWidth: 100 },
  { id: 'Lawyer Name', label: 'Lawyer Name', minWidth: 100 },
  {
    id: 'Status',
    label: 'Status',
    minWidth: 100,
    render: (row, handleStatusChange) => (
      <>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => handleStatusChange(row.id, 'Accepted')}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleStatusChange(row.id, 'Rejected')}
          style={{ marginLeft: '10px' }}
        >
          Reject
        </Button>
      </>
    ),
  },
];

export default function Tablee() {
  const [prisonerdets, setprisonerdets] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const fetchData = async () => {
    try {
      // Make the API call to get the applications data
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_URL}api/applications` // Replace this URL with the correct one when needed
      );

      console.log(response.data);  // Log the response data for debugging

      // Check if response data exists and is valid
      if (Array.isArray(response.data)) {
        setprisonerdets(response.data); // Update the state with the fetched data
        console.log(response.data); // Log the response data to confirm it's updated
      } else {
        console.error("Error: Invalid response data"); // Handle case if response is empty or invalid
      }
    } catch (error) {
      console.error("Server Error : ", error); // Handle any errors that occur during the API request
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = (id, status) => {
    console.log(`Changing status of application ${id} to ${status}`);
    // Here you can implement the logic to update the status, e.g., via an API call.
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="video-container">
      <video autoPlay muted loop className="video-background">
        <source src={video} type="video/mp4" />
      </video>
      <div>
        <Box className="paper-box">
          <Paper
            sx={{
              width: '75%',
              overflow: 'hidden',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(3px)',
              border: '1px solid orangered',
              borderRadius: '5px',
            }}
          >
            <TableContainer sx={{ minHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: 'black',
                          color: 'orangered',
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className="bg-white">
                  {Array.isArray(prisonerdets) && prisonerdets.length > 0 ? (
                    prisonerdets
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          {columns.map((column) => {
                            if (column.render) {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.render(row, handleStatusChange)}
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {row[column.id]}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        No Data Available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{ color: 'white' }}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={prisonerdets.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
}
