import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Grid, Paper, TextField } from '@mui/material';

function LoginForm () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // error property control
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);

  // helper text property control
  const [validEmailMsg, setValidEmailMsg] = React.useState('');
  const [validPasswordMsg, setValidPasswordMsg] = React.useState('');

  const navigate = useNavigate();

  // send login request to server
  const login = async () => {
    const finalPass = checkEmail() && checkPassword();

    if (finalPass === true) {
      // send request
      const response = await fetch('https://airbnb-backend.up.railway.app/user/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.status === 200) {
        // get user login information
        const data = await response.json();

        // successfull login
        // store token and email
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email);
        navigate('/');
      } else {
        setValidEmailMsg('Login Failed! Check your Email!');
        setValidPasswordMsg('Login Failed! Check your Password!');
        setValidEmail(false);
        setValidPassword(false);
      }
    }
  };

  const checkEmail = () => {
    let pass = true;
    // email pattern
    const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    // check email format
    if (!email.match(pattern)) {
      setValidEmailMsg('Incorrect format');
      pass = false;
    }
    setValidEmail(pass);
    return pass;
  };

  const checkPassword = () => {
    let pass = true;
    // check password
    if (password === '') {
      setValidPasswordMsg('Password cannot be empty!');
      pass = false;
    }
    setValidPassword(pass);
    return pass;
  };

  React.useEffect(() => {
    // email pattern
    const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    // check email format
    if (email === '') {
      setValidEmailMsg('Please enter your email');
      setValidEmail(true);
    } else if (!email.match(pattern)) {
      setValidEmailMsg('Incorrect format');
      setValidEmail(false);
    } else {
      setValidEmailMsg('');
      setValidEmail(true);
    }
  }, [email]);

  React.useEffect(() => {
    setValidPasswordMsg('');
    setValidPassword(true);
  }, [password]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={10} sm={8} md={4} align="center"></Grid>
      <Grid item xs={10} sm={8} md={4} align="center">
        <Paper
          style={{
            backgroundColor: 'rgb(255,255,255,0.6)',
            color: 'black',
            borderRadius: '20px'
          }}
        >
          <Grid container rowSpacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <div style={{ margin: '20px' }}>
                {/* header */}
                <h2
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Login
                </h2>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <TextField
                error={!validEmail}
                label="Email"
                variant="outlined"
                type={'email'}
                value={email}
                fullWidth
                helperText={validEmailMsg}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <TextField
                error={!validPassword}
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                fullWidth
                helperText={validPasswordMsg}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              {/* login button */}
              <Button
                name="login"
                type="submit"
                variant="contained"
                label="a button for login"
                fullWidth
                onClick={() => {
                  login();
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              {/* register reminder */}
              <div>Does not have account yet?</div>
              {/* button jump to register page */}
              <Button
                label="a button to goto register page"
                variant="contained"
                fullWidth
                helperText="Does not have account yet?"
                onClick={() => {
                  navigate('/register');
                }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={10} sm={8} md={4} align="center"></Grid>
    </Grid>
  );
}

export default LoginForm;
