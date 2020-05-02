import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Progress from '../progress/Progress'
import Axios from 'axios';

// Generate Stock Data
function createData(id, symbol, name, high, low) {
  return { id, symbol, name, high, low };
}

const rows = [
  createData(0, 'APPL', 'Apple', 100, 98),
  createData(1, 'TSLA', 'Tesla', 750, 715),
  createData(2, 'JNUG', 'No Idea', 50, 45),
  createData(3, 'NYTM', 'No Ideax2', 60, 55),
  createData(4, 'YMCM', 'Bad Bunny', 2, 1),
];

const showStock = () => {
  return (
    <React.Fragment>
      <Title>Stocks</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Day High</TableCell>
            <TableCell>Day Low</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.symbol}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.high}</TableCell>
              <TableCell>{row.low}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

const getSymbolData = (symbol) => {

  Axios.get(`https://ticker-2e1ica8b9.now.sh/keyword/${symbol}`)
  .then(response => {
    console.log(response)
  })


}

export const UserProfile = ({ user, data }) => {
  

  const showData = () => {
    let userArr = user.trackStock
  userArr.map(el => {
    getSymbolData(el)
  })
    return (
      <Box>
        <h3>{`Welcome, ${user.displayName}`}</h3>
        {showStock()}
      </Box>
    );
  };

  return <div>{data ? showData() : (<Progress/>)}</div>;
};
