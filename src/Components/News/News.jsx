import React, { Component } from 'react';
import Axios from 'axios';
import NewsCard from './NewsCard.jsx';
import Grid from '@material-ui/core/Grid';
import Progress from '../progress/Progress'
import newsData from './newsData.json'

class News extends Component {
  state = {
    news: false,
    newsData: [],
  };

  componentDidMount =  () => {
    // Axios.get(
    //   'https://stocknewsapi.com/api/v1?tickers=FB,AMZN,NFLX&items=50&token=s1levpafpygxmnbpbjuhwfikr4tuz3d5zaqls3rk'
    // ).then((response) => {
    //   console.log(response)
    //   this.setState({
    //     news: true,
    //     newsData: response.data,
    //   });
    // });
    
    this.setState({
      news: true,
      newsData: newsData,
    });
  
  };

  render() {
    
    const { data } = this.state.newsData;
    
    return (
      <div className="App">
        <hr/>
        <h2 textDecoration='red'><i>Latest News on Stock Market</i></h2>
        <hr/>
        <Grid  style={{display: "grid"}} container justify="center">
        {
            (this.state.news)
            ? (
                (data.splice(1, 6).map((el) => {
                    return <NewsCard
                    title={el.title}
                    image={el.image_url}
                    text={el.text}
                    newsUrl={el.news_url}
                    stocks={el.tickers}
                    />
                }))
            )
            :(<Progress/>)
        }
        </Grid>
      </div>
    );
  }
}

export default News;
