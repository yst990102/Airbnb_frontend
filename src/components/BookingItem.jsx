import React from 'react';
import PropTypes from 'prop-types';

// styled components
import {
  ListItem, // list item
  BookingInfo, // booking information
  BookingInfoDetail, // booking detail
  ActionButton // action button
} from './style/StyleBooking';

// request action booking item
function BookingItem ({ booking, setId, setPopUp }) {
  return (
    <ListItem id="newBooking" role="listbox">
      {/* booking information */}
      <BookingInfo>
        {/* booking id */}
        <BookingInfoDetail>
          <span>ID:</span>
          <span>{booking.id}</span>
        </BookingInfoDetail>

        {/* booking start date */}
        <BookingInfoDetail>
          <span>Start:</span>
          <span>{booking.dateRange.start}</span>
        </BookingInfoDetail>

        {/* booking end date */}
        <BookingInfoDetail>
          <span>End:</span>
          <span>{booking.dateRange.end}</span>
        </BookingInfoDetail>

        {/* booking price */}
        <BookingInfoDetail>
          <span>Price:</span>
          <span>${booking.totalPrice}</span>
        </BookingInfoDetail>
      </BookingInfo>
      {/* popup actions container */}
      <ActionButton
        label="a button to popup an action"
        onClick={() => {
          setId(booking.id);
          setPopUp(true);
        }}
      >
        Action
      </ActionButton>
    </ListItem>
  );
}

BookingItem.propTypes = {
  booking: PropTypes.object,
  setId: PropTypes.func,
  setPopUp: PropTypes.func
};

export default BookingItem;
