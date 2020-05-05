import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 650,
    margin: 15,
  },
  media: {
    height: 220,
  },
  textLeft: {
    textAlign: 'left',
    marginLeft: 9,
    fontWeight: 'bold',
  },
});

export default function NewsCard({ image, title, newsUrl, stocks, sentiment }) {
  const classes = useStyles();

  return (
    <Card
      key={title}
      className={classes.root}
      elevation={3}
      style={{
        backgroundColor:
          sentiment === 'Neutral'
            ? '#6FAEED'
            : sentiment === 'Negative'
            ? '#ED6F6F'
            : sentiment === 'Positive'
            ? '#60F0A3'
            : '#6FAEED',
      }}
    >
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.textLeft}>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Related Stocks:</strong> {stocks.map((el) => ` ${el}`)}
        </Typography>
      </CardActions>
      <CardActions className={classes.textLeft}>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Sentiment:</strong> {sentiment}
        </Typography>
      </CardActions>
      <CardActions>
        <Button size="small" color="primary">
          <a href={newsUrl} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </Button>
      </CardActions>
    </Card>
  );
}
