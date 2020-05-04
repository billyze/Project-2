import React, { Component } from 'react';
import Gif from './../navbar/Gif';
// let api_key = ["9W5UPEGYZVUVW53C" , "BR5V2PTA5QED77EH", "ERJDBELY01OD8EQ1", "13QPI9QXTR3WJ1GZ", "5C5GVF78LE67D39B" ]
import News from './../News/News';
class Home extends Component {

  render() {
    return (
      <div>
        <Gif />
        <News isLoad={this.props.isLoad}/>
      </div>
    );
  }
}

export default Home;
