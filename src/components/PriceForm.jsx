import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';

import { Button, Grid, IconButton, Paper, TextField } from '@mui/material';

// input new price for the listing
function PriceForm ({ price, path, setPrice, submit, update }) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Grid
      container
      alignItems={'center'}
      justify={'center'}
      height="100%"
      spacing={1}
    >
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
              search: '?thumbnail'
            });
          }}
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
              <div>Step 7</div>
              <h3>Set Price (per night)</h3>
            </Grid>
            <Grid item xs={1} align="center"></Grid>

            <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <TextField
                label="Price"
                type="number"
                value={price !== 0 ? price : ''}
                onChange={(event) => {
                  const num = parseInt(event.target.value);
                  if (!isNaN(num)) {
                    setPrice(num);
                  } else {
                    setPrice(0);
                  }
                }}
              ></TextField>
            </Grid>
            <Grid item xs={1} align="center"></Grid>

            <Grid item xs={1} align="center"></Grid>
            {/* Listing Create Button */}
            {path === 'create' && (
              <Grid item xs={10} align="center">
                <Button
                  name="submit"
                  variant="contained"
                  fullWidth
                  color="success"
                  onClick={() => {
                    if (price > 0) {
                      submit();
                    }
                  }}
                >
                  Submit
                  <ArrowCircleUpRoundedIcon />
                </Button>
              </Grid>
            )}
            {/* Listing Update Button */}
            {path === 'edit' && (
              <Grid item xs={10} align="center">
                <Button
                  name="update"
                  variant="contained"
                  fullWidth
                  color="success"
                  onClick={() => update()}
                >
                  Update
                  <ArrowCircleUpRoundedIcon />
                </Button>
              </Grid>
            )}
            <Grid item xs={1} align="center"></Grid>

            <Grid item xs={12} align="center"></Grid>
            <Grid item xs={12} align="center"></Grid>
          </Grid>
        </Paper>

        {/* update button for edit mode */}
      </Grid>
      <Grid item xs={2} sm={4} align="center"></Grid>
    </Grid>
  );
}

PriceForm.propTypes = {
  path: PropTypes.string,
  price: PropTypes.number,
  setPrice: PropTypes.func,
  submit: PropTypes.func,
  update: PropTypes.func
};

export default PriceForm;
