import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Progress from '../progress/Progress';
import newsData from '../News/newsData.json';
import { ProfileNews } from './ProfileNews';
import './userProfile.css';

export class ProfileNewsCard extends Component {
  state = {
    news: false,
    newsData: [],
  };

  componentDidMount = () => {
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

  checkNewsStock = (tickers, stock, articule) => {
    let x;
    let index = Math.random();

    stock.map((el) => {
      if (tickers.includes(el)) {
        x = <ProfileNews key={index} newsArt={articule} />;
      }
    });

    return x;
  };

  render() {
    const { data } = this.state.newsData;
    const { stocks } = this.props;

    return (
      <div>
        <Grid style={{ display: 'grid' }} container justify="center">
          {this.state.news ? (
            <List>
              {data.map((el) => {
                return this.checkNewsStock(el.tickers, stocks, el);
              })}
            </List>
          ) : (
            <Progress />
          )}
        </Grid>
      </div>
    );
  }
}

export default ProfileNewsCard;
