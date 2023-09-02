import { makeStyles } from '@mui/styles';
import React from 'react';

const BackgroundStyles = makeStyles((theme) => ({
  BackgroundImage: {
    position: 'fixed',
    zIndex: '-100',
    opacity: '0.6',
    objectFit: 'cover',
    height: '100vh',
    width: '100%'
  },
  Background: {
    backgroundColor: 'rgba(240, 186, 189, 0.2)',
    display: 'block',
    position: 'absolute',
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    zIndex: '-50'
  }
}));

export default function Background () {
  const classes = BackgroundStyles();
  return (
    <>
      <div className={classes.Background}>
        <img
          className={classes.BackgroundImage}
          src="https://picsum.photos/1920/1080?travel"
        />
      </div>
    </>
  );
}
