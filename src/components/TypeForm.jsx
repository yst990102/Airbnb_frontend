import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import HouseIcon from '@mui/icons-material/House';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import ChairIcon from '@mui/icons-material/Chair';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import { Button, Grid, IconButton, Paper } from '@mui/material';

// input new type for the listing
function TypeForm ({ type, setType, path, update }) {
  const { id } = useParams(); // listing id
  const [propertyType, setPropertyType] = React.useState(
    type.propertyType || ''
  );
  const [leaseType, setLeaseType] = React.useState(type.leaseType || '');

  const navigate = useNavigate();

  const [nextStepDisable, setNextStepDisable] = React.useState(true);

  React.useEffect(() => {
    if (propertyType !== '' && leaseType !== '') {
      setNextStepDisable(false);
    }
  }, [propertyType, leaseType]);

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
                search: '?address'
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
              {/* Step Title */}
              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <div>Step 3</div>
                <h3>Types of your listing</h3>
                {nextStepDisable === true && (
                  <h5>(Enter info below to enable next-step button)</h5>
                )}
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              {/* Property Type Detail of Listing */}
              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <Grid container>
                  <Grid xs={12} align="center">
                    <h3>Property Type</h3>
                  </Grid>
                  <Grid xs={6} sm={4} align="center">
                    {/* property type of flat */}
                    <Button
                      fullWidth
                      variant={
                        propertyType === 'Flat' ? 'contained' : 'outlined'
                      }
                      onClick={() => {
                        setPropertyType('Flat');
                      }}
                    >
                      Flat
                    </Button>
                  </Grid>
                  <Grid xs={6} sm={4} align="center">
                    {/* property type of house */}
                    <Button
                      fullWidth
                      variant={
                        propertyType === 'House' ? 'contained' : 'outlined'
                      }
                      onClick={() => {
                        setPropertyType('House');
                      }}
                    >
                      House
                    </Button>
                  </Grid>
                  <Grid xs={6} sm={4} align="center">
                    {/* property type of villa */}
                    <Button
                      fullWidth
                      variant={
                        propertyType === 'Villa' ? 'contained' : 'outlined'
                      }
                      onClick={() => {
                        setPropertyType('Villa');
                      }}
                    >
                      Villa
                    </Button>
                  </Grid>
                  <Grid xs={6} sm={4} align="center">
                    {/* property type of loft */}
                    <Button
                      fullWidth
                      variant={
                        propertyType === 'Loft' ? 'contained' : 'outlined'
                      }
                      onClick={() => {
                        setPropertyType('Loft');
                      }}
                    >
                      Loft
                    </Button>
                  </Grid>
                  <Grid xs={6} sm={4} align="center">
                    {/* property type of batch */}
                    <Button
                      fullWidth
                      variant={
                        propertyType === 'Townhouse' ? 'contained' : 'outlined'
                      }
                      onClick={() => {
                        setPropertyType('Townhouse');
                      }}
                    >
                      Townhouse
                    </Button>
                  </Grid>
                  <Grid xs={6} sm={4} align="center">
                    {/* property type of cabin */}
                    <Button
                      fullWidth
                      variant={
                        propertyType === 'Apartment' ? 'contained' : 'outlined'
                      }
                      onClick={() => {
                        setPropertyType('Apartment');
                      }}
                    >
                      Apartment
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              {/* Lease Type Detail of Listing */}
              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <Grid container>
                  <Grid xs={12} align="center">
                    <h3>Lease type</h3>
                  </Grid>
                  <Grid xs={12} md={4} align="center">
                    {/* lease type of entire */}
                    <Button
                      fullWidth
                      variant={
                        leaseType === 'entire' ? 'contained' : 'outlined'
                      }
                      onClick={() => {
                        setLeaseType('entire');
                      }}
                    >
                      <HouseIcon />
                      Entire property
                    </Button>
                  </Grid>
                  <Grid xs={12} md={4} align="center">
                    {/* lease type of independent */}
                    <Button
                      fullWidth
                      variant={
                        leaseType === 'independent' ? 'contained' : 'outlined'
                      }
                      onClick={() => {
                        setLeaseType('independent');
                      }}
                    >
                      <SensorDoorIcon />
                      Independent room
                    </Button>
                  </Grid>
                  <Grid xs={12} md={4} align="center">
                    {/* lease type of share */}
                    <Button
                      fullWidth
                      variant={leaseType === 'share' ? 'contained' : 'outlined'}
                      onClick={() => {
                        setLeaseType('share');
                      }}
                    >
                      <ChairIcon />
                      Share property
                    </Button>
                  </Grid>
                </Grid>
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
            onClick={() => {
              const pathname =
                path === 'edit'
                  ? `/mylistings/${path}/${id}`
                  : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?propertyinfo'
              });

              // store property information
              setType({
                propertyType,
                leaseType
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

TypeForm.propTypes = {
  path: PropTypes.string,
  type: PropTypes.object,
  setType: PropTypes.func,
  update: PropTypes.func
};

export default TypeForm;
