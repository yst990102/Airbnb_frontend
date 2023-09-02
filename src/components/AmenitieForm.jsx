import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import { Grid, IconButton, Paper } from '@mui/material';

// input new amenitie for the listing
function AmenitieForm ({ amenitie, path, setAmenitie, update }) {
  const { id } = useParams(); // listing id
  const navigate = useNavigate();

  // record whether an option is selected
  const check = (value) => {
    if (amenitie.indexOf(value) !== -1) {
      return true;
    }
    return false;
  };

  // store check
  const addCheck = (value) => {
    const index = amenitie.indexOf(value);
    if (index === -1) {
      setAmenitie([...amenitie, value]);
    } else {
      const temp = [...amenitie];
      temp.splice(index, 1);
      setAmenitie(temp);
    }
  };

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
            label="a button to go to previous step"
            onClick={() => {
              const pathname =
                path === 'edit'
                  ? `/mylistings/${path}/${id}`
                  : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?propertyinfo'
              });
            }}
          >
            <ArrowCircleLeftOutlinedIcon style={{ transform: 'scale(2.5)' }} />
          </IconButton>
        </Grid>
        <Grid item xs={8} sm={4} align="left">
          <Paper
            style={{
              backgroundColor: 'rgb(255,255,255,0.6)',
              color: 'black',
              borderRadius: '20px'
            }}
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={1} align="left"></Grid>
              <Grid item xs={10} align="left">
                <div>Step 5</div>
                <div>What amenities are provided?</div>
              </Grid>
              <Grid item xs={1} align="left"></Grid>

              <Grid item xs={1} align="left"></Grid>
              <Grid item xs={10} align="left">
                <FormGroup>
                  <Grid container alignItems={'center'} justify={'center'}>
                    <Grid item xs={12} sm={6} align="left">
                      {/* daily necessities */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="daily"
                            checked={check('Daily necessities')}
                          />
                        }
                        label={
                          <div>
                            <div>Daily necessities</div>
                          </div>
                        }
                        onChange={() => addCheck('Daily necessities')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {/* cooking supplies */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="cooking"
                            checked={check('Cooking supplies')}
                          />
                        }
                        label={
                          <div>
                            <div>Cooking supplies</div>
                          </div>
                        }
                        onChange={() => addCheck('Cooking supplies')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {/* working area */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="workingArea"
                            checked={check('Working area')}
                          />
                        }
                        label={
                          <>
                            <div>Working area</div>
                          </>
                        }
                        onChange={() => addCheck('Working area')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {' '}
                      {/* wifi */}
                      <FormControlLabel
                        control={
                          <Checkbox name="wifi" checked={check('Wifi')} />
                        }
                        label={
                          <>
                            <div>Wifi</div>
                          </>
                        }
                        onChange={() => addCheck('Wifi')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {/* television */}
                      <FormControlLabel
                        control={
                          <Checkbox name="tv" checked={check('Television')} />
                        }
                        label={
                          <>
                            <div>Television</div>
                          </>
                        }
                        onChange={() => addCheck('Television')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {/* air conditioner */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="airConditioner"
                            checked={check('Air-conditioner')}
                          />
                        }
                        label={
                          <>
                            <div>Air-conditioner</div>
                          </>
                        }
                        onChange={() => addCheck('Air-conditioner')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {/* coat hanger */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="coatHanger"
                            checked={check('Coat hanger')}
                          />
                        }
                        label={
                          <>
                            <div>Coat hanger</div>
                          </>
                        }
                        onChange={() => addCheck('Coat hanger')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {/* clothes dryer */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="clothDryer"
                            checked={check('Clothes dryer')}
                          />
                        }
                        label={
                          <>
                            <div>Clothes dryer</div>
                          </>
                        }
                        onChange={() => addCheck('Clothes dryer')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {' '}
                      {/* heating */}
                      <FormControlLabel
                        control={
                          <Checkbox name="heating" checked={check('Heating')} />
                        }
                        label={
                          <>
                            <div>Heating</div>
                          </>
                        }
                        onChange={() => addCheck('Heating')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {/* hair dryer */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="hairDryer"
                            checked={check('Hair dryer')}
                          />
                        }
                        label={
                          <>
                            <div>Hair dryer</div>
                          </>
                        }
                        onChange={() => addCheck('Hair dryer')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {' '}
                      {/* shampoo */}
                      <FormControlLabel
                        control={
                          <Checkbox name="shampoo" checked={check('Shampoo')} />
                        }
                        label={
                          <>
                            <div>Shampoo</div>
                          </>
                        }
                        onChange={() => addCheck('Shampoo')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {' '}
                      {/* fitness facility */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fitness"
                            checked={check('Fitness facility')}
                          />
                        }
                        label={
                          <>
                            <div>Fitness facility</div>
                          </>
                        }
                        onChange={() => addCheck('Fitness facility')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                      {/* parking */}
                      <FormControlLabel
                        control={
                          <Checkbox name="parking" checked={check('Parking')} />
                        }
                        label={
                          <>
                            <div>Parking</div>
                          </>
                        }
                        onChange={() => addCheck('Parking')}
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Grid>
              <Grid item xs={1} align="left"></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} align="center">
          {/* Move to the Next Form */}
          <IconButton
            name="next-step"
            variant="contained"
            width="50%"
            color="success"
            label="a button to goto next step"
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
            <ArrowCircleRightOutlinedIcon style={{ transform: 'scale(2.5)' }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

AmenitieForm.propTypes = {
  path: PropTypes.string,
  amenitie: PropTypes.array,
  setAmenitie: PropTypes.func,
  update: PropTypes.func
};

export default AmenitieForm;
