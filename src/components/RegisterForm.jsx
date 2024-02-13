/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Grid, Paper, TextField } from '@mui/material';

function RegisterForm () {
  const [name, setName] = React.useState(''); // user name
  const [email, setEmail] = React.useState(''); // user email
  const [password, setPassword] = React.useState(''); // user password
  const [confirm, setConfirm] = React.useState(''); // user confirm password

  // error property control
  const [validName, setValidName] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);
  const [validConfirm, setValidConfirm] = React.useState(true);

  // helper text property control
  const [validNameMsg, setValidNameMsg] = React.useState('');
  const [validEmailMsg, setValidEmailMsg] = React.useState('');
  const [validPasswordMsg, setValidPasswordMsg] = React.useState('');
  const [validConfirmMsg, setvalidConfirmMsg] = React.useState('');

  const navigate = useNavigate();

  // send register request to server
  const register = async () => {
    const finalPass = checkInput();

    if (finalPass === true) {
      const response = await fetch('https://airbnb-backend-ewh3.onrender.com/user/auth/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      if (response.status === 200) {
        // get user login information
        const data = await response.json();

        // successfull register
        // store token and email
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email);

        navigate('/');
      } else {
        setValidNameMsg('Register Failed! User may already exists!');
        setValidName(false);
      }
    }
  };

  // check user input information
  const checkInput = () => {
    const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let pass = true;

    // check email format
    if (!email.match(pattern)) {
      setValidEmail(false);
      pass = false;
    }

    // check password
    if (name === '') {
      setValidName(false);
      pass = false;
    }

    // check password format
    if (password.length < 8 || password.length > 12) {
      setValidPassword(false);
      pass = false;
    }

    // check whether two password are the same
    if (password !== confirm) {
      setValidConfirm(false);
      pass = false;
    }

    return pass;
  };

  React.useEffect(() => {
    if (password === '') {
      setValidPasswordMsg('Please enter your password in 8-16 characters');
      setValidPassword(true);
    } else {
      if (password.length < 8) {
        setValidPasswordMsg('Password need at least 8 characters!');
        setValidPassword(false);
      } else if (password.length > 16) {
        setValidPasswordMsg('Password at most 16 characters!');
        setValidPassword(false);
      } else {
        setValidPasswordMsg('Good password!');
        setValidPassword(true);
      }
    }
    if (confirm === '') {
      setvalidConfirmMsg('Please confirm your password');
      setValidConfirm(true);
    } else {
      setvalidConfirmMsg('');
      setValidConfirm(true);
    }
    if (password !== '' && confirm !== '') {
      if (password !== confirm) {
        setvalidConfirmMsg('Two passwords are not the same!');
        setValidConfirm(false);
      } else if (password === confirm) {
        setvalidConfirmMsg('Same password!');
        setValidConfirm(true);
      }
    }
  }, [password, confirm]);

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
    if (name === '') {
      setValidNameMsg('Please enter your name');
    } else {
      setValidNameMsg('');
    }
    setValidName(true);
  }, [name]);

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
                  Register
                </h2>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <TextField
                error={!validName}
                label="Name"
                variant="outlined"
                type={'text'}
                value={name}
                fullWidth
                helperText={validNameMsg}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
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
              <TextField
                error={!validConfirm}
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={confirm}
                fullWidth
                helperText={validConfirmMsg}
                onChange={(event) => {
                  setConfirm(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              {/* register button */}
              <Button
                label="register button"
                name="register"
                type="submit"
                variant="contained"
                fullWidth
                onClick={() => {
                  register();
                }}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              {/* register reminder */}
              <div>Already got an account?</div>
              {/* button jump to register page */}
              <Button
                label="button jump to register page "
                role=" jump to register page "
                variant="contained"
                fullWidth
                helperText="Does not have account yet?"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Sign In
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

export default RegisterForm;
