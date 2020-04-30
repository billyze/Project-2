import React, { Component } from 'react';
import Axios from 'axios';
import NewsCard from './NewsCard.jsx';
import Grid from '@material-ui/core/Grid';
import Progress from '../progress/Progress'

class News extends Component {
  state = {
    news: false,
    newsData: [],
  };

  componentDidMount = () => {
    Axios.get(
      'https://stocknewsapi.com/api/v1?tickers=FB,AMZN,NFLX&items=50&token=uc622dmickzgpao5nmepbdszukmxzzk9hbxatlap'
    ).then((response) => {
      
      this.setState({
        news: true,
        newsData: response.data,
      });
    });
  };

  render() {
    const { data } = this.state.newsData;
    return (
      <div className="App">
        <h2>Latest News on Stock Market</h2>
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
