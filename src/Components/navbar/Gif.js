import React, { Component } from 'react';
import Axios from 'axios';

let api_key = "Waxy1wRfFaZ06KVdexO0B2uLgbVA01PP"

class Gif extends Component {
    state = {
      image: false,
      imageUrl: ''
    }
      componentDidMount = () => {
        Axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=stockmarket&rating=G`)
        .then(response => {
          console.log(response.data)
          this.setState({
            image: true,
            imageUrl: response.data.data.images.original.url
          })
        })
    }

setImage = () => {
  if(this.state.image){
    return <img width="100%" height="380px" src={this.state.imageUrl} alt="Stock Market"/>
  }
}

    render() {
        return (
            <div>
              {this.setImage()}
            </div>
        );
    }
}

export default Gif;