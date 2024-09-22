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
import { useState,useEffect } from 'react';
import axios from 'axios';
import video from '../assets/video2.mp4';



const columns = [
  { id: 'Name', label: 'Name', minWidth: 170 },
  { id: 'AddharNum', label: 'Addhar Num', minWidth: 100 },
  {
    id: 'Crime',
    label: 'Crime',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Firdate',
    label: 'FirDate',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Status',
    label: 'Applied for Bail',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name,Addhar, Crime, FirDate,AppliedForBail) {
  
  return { name, Addhar, Crime, FirDate, AppliedForBail };
}

const rows = [
  createData("ckk","ckk","ckk","ckk","ckk")
];

export default function Tablee() {

  const [prisonerdets, setprisonerdets] = useState([]);
  

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://judicio-server.onrender.com/api/applications` //replace this with ${import.meta.env.VITE_DEV_URL}/api.getprisonerdets before pushing 
      ); //   https://judicio-server.onrender.com
      console.log(response.data);

      if (response.data) {
        setprisonerdets(response.data);
        console.log(prisonerdets);
      } else {
        console.error("Error: Invalid response data");
      }
    } catch (error) {
      console.error("Server Error : ", error);
    }
  };


  useEffect(() => {
    fetchData()

  }, []);




  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
      <source src={video} type="video/mp4"/>
    </video>
    <div >
      <Box className='paper-box'>   
          <Paper sx={{ 
          width:'75%',
          overflow: 'hidden',
          backgroundColor: ' rgba(0, 0, 0, 0.5)', 
          backdropFilter: 'blur(3px)', 
          border: '1px solid orangered',
          borderRadius: '5px'
          }}>
          <TableContainer sx={{ minHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor :'black' , color: 'orangered' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {prisonerdets.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{color :'white'}}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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