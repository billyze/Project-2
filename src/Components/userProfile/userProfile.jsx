import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Progress from '../progress/Progress';
import Grid from '@material-ui/core/Grid';
import ProfileNewsCard from './ProfileNewsCard';
import { Link } from 'react-router-dom';
import './userProfile.css';

// Generate Stock Data
var stockData = [];


const showStock = (name, symbolData, symbol, state, setState) => {
  
  return (
    <React.Fragment>
      <div style={{ margin: '10px' }}>
        <h3 style={{ textAlign: 'center' }}>{`Welcome, ${name}`}</h3>
        <div style={{ margin: '10px 0 0 0' }}>
          <Title>Stocks</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className="bold">Symbol</TableCell>
                <TableCell className="bold" align="right">
                  Current Price
                </TableCell>
                <TableCell className="bold" align="right">
                  Day High
                </TableCell>
                <TableCell className="bold" align="right">
                  Day Low
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {symbol.map((el, i) => (
                <TableRow key={el}>
                  <TableCell className="bold">
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
          <select
            style={{ marginLeft: '20px' }}
            id="filter"
            onChange={(e) => (newsChoice(setState,e.target.value))}
          >
            <option value="0">All</option>
            <option value="1">Positive</option>
            <option value="2">Negative</option>
            <option value="3">Neutral</option>
          </select>
          <Grid style={{ display: 'grid' }} container justify="center">
            <ProfileNewsCard stocks={symbol} choice={state} />
          </Grid>
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

const newsChoice = (setState,val) => {
  setState(val)
}


export const UserProfile = ({ user, data }) => {
  const [loaded, setLoaded] = useState(false);
  const [choice, setChoice] = useState(0);

  
  
  useEffect(() => {

    let urls=[]

    if (data) {
      urls = getUrlsArr(user.trackStock);
  
      Axios.all(urls.map((l) => Axios.get(l))).then(
        Axios.spread(function (...res) {
          // all requests are now complete
          stockData.push(res);
          setLoaded(true);
        })
      );
    }
  
  });

  return (
    <div>
      {stockData.length > 0 ? (
        showStock(user.displayName, stockData[0], user.trackStock, choice, setChoice)
      ) : (
        <Progress />
      )}
    </div>
  );
};
