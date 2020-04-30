import React, { Component } from 'react';
import Axios from 'axios'

class News extends Component {
    state = {
        news: false,
        newsImage: '',
        newsTitle: '',
        newsUrl: ''
    }
    componentDidMount = () => {
        Axios.get('https://stocknewsapi.com/api/v1?tickers=FB,AMZN,NFLX&items=50&token=uc622dmickzgpao5nmepbdszukmxzzk9hbxatlap')
        .then(response => {
          console.log(response.data.data[0].title)
          this.setState({
              news: true,
              newsImage: response.data.data[0].image_url,
              newsTitle: response.data.data[0].title,
              newsUrl: response.data.data[0].news_url
          })
        })
    }

    // setNews = () => {
    //     let news = this.state.newsInfo.map(each => {
    //         if(this.state.news){
    //             return(
    //             <li key={each.title}><img src={each.image_url} alt="NewsImage"/></li>
    //             )}
    //             return news
    //     })
    //   }

    render() {
        return (
            <div className= 'App'>
            <h1>Latest News on Stock Market</h1>
            
            <a href={this.state.newsUrl}><h3>{this.state.newsTitle}</h3></a>
            <img src={this.state.newsImage} alt='NewsImage'/>
            </div>
        );
    }
}

export default News;