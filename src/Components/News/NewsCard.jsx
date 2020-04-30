import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 650,
  margin:15
  },
  media: {
    height: 140,
  },
  textLeft:{
      textAlign: "left",
      marginLeft: 9,
  }
});

export default function NewsCard({image, title, text, newsUrl, stocks}) {
  const classes = useStyles();

  return (
      

    <Card className={classes.root} elevation={3}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.textLeft}>
      <Typography  variant="body2" color="textSecondary" component="p">
            Related Stocks: {
                stocks.map(el=> ` ${el}`)
            }
          </Typography>
      </CardActions>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          <a href={newsUrl} target="_blank" rel="noopener noreferrer">Learn More</a>
        </Button>
      </CardActions>
    </Card>
      
  );
}