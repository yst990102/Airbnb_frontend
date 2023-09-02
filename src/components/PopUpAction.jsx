import React from 'react';
import PropTypes from 'prop-types';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

// import styled components
import { Wrap } from './style/StyleSideBar'; // background wrap
import {
  PopUpContainer, // popup container
  CloseButtonContainer, // close button
  Question // popup question
} from './style/StylePopUp';

import {
  ActionButtonContainer, // action button container
  UserActionButton // action button
} from './style/StyleBooking';

// popup action to a specific booking
function PopUpAction ({ id, setMsg, setSuccess, setPopUp }) {
  // send action to server
  const action = async (measure) => {
    const token = localStorage.getItem('token');

    const response = await fetch(
      `https://airbnb-backend-yst990102.cloud.okteto.net/bookings/${measure}/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      // action successfull complete
      setMsg(`Successful ${measure}`);
      setSuccess(true);
      setPopUp(false);
    }
  };

  return (
    <>
      <Wrap onClick={() => setPopUp(false)} />
      <PopUpContainer type="booking" id={`action${id}`} role="form">
        <CloseButtonContainer
          onClick={() => setPopUp(false)}
          label="close button"
        >
          <HighlightOffSharpIcon fontSize="large" />
        </CloseButtonContainer>
        <Question>Do you want to accept this booking?</Question>
        <ActionButtonContainer>
          <UserActionButton
            onClick={() => action('accept')}
            background="accept"
            label="accept this booking"
          >
            Accept
          </UserActionButton>

          <UserActionButton
            onClick={() => action('decline')}
            background="decline"
            label="decline this booking"
          >
            Decline
          </UserActionButton>
        </ActionButtonContainer>
      </PopUpContainer>
    </>
  );
}

PopUpAction.propTypes = {
  id: PropTypes.number,
  setMsg: PropTypes.func,
  setSuccess: PropTypes.func,
  setPopUp: PropTypes.func
};

export default PopUpAction;
