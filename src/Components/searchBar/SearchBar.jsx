import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
//TO BE MOVED TO its OWN COMPONENT
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//TO BE MOVED TO its OWN COMPONENT

export default class SearchBar extends Component {
  state = {
    companyNames: [],
    companySymbol: [],
    loadComplete: false,
  };

  // for presentation only, going to be moved into its own component
  displaySearch = () => {
    return (
      <TableContainer component={Paper} styles={{margin: 10}}>
        <Table aria-label="caption table">
          <caption>You've no idea how much time this took... </caption>
          <TableHead>
            <TableRow>
              <TableCell><strong>Symbols</strong></TableCell>
              <TableCell align="right"><strong>Company Name</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.companyNames.map((eachCompany, i) => (
              <TableRow key={this.state.companySymbol[i]}>
                <TableCell component="th" scope="row">
                  <Link to={`/Company/${this.state.companySymbol[i]}`}>
                    {this.state.companySymbol[i]}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Link to={`/Company/${this.state.companySymbol[i]}`}>
                    {eachCompany}
                  </Link>
                </TableCell>
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
      <div style={{margin: 20}}>
        {this.state.companyNames ? this.displaySearch() : ''}
      </div>
    );
  }
}
