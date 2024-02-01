import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

// import styled components
import { DateContainer } from './style/StyleContainer'; // date container
import { DateInput } from './style/StyleForm'; // input field for date
import { Wrap } from './style/StyleSideBar'; // background wrap
import {
  PopUpContainer, // popup container
  CloseButtonContainer, // close button
  PublishButton // publish button
} from './style/StylePopUp';

// popup booking container to book a listing
function PopUpBooking ({ id, price, setBook, setPopUpMessage, setMessage }) {
  const token = localStorage.getItem('token'); // user token
  const [warn, setWarn] = React.useState(false); // warn flag
  const [from, setFrom] = React.useState(''); // booking start date
  const [to, setTo] = React.useState(''); // booking end date
  // date range
  const [date, setDate] = React.useState({
    start: '',
    end: ''
  });
  const navigate = useNavigate();
  const location = useLocation(); // url path

  // check whether input date is in correct format
  const checkAvailability = () => {
    const fromms = Date.parse(date.start);
    const toms = Date.parse(date.end);

    // no date enter or start day is late than end date
    if (date.start === '' || fromms >= toms) {
      return false;
    }
    return true;
  };

  // send book request to server
  const book = async () => {
    // user not login jump, to login page
    if (!token) {
      navigate(
        {
          pathname: '/login'
        },
        {
          state: {
            pathname: location.pathname,
            search: location.search
          }
        }
      );
    }

    // get number of days of booking
    const day =
      (Date.parse(date.end) - Date.parse(date.start)) / (1000 * 60 * 60 * 24);
    const response = await fetch(`https://airbnb-backend.up.railway.app/bookings/new/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        dateRange: date,
        totalPrice: price * day
      })
    });

    if (response.status === 200) {
      // popup success message
      setBook(false);
      setPopUpMessage(true);
      setMessage('Successfull booked');
    }
  };

  // set start and end date after both data is enter
  React.useEffect(() => {
    if (from !== '' && to !== '') {
      setDate({
        start: from,
        end: to
      });
    }
  }, [from, to]);

  return (
    <>
      <Wrap onClick={() => setBook(false)} />
      <PopUpContainer id={`book${id}`} role="form">
        <CloseButtonContainer
          onClick={() => setBook(false)}
          label="close button"
        >
          <HighlightOffSharpIcon fontSize="large" />
        </CloseButtonContainer>
        <h3>Booking</h3>
        {/* date form */}
        <DateContainer>
          {/* start date input field */}
          <DateInput
            name="from"
            type="date"
            onChange={(event) => {
              setFrom(event.target.value);
              setWarn(false);
            }}
            value={from}
            warn={warn}
          />
          &nbsp;to&nbsp;
          {/* end date input field */}
          <DateInput
            name="to"
            type="date"
            onChange={(event) => {
              setTo(event.target.value);
              setWarn(false);
            }}
            value={to}
            warn={warn}
          />
        </DateContainer>
        <PublishButton
          name="submit"
          label="publish button"
          onClick={() => {
            if (checkAvailability()) {
              book();
            } else {
              setWarn(true);
            }
          }}
        >
          Book
        </PublishButton>
      </PopUpContainer>
    </>
  );
}

PopUpBooking.propTypes = {
  id: PropTypes.string,
  price: PropTypes.number,
  setBook: PropTypes.func,
  setPopUpMessage: PropTypes.func,
  setMessage: PropTypes.func
};

export default PopUpBooking;
