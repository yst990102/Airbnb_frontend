/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { Button, Grid } from '@mui/material';

function ThumnailUpload ({ type, thumbnails, setThumbnails }) {
  let inputRef = null;

  // upload image
  const upload = async (event) => {
    const img = event.target.files[0];
    try {
      const convertedImg = await fileToDataUrl(img);
      if (type === 'cover') {
        // store in cover thumbnail
        setThumbnails({
          cover: convertedImg,
          addition: thumbnails.addition
        });
      } else {
        // store in addition thumbnail
        setThumbnails({
          cover: thumbnails.cover,
          addition: [...thumbnails.addition, convertedImg]
        });
      }
      event.target.value = '';
    } catch (error) {
      console.log(error);
    }
  };

  // Comp6080 Ass2 Provided
  const fileToDataUrl = (file) => {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const valid = validFileTypes.find((type) => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
      throw Error('provided file is not a png, jpg or jpeg image.');
    }

    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  };

  if (type === 'cover') {
    return (
      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={6}>
          <h3>{type[0].toUpperCase() + type.slice(1)}</h3>
          <h5>Upload one photo for cover</h5>
        </Grid>
        <Grid item xs={6}>
          {thumbnails.cover === '' && (
            <Button
              label="Add img button"
              variant="contained"
              onClick={() => {
                inputRef.click();
              }}
            >
              Add
            </Button>
          )}
          {thumbnails.cover !== '' && (
            <Button
              label="change img button"
              variant="contained"
              onClick={() => {
                inputRef.click();
              }}
            >
              Change
            </Button>
          )}
          <input
            name={`${type}Add`}
            ref={(button) => {
              inputRef = button;
            }}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => upload(event)}
          />
        </Grid>
        <Grid item xs={12}>
          <img
            src={thumbnails.cover}
            alt={'photo of this property show in cover'}
            style={{ 'max-width': '100%' }}
          />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={6}>
          <h3>{type[0].toUpperCase() + type.slice(1)}</h3>
          <h5>Upload any supplementary photo</h5>
        </Grid>
        <Grid item xs={6}>
          <Button
            label="Add img button"
            variant="contained"
            onClick={() => {
              inputRef.click();
            }}
          >
            Add
          </Button>

          <input
            name={`${type}Add`}
            ref={(button) => {
              inputRef = button;
            }}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => upload(event)}
          />
        </Grid>
        <Grid item xs={12}>
          {thumbnails.addition.map((item, index) => {
            // display each addition thumbnail with delete button
            return (
              <Grid
                container
                key={index}
                alignItems={'center'}
                justify={'center'}
              >
                <Grid item xs={10} align="center">
                  <img src={item} alt={`addition uploaded ${type} photo`} />
                </Grid>
                <Grid item xs={2} align="center">
                  <Button
                    variant="contained"
                    onClick={() => {
                      const temp = [...thumbnails.addition];
                      temp.splice(index, 1);
                      setThumbnails({
                        cover: thumbnails.cover,
                        addition: temp
                      });
                    }}
                  >
                    <HighlightOffTwoToneIcon />
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

ThumnailUpload.propTypes = {
  type: PropTypes.string,
  thumbnails: PropTypes.object,
  setThumbnails: PropTypes.func
};

export default ThumnailUpload;
