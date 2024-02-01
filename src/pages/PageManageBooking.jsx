import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import HistoryItem from '../components/HistoryItem'; // History booking
import BookingItem from '../components/BookingItem'; // new booking
import PopUpAction from '../components/PopUpAction'; // popup action
import PopUpMessage from '../components/PopUpMessage'; // popup message
import HeaderNav from '../components/HeaderNav'; // Header Navigator
import Background from '../img/Background';

import {
  BookingSummary, // booking summary container
  BookingSummaryItem, // booking summary item
  InfoContainer, // information container
  ViewBookingButton, // view booking button
  ViewHistoryButton, // view history button
  List // list container
} from '../components/style/StyleBooking';

const PageManageBooking = () => {
  const [token, setToken] = React.useState(localStorage.getItem('token') || ''); // user token
  const listingId = useLocation().search.slice(1); // listing id
  const [pendings, setPendings] = React.useState([]); // new booking
  const [processed, setProcessed] = React.useState([]); // history booking
  const [onlineDays, setOnlineDays] = React.useState(0); // online days
  const [bookedDays, setBookedDays] = React.useState(0); // booked days
  const [profit, setProfit] = React.useState(0); // profit
  const [id, setId] = React.useState(0); // booking id
  const [popUp, setPopUp] = React.useState(false); // popup flag
  const [success, setSuccess] = React.useState(false); // success flag
  const [msg, setMsg] = React.useState(''); // popup message
  // view history flag
  const [viewHistory, setViewHistory] = React.useState(false);
  // view new booking flag
  const [viewNewBooking, setViewNewBooking] = React.useState(false);
  const navigate = useNavigate();

  // get online days
  const getOnlineDays = async (current) => {
    const response = await fetch(
      `https://airbnb-backend.up.railway.app/listings/${listingId}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      }
    );

    if (response.status === 200) {
      // calculate number of days
      const data = await response.json();
      const postDate = new Date(data.listing.postedOn);
      const year = current.getFullYear() - postDate.getFullYear();
      const month = current.getMonth() - postDate.getMonth();
      const day = current.getDate() - postDate.getDate();
      let numDays = '';

      if (day > 1) {
        numDays = `${day} days`;
      } else if (day === 1) {
        numDays = `${day} day`;
      }

      if (month > 1) {
        numDays = `${month} months` + numDays;
      } else if (month === 1) {
        numDays = `${month} month` + numDays;
      }

      if (year > 1) {
        numDays = `${year} years` + numDays;
      } else if (year === 1) {
        numDays = `${year} year` + numDays;
      }

      // store number of days
      setOnlineDays(numDays);
    }
  };

  // get booking days in this year
  const getDays = (current, booking) => {
    const startDate = new Date(booking.dateRange.start);
    const endDate = new Date(booking.dateRange.end);
    const curretnYear = current.getFullYear();

    // booking happens before this year
    if (startDate.getFullYear() < curretnYear) {
      if (endDate.getFullYear() > curretnYear) {
        // booking end in next year
        const yearEnd = new Date(`${curretnYear + 1}-1-1`).getTime();
        const yearStart = new Date(`${curretnYear}-1-1`).getTime();
        return Math.floor((yearEnd - yearStart) / (1000 * 60 * 60 * 24));
      } else if (endDate.getFullYear() < curretnYear) {
        // booking end in previous year
        return 0;
      } else {
        // booking end in this year
        const endDateMs = endDate.getTime();
        const yearStart = new Date(`${curretnYear}-1-1`).getTime();
        return Math.floor((endDateMs - yearStart) / (1000 * 60 * 60 * 24));
      }
    } else if (startDate.getFullYear() > curretnYear) {
      // booking start next year
      return 0;
    } else {
      // booking start and end in this year
      const dateEnd = endDate.getTime();
      const dateStart = startDate.getTime();
      return Math.floor((dateEnd - dateStart) / (1000 * 60 * 60 * 24));
    }
  };

  // setup all bookins depending on history and new bookings
  const setup = async (response) => {
    const data = await response.json();
    const allPendingBookings = [];
    const allProcessBookings = [];
    const current = new Date();
    let numDays = 0;
    let totalProfit = 0;

    for (const booking of data.bookings) {
      if (booking.listingId === listingId) {
        if (booking.status === 'pending') {
          // store new bookings
          allPendingBookings.push(booking);
        } else {
          // store history bookings
          allProcessBookings.push(booking);
          if (booking.status === 'accepted') {
            // add days and profit for accepted bookings
            numDays += getDays(current, booking);
            totalProfit += booking.totalPrice;
          }
        }
      }
    }

    // store information
    setPendings(allPendingBookings);
    setProcessed(allProcessBookings);
    getOnlineDays(current);
    setBookedDays(numDays);
    setProfit(totalProfit);
  };

  React.useEffect(async () => {
    const userToken = localStorage.getItem('token');

    // user not login
    if (!userToken) {
      navigate('/');
    }

    setToken(userToken);

    // get all bookings
    const response = await fetch('https://airbnb-backend.up.railway.app/bookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    });

    if (response.status === 200) {
      setup(response);
    }
  }, [msg]);

  return (
    <>
      <Background />
      <HeaderNav token={token} setToken={setToken} />
      <main
        style={{
          position: 'relative',
          height: 'calc(100vh - 80px)'
        }}
      >
        {/* booking summary */}
        <BookingSummary>
          {/* number of days since online */}
          <BookingSummaryItem>
            <span>Online:</span>
            <span>{onlineDays}</span>
          </BookingSummaryItem>

          {/* accepted days in this year */}
          <BookingSummaryItem>
            <span>Accepted:</span>
            <span>{bookedDays} days</span>
          </BookingSummaryItem>

          {/* earn profit in this year */}
          <BookingSummaryItem>
            <span>Profit:</span>
            <span>${profit}</span>
          </BookingSummaryItem>
        </BookingSummary>
        {/* view all new booking */}
        <InfoContainer>
          {!viewNewBooking && (
            <ViewBookingButton
              onClick={() => setViewNewBooking(true)}
              aria-controls="newBooking"
              aria-expanded={true}
              aria-haspopup="listbox"
              label="view all new booking"
            >
              View New Booking
              <ExpandMoreIcon fontSize="large" />
            </ViewBookingButton>
          )}
          {/* close all new booking */}
          {viewNewBooking && (
            <>
              <ViewBookingButton
                onClick={() => setViewNewBooking(false)}
                aria-controls="newBooking"
                aria-expanded={false}
                aria-haspopup="listbox"
                label="close all new booking"
              >
                Close New Booking
                <ExpandLessIcon fontSize="large" />
              </ViewBookingButton>

              {/* display all new listings */}
              <List>
                {pendings.map((item, index) => {
                  return (
                    <BookingItem
                      key={`booking-${index}`}
                      booking={item}
                      setId={setId}
                      setPopUp={setPopUp}
                    />
                  );
                })}
              </List>
            </>
          )}
        </InfoContainer>
        {/* open all history booking */}
        <InfoContainer>
          {!viewHistory && (
            <ViewHistoryButton
              onClick={() => setViewHistory(true)}
              aria-controls="historyBooking"
              aria-expanded={false}
              aria-haspopup="listbox"
              label="open all history booking"
            >
              View History
              <ExpandMoreIcon fontSize="large" />
            </ViewHistoryButton>
          )}
          {/* close all history booking */}
          {viewHistory && (
            <>
              <ViewHistoryButton
                onClick={() => setViewHistory(false)}
                aria-controls="historyBooking"
                aria-expanded={true}
                aria-haspopup="listbox"
                label="close all history booking"
              >
                Close History
                <ExpandLessIcon fontSize="large" />
              </ViewHistoryButton>

              {/* display all hisotry listings */}
              <List>
                {viewHistory &&
                  processed.map((item, index) => {
                    return (
                      <HistoryItem key={`history-${index}`} booking={item} />
                    );
                  })}
              </List>
            </>
          )}
        </InfoContainer>

        {/* popup action container */}
        {popUp && (
          <PopUpAction
            id={id}
            setMsg={setMsg}
            setSuccess={setSuccess}
            setPopUp={setPopUp}
            aria-controls={`action${id}`}
            aria-expanded={false}
            role="form"
          />
        )}

        {/* success notification after action */}
        {success && <PopUpMessage msg={msg} setSuccess={setSuccess} />}
      </main>
    </>
  );
};

export default PageManageBooking;
