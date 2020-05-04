import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Progress from '../progress/Progress';
import Axios from 'axios';
import { Link } from 'react-router-dom';

// Generate Stock Data
var stockData = [];

const showStock = (name, symbolData, symbol) => {
  return (
    <React.Fragment>
      <div style={{ margin: '10px' }}>
        <h3>{`Welcome, ${name}`}</h3>
        <div style={{ margin: '10px 0 0 0' }}>
          <Title>Stocks</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Current Price</TableCell>
                <TableCell align="right">Day High</TableCell>
                <TableCell align="right">Day Low</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {symbol.map((el, i) => (
                <TableRow key={el}>
                  <TableCell>
                    <Link to={`/Company/${el}`}>{el}</Link>
                  </TableCell>
                  <TableCell align="right">{symbolData[i].data.c}</TableCell>
                  <TableCell align="right">{symbolData[i].data.h}</TableCell>
                  <TableCell align="right">{symbolData[i].data.l}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div style={{ margin: '20px 0 0 0' }}>
          <Title>Curated News</Title>
        </div>
      </div>
    </React.Fragment>
  );
};

const getUrlsArr = (stocks) => {
  let url = [];

  stocks.map((stock) => {
    url.push(
      `https://finnhub.io/api/v1/quote?symbol=${stock}&token=bqmsdk7rh5re7283gko0`
    );
  });

  return url;
};

export const UserProfile = ({ user, data }) => {
  const [loaded, setLoaded] = useState(false);

  if (data) {
    let urls = getUrlsArr(user.trackStock);

    Axios.all(urls.map((l) => Axios.get(l))).then(
      Axios.spread(function (...res) {
        // all requests are now complete
        stockData.push(res);
        setLoaded(true);
      })
    );
  }

  return (
    <div>
      {stockData.length > 0 ? (
        showStock(user.displayName, stockData[0], user.trackStock)
      ) : (
        <Progress />
      )}
    </div>
  );
};
