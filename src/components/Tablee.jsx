import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState,useEffect } from 'react';
import axios from 'axios';

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
    id: 'FIRdate',
    label: 'FirDate',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'prisonbefore',
    label: 'PrisonedBefore',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name,Addhar, Crime, FirDate,PrisonedBefore) {
  
  return { name, Addhar, Crime, FirDate, PrisonedBefore };
}

const rows = [
  createData('India', 'IN', 1324171354 ,17548713, 3287263),
  createData('China', 'CN', 1403500365 ,17548713, 9596961),
  createData('Italy', 'IT', 60483973 ,17548713, 301340),
  createData('United States', 'US', 327167434 ,17548713, 9833520),
  createData('Canada', 'CA', 37602103 ,17548713, 9984670),
  createData('Australia', 'AU', 25475400 ,17548713, 7692024),
  createData('Germany', 'DE', 83019200 ,17548713, 357578),
  createData('Ireland', 'IE', 4857000 ,17548713, 70273),
  createData('Mexico', 'MX', 126577691 ,17548713, 1972550),
  createData('Japan', 'JP', 126317000 ,17548713, 377973),
  createData('France', 'FR', 67022000 ,17548713, 640679),
  createData('United Kingdom', 'GB', 67545757 ,17548713, 242495),
  createData('Russia', 'RU', 146793744 ,17548713, 17098246),
  createData('Nigeria', 'NG', 200962417 ,17548713, 923768),
  createData('Brazil', 'BR', 210147125 ,17548713, 8515767),
];

export default function Tablee() {

  const [prisonerdets, setprisonerdets] = useState([]);
  

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_URL}api/getprisonerdets`
      );
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {prisonerdets
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
