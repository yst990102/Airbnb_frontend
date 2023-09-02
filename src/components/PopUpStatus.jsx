import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

// import styled components
import { Wrap } from './style/StyleSideBar'; // background wrap
// leave review button
import { LeaveReivewButton } from './style/StyleListing';
import {
  AllBookingContainer, // display all bookings container
  DateInfoContainer, // date of booking container
  DateInfo, // date
  Booking, // booking container
  StatusContainer // booking status
} from './style/StyleContainer';

import {
  PopUpContainer, // popup container
  CloseButtonContainer // close button
} from './style/StylePopUp';

// popup all booking status
function PopUpStatus ({ id, setStatus, setBookingId, setPopUpLeaveReview }) {
  const token = localStorage.getItem('token'); // user token
  const email = localStorage.getItem('userEmail'); // user email
  const [bookings, setBookings] = React.useState([]); // bookings
  const navigate = useNavigate();

  const getAllBooking = async () => {
    // user not login jump, to login page
    if (!token) {
      navigate('/login');
    }

    const myBooking = [];

    const response = await fetch('http://localhost:4000/bookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      // get all user's booking
      for (const booking of data.bookings) {
        if (booking.owner === email && booking.listingId === id) {
          myBooking.push(booking);
        }
      }

      // store bookings
      setBookings(myBooking);
    }
  };

  // get all booking when component load
  React.useEffect(() => {
    getAllBooking();
  }, []);

  return (
    <>
      <Wrap onClick={() => setStatus(false)} />
      <PopUpContainer id={`status${id}`} role="listbox">
        <CloseButtonContainer
          label="close button"
          onClick={() => setStatus(false)}
        >
          <HighlightOffSharpIcon fontSize="large" />
        </CloseButtonContainer>
        <h3>Booking</h3>
        {/* display all previous bookings */}
        <AllBookingContainer>
          {bookings.map((item, index) => {
            return (
              <Booking key={item.id}>
                <DateInfoContainer>
                  {/* start date of a booking */}
                  <DateInfo>
                    <div>From:</div>
                    <div>{item.dateRange.start}</div>
                  </DateInfo>
                  {/* end date of a booking */}
                  <DateInfo>
                    <div>To:</div>
                    <div>{item.dateRange.end}</div>
                  </DateInfo>
                </DateInfoContainer>
                {/* status of a booking */}
                <StatusContainer>
                  {item.status}
                  {/* review can be leave if this booking is accepted */}
                  {item.status === 'accepted' && (
                    <LeaveReivewButton
                      onClick={() => {
                        setBookingId(item.id);
                        setPopUpLeaveReview(true);
                      }}
                      aria-controls={`leave${item.id}`}
                      aria-expanded={true}
                      aria-haspopup="form"
                      label="a button for leave review"
                    >
                      Leave Review&nbsp;
                    </LeaveReivewButton>
                  )}
                </StatusContainer>
              </Booking>
            );
          })}
        </AllBookingContainer>
      </PopUpContainer>
    </>
  );
}

PopUpStatus.propTypes = {
  id: PropTypes.string,
  setStatus: PropTypes.func,
  setBookingId: PropTypes.func,
  setPopUpLeaveReview: PropTypes.func
};

export default PopUpStatus;
