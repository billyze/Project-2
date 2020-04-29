import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { MenuList } from '../Menu/Menu';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 0,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: '10px',
    marginRight: '10px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({user, handleChange}) {
  const classes = useStyles();
  const history = useHistory();
  

  const updateView =(e)=>{

    handleChange(e)

    if (e.target.value === ''){
      history.push('/')
    }else{
      history.push('/Search')
    }
    
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img
            width="30px"
            src="https://png2.cleanpng.com/sh/739b4bc818a9be76e2be736df8296809/L0KzQYm3U8E6N6ZxfZH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgBigZ5qhuY2aX7mf77sTf1wdpZARdRAeT3qcbr1Tflva5DyfZ92b37oiX73ggkueJJAhdd3dD3sc7F1TcViamE8eqQAYXK3RLKCTsU3Omo9TKkAMUW1QYa4VcMxOWg1Sac3cH7q/kisspng-computer-icons-payment-income-money-buy-gain-income-money-pay-payment-icon-5ab07b25ab44a9.5629847515215153017015.png"
            alt="Logo"
          />
          <Typography className={classes.title} variant="h6" noWrap>
            <strong>ABH Stocks</strong>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Stocks"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={updateView}
            />
          </div>
          <MenuList user={user} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
