import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

function PasswordButton ({ onClick, ariaLabel, icon }) {
  return (
    <IconButton onClick={() => onClick()} label="show/hide password button">
      {icon}
    </IconButton>
  );
}

PasswordButton.propTypes = {
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  icon: PropTypes.object
};

export default PasswordButton;
