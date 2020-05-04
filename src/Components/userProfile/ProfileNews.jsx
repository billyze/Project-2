import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

  inline: {
    display: 'inline',
  },
}));

const goUrl = (url) => window.open(url);


export function ProfileNews({ newsArt }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItem button alignItems="flex-start" onClick={() => goUrl(newsArt.news_url)} >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={newsArt.image_url} />
        </ListItemAvatar>
        <ListItemText
          primary={newsArt.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                style={{
                  color:
                    newsArt.sentiment === 'Neutral'
                      ? 'blue'
                      : newsArt.sentiment === 'Negative'
                      ? 'red'
                      : newsArt.sentiment === 'Positive'
                      ? 'green'
                      : 'blue',
                }}
              >
                {`${newsArt.sentiment}`}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}
