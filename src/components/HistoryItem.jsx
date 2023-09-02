import React from 'react';
import PropTypes from 'prop-types';

// styled components
import {
  ListItem, // list item
  BookingInfo, // booking information
  BookingInfoDetail, // booking detail
  Status // status
} from './style/StyleBooking';

// hisotry booking item
function HistoryItem ({ booking }) {
  return (
    <ListItem id="historyBooking" role="listbox">
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
      {/* booking status */}
      <Status>{booking.status}</Status>
    </ListItem>
  );
}

HistoryItem.propTypes = {
  booking: PropTypes.object
};

export default HistoryItem;
