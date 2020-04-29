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
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({history}) {
  
  const userCreated = () => {
    //Set was successfull, let user know the account was created, adnd redirect him to sign in page
    alert('User created successfully!')
    history.push('/Profile')
  }

  //State Hook
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


 

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Destructure user state so we avoid doing user.displayname, user.Email, etc...
    const { displayName, email, password, confirmPassword } = user;

    if (password !== confirmPassword) {
      alert(`Passwords don't match`);
      return;
    }

    // Try and create User in DATABASE, check if exist first
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
    
    // User doesn't exist, go ahead and create new one with credentials provided  
      setUser({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
     //Let user know action was successfull and redirect to sign in page. 
      userCreated()

    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

   //Destructure user state so we avoid doing user.displayname, user.Email, etc...
   const { displayName, email, password, confirmPassword } = user;
   const classes = useStyles();
   
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="displayName"
                variant="outlined"
                value={displayName}
                onChange={handleChange}
                required
                fullWidth
                id="displayName"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={email}
                onChange={handleChange}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={handleChange}
                name="password"
                label="password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                id="confirmPassword"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
