import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; // register icon
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'; // login icon
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'; // logout icon
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'; // home icon
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'; // create listing icon
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'; // my listings icon

import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar
} from '@mui/material';
import { Box } from '@mui/system';
import Search from './Search';

// navgator
function HeaderNav ({
  token,
  setToken,
  listings,
  displayListings,
  setDay,
  setDisplayListings
}) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // send logout request
  const logout = async () => {
    const response = await fetch('https://airbnb-backend-ewh3.onrender.com/user/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      // clear user information
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    }
  };

  return (
    <>
      {/* page header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Grid container alignItems={'center'} justify={'center'}>
              <Grid item xs={2} align="center">
                <h2>AirBrB</h2>
              </Grid>
              {/* Button to Home page */}
              <Grid item xs={2} align="left">
                <Button
                  label="a button to goto homepage"
                  variant="contained"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  <HomeOutlinedIcon />
                  Home
                </Button>
              </Grid>
              {/* Searching Sectino */}
              <Grid item xs={4} align="center">
                {listings !== undefined && (
                  <Search
                    listings={listings}
                    displayListings={displayListings}
                    setDay={setDay}
                    setDisplayListings={setDisplayListings}
                  />
                )}
              </Grid>
              {/* Register/Login/Logout Sider-bar */}
              <Grid item xs={4} align="right">
                <IconButton
                  label="a button for register/login/logout siderbar"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <Avatar />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  {token === '' && (
                    <MenuItem
                      onClick={() => {
                        navigate('/register');
                        handleClose();
                      }}
                    >
                      <AccountCircleOutlinedIcon />
                      Register
                    </MenuItem>
                  )}
                  {token === '' && (
                    <MenuItem
                      onClick={() => {
                        navigate('/login');
                        handleClose();
                      }}
                    >
                      <LoginOutlinedIcon />
                      Login
                    </MenuItem>
                  )}
                  {token !== '' && (
                    <MenuItem
                      onClick={() => {
                        navigate('/mylistings');
                        handleClose();
                      }}
                    >
                      <ListAltOutlinedIcon />
                      My Listings
                    </MenuItem>
                  )}
                  {token !== '' && (
                    <MenuItem
                      onClick={() => {
                        navigate({
                          pathname: '/mylistings/create',
                          search: '?title'
                        });
                        handleClose();
                      }}
                    >
                      <AddCircleOutlineOutlinedIcon />
                      Create a Listing
                    </MenuItem>
                  )}
                  {token !== '' && (
                    <MenuItem
                      onClick={() => {
                        logout();
                        navigate('/');
                        window.location.reload();
                      }}
                    >
                      <LogoutOutlinedIcon />
                      Logout
                    </MenuItem>
                  )}
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

HeaderNav.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func,
  listings: PropTypes.array,
  displayListings: PropTypes.array,
  setDay: PropTypes.func,
  setDisplayListings: PropTypes.func
};

export default HeaderNav;
