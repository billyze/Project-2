import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class SearchBar extends Component {
  state = {
    companyNames: [],
    companySymbol: [],
    loadComplete: false,
  };

  displaySearch = () => {
    return this.state.companyNames.map((eachCompany, i) => {
      return (
        <div key={this.state.companySymbol[i]}>
          <Link to={`/${this.state.companySymbol[i]}`}>
            {this.state.companySymbol[i]}: {eachCompany}
          </Link>
        </div>
      );
    });
  };

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
      <div>
        <ul>{this.state.companyNames ? this.displaySearch() : ''}</ul>
      </div>
    );
  }
}
