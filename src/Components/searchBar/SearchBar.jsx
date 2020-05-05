import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
//TO BE MOVED TO its OWN COMPONENT
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { updateTracking, deleteTracking } from '../firebase/firebase.utils';
import './SearchBar.css'

//TO BE MOVED TO its OWN COMPONENT

export default class SearchBar extends Component {
  state = {
    companyNames: [],
    companySymbol: [],
    loadComplete: false,
  };

  displayTracking = (user, symbol) => {

    console.log(user.trackStock.indexOf(symbol)!==-1)

    if (user.trackStock.indexOf(symbol)!==-1) {
      return (
        <TableCell align="center">
          <HighlightOffRoundedIcon
            onClick={() => deleteTracking(user, symbol)}
            style={{ fill: 'red' }}
            className='track'
          />
        </TableCell>
      );
    }else{
        return (
          <TableCell align="center">
            <AddCircleOutlineSharpIcon
              onClick={() => updateTracking(user, symbol)}
              style={{ fill: '#81C784' }}
              className='track'
            />
          </TableCell>
        );
      
    }
  };

  // for presentation only, going to be moved into its own component
  displaySearch = () => {
    const { user } = this.props;
    return (
      <TableContainer component={Paper} styles={{ margin: 10 }}>
        <Table aria-label="caption table">
          <caption>You've no idea how much time this took... </caption>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              {this.props.data ? (
                <TableCell align="center">
                  <strong>Track</strong>
                </TableCell>
              ) : (
                ''
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.companyNames.map((eachCompany, i) => (
              <TableRow key={this.state.companySymbol[i]}>
                <TableCell component="th" scope="row">
                  <Link to={`/Company/${this.state.companySymbol[i]}`}>
                    <Typography variant="subtitle1">
                      {this.state.companySymbol[i]}
                    </Typography>
                    <Typography variant="subtitle2">{eachCompany}</Typography>
                  </Link>
                </TableCell>

                {this.props.data
                  ? this.displayTracking(
                      user,
                      this.state.companySymbol[i]
                    )
                  : ''}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  // for presentation only, going to be moved into its own component
  handleChange = () => {
    let e = this.props.query;
    let companyNameCopy = [];
    let companySymbolCopy = [];
    if (e) {
      Axios.get(`https://ticker-2e1ica8b9.now.sh/keyword/${e}`).then(
        (response) => {
          response.data.map((eachName, i) => {
            companySymbolCopy[i] = eachName.symbol;
            companyNameCopy[i] = eachName.name;
          });
          this.setState({
            companyNames: companyNameCopy,
            companySymbol: companySymbolCopy,
            loadComplete: true,
          });
        }
      );
    } else {
      this.setState({
        companyNames: [],
        companySymbol: [],
      });
    }
  };

  render() {
    this.handleChange();
    return (
      <div style={{ margin: 20 }}>
        {this.state.companyNames ? this.displaySearch() : ''}
      </div>
    );
  }
}
