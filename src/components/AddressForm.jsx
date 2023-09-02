import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import { Grid, IconButton, Paper, TextField } from '@mui/material';

// input new address for the listing
function AddressForm ({ address, path, setAddress, update }) {
  const { id } = useParams(); // listing id

  const [street, setStreet] = React.useState(address.street || '');
  const [city, setCity] = React.useState(address.city || '');
  const [state, setState] = React.useState(address.state || '');
  const [postcode, setPostcode] = React.useState(address.postcode || '');
  const [country, setCountry] = React.useState(address.country || 'Australia');

  const [streetHelperText, setStreetHelperText] = React.useState('');
  const [cityHelperText, setCityHelperText] = React.useState('');
  const [stateHelperText, setStateHelperText] = React.useState('');
  const [postcodeHelperText, setPostcodeHelperText] = React.useState('');

  const [nextStepDisable, setNextStepDisable] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (street === '') {
      setStreetHelperText('Please enter the street');
    } else {
      setStreetHelperText('');
    }
  }, [street]);

  React.useEffect(() => {
    if (city === '') {
      setCityHelperText('Please enter the city');
    } else {
      setCityHelperText('');
    }
    if (state === '') {
      setStateHelperText('Please enter the state');
    } else {
      setStateHelperText('');
    }
    if (postcode === '') {
      setPostcodeHelperText('Please enter the postcode');
    } else {
      setPostcodeHelperText('');
    }

    setNextStepDisable(
      street === '' || city === '' || state === '' || postcode === ''
    );
  }, [street, city, state, postcode]);

  return (
    <>
      <Grid container alignItems={'center'} justify={'center'} height="100%">
        <Grid item xs={2} sm={4} align="center">
          {/* Move to the Previous Form */}
          <IconButton
            name="previous-step"
            variant="contained"
            width="50%"
            color="success"
            onClick={() => {
              const pathname =
                path === 'edit'
                  ? `/mylistings/${path}/${id}`
                  : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?title'
              });
            }}
            label="a button to go to previous step"
          >
            <ArrowCircleLeftOutlinedIcon style={{ transform: 'scale(2.5)' }} />
          </IconButton>
        </Grid>
        <Grid item xs={8} sm={4} align="center">
          <Paper
            style={{
              backgroundColor: 'rgb(255,255,255,0.6)',
              color: 'black',
              borderRadius: '20px'
            }}
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <div>Step 2</div>
                <h3>Address of your listing</h3>
                {nextStepDisable === true && (
                  <h5>(Enter info below to enable next-step button)</h5>
                )}
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <TextField
                  label="Street"
                  value={street}
                  variant="outlined"
                  type={'text'}
                  fullWidth
                  required
                  helperText={streetHelperText}
                  onChange={(event) => {
                    setStreet(event.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <TextField
                  label="City"
                  value={city}
                  variant="outlined"
                  type={'text'}
                  fullWidth
                  required
                  helperText={cityHelperText}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={5} align="center">
                <TextField
                  label="State"
                  value={state}
                  variant="outlined"
                  type={'text'}
                  fullWidth
                  required
                  helperText={stateHelperText}
                  onChange={(event) => {
                    setState(event.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={5} align="center">
                <TextField
                  label="Postcode"
                  value={postcode}
                  variant="outlined"
                  type={'number'}
                  fullWidth
                  required
                  helperText={postcodeHelperText}
                  onChange={(event) => {
                    setPostcode(event.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <FormControl fullWidth>
                  <InputLabel fontSize="20px">Country</InputLabel>
                  <Select
                    labelId="countrySelectLabel"
                    id="countrySelect"
                    value={country}
                    label="Country"
                    fullWidth
                    onChange={(event) => setCountry(event.target.value)}
                  >
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="America">America</MenuItem>
                    <MenuItem value="China">China</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={12} align="center"></Grid>
              <Grid item xs={12} align="center"></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} align="center">
          {/* Move to the Next Form */}
          <IconButton
            disabled={nextStepDisable}
            name="next-step"
            variant="contained"
            width="50%"
            color="success"
            label="a button to go to next step"
            onClick={() => {
              const pathname =
                path === 'edit'
                  ? `/mylistings/${path}/${id}`
                  : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?type'
              });

              // store address information
              setAddress({
                street,
                city,
                state,
                postcode,
                country
              });
            }}
          >
            <ArrowCircleRightOutlinedIcon style={{ transform: 'scale(2.5)' }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

AddressForm.propTypes = {
  path: PropTypes.string,
  address: PropTypes.object,
  setAddress: PropTypes.func,
  update: PropTypes.func
};

export default AddressForm;
