import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import ThumnailUpload from './ThumnailUpload'; // thumbnail upload component

import { Grid, IconButton, Paper } from '@mui/material';

// input new thumbnails for the listing
function ThumbnailForm ({ thumbnails, path, setThumbnails, update }) {
  const { id } = useParams(); // listing id
  const navigate = useNavigate();

  return (
    <Grid container alignItems={'center'} justify={'center'} height="100%">
      <Grid item xs={2} sm={4} align="center">
        {/* Move to the Previous Form */}
        <IconButton
          label="Move to the Previous Form"
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
              search: '?amenities'
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
              <div>Step 6</div>
              <h3>Add thumbnails of the listing</h3>
            </Grid>
            <Grid item xs={1} align="center"></Grid>

            <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <ThumnailUpload
                type="cover"
                thumbnails={thumbnails}
                setThumbnails={setThumbnails}
              />
            </Grid>
            <Grid item xs={1} align="center"></Grid>

            <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <ThumnailUpload
                type="addition"
                thumbnails={thumbnails}
                setThumbnails={setThumbnails}
              />
            </Grid>
            <Grid item xs={1} align="center"></Grid>
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
          onClick={() => {
            if (thumbnails.cover !== '') {
              const pathname =
                path === 'edit'
                  ? `/mylistings/${path}/${id}`
                  : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?price'
              });
            }
          }}
        >
          <ArrowCircleRightOutlinedIcon style={{ transform: 'scale(2.5)' }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

ThumbnailForm.propTypes = {
  path: PropTypes.string,
  thumbnails: PropTypes.object,
  setThumbnails: PropTypes.func,
  update: PropTypes.func
};

export default ThumbnailForm;
