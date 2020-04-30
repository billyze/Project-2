import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';

import { auth, signInWithGoogle } from '../firebase/firebase.utils';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        IronStock
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  google: {
    backgroundImage: '../btn_google_signin_light_normal_web.png',
    color: 'white',
  },
  gap: {
    marginTop: 20,
  },
}));

export default function SignIn({ history }) {
  //State Hook
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Destructure user state so we avoid doing user.displayname, user.Email, etc...
    const { email, password } = user;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setUser({
        email: '',
        password: '',
      });
      console.log('after suignin');
      history.push('/Profile');
    } catch (error) {
      alert(
        'The email or password you entered is not valid, please, try again'
      );
    }
  };

  const authGoogle = async () => {
    try {
      await signInWithGoogle();
      history.push('/Profile');
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  //Destructure user state so we avoid doing user.displayname, user.Email, etc...
  const { email, password } = user;
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <GoogleButton onClick={authGoogle} />
          </Grid>
          <Grid container justify="flex-end">
            <Grid className={classes.gap}>
              <Link to="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}
