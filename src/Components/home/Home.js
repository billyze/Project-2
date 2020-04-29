import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'

let api_key = ["9W5UPEGYZVUVW53C" , "BR5V2PTA5QED77EH", "ERJDBELY01OD8EQ1", "13QPI9QXTR3WJ1GZ", "5C5GVF78LE67D39B" ]

class Home extends Component {
    
    state = {
        companyNames: [],
        companySymbol: [],
        loadComplete: false
    }

    displaySearch = () => {
        return this.state.companyNames.map((eachCompany,i) => {
            return (
                <div key={this.state.companySymbol[i]}>
                  <Link to={`/${this.state.companySymbol[i]}`}>{this.state.companySymbol[i]}: {eachCompany}</Link>
                </div>
            )
        })
    }
    
    handleChange = (e) => {
        let companyNameCopy = []
        let companySymbolCopy = []
        if(e.target.value) {
            Axios.get(`http://ticker-2e1ica8b9.now.sh/keyword/${e.target.value}`)
            .then(response => {
                response.data.map((eachName,i) => {
                    companySymbolCopy[i] = eachName.symbol
                    companyNameCopy[i] = eachName.name
                    return
                })
                this.setState({
                    companyNames: companyNameCopy,
                    companySymbol: companySymbolCopy,
                    loadComplete: true
                })
            })
        }
        else{
            this.setState({
                companyNames: [],
                companySymbol: []
            })
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <ul>
                    <label>Search</label>
                    <input name="searchValue" onChange={(e) => this.handleChange(e)}/>
                    {this.state.companyNames? this.displaySearch():('')}
                </ul>
            </div>
        );
    }
}

export default Home;