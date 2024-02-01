import React from 'react';

import HomePageListingItem from '../components/HomePageListingItem'; // listing item
import HeaderNav from '../components/HeaderNav'; // Header Navigator
import Background from '../img/Background';
import { Grid } from '@mui/material';

const PageHome = () => {
  // user token
  const [token, setToken] = React.useState(localStorage.getItem('token') || '');

  // listings for display
  const [displayListings, setDisplayListings] = React.useState([]);
  const [listings, setListing] = React.useState([]); // origin listings
  const [day, setDay] = React.useState(1); // number of day

  // get average listing rating
  const getRating = (listing) => {
    let rate = 0;
    const rateNum = listing.reviews.length;

    // sum all the rate
    for (const review of listing.reviews) {
      rate += review.rate;
    }

    // get average
    if (rateNum) {
      rate /= rateNum;
    }

    return rate;
  };

  // get listing detail
  const sendGetDetailListing = (id) => {
    return fetch(`https://airbnb-backend.up.railway.app/listings/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  // get all listings
  const getAllListing = async (email) => {
    const response = await fetch('https://airbnb-backend.up.railway.app/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      // booking id
      const bookingIds = new Set();

      // if user login, get all the booking id
      if (token) {
        const allBookingsResponse = await fetch(
          'https://airbnb-backend.up.railway.app/bookings',
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (allBookingsResponse.status === 200) {
          const allBookings = await allBookingsResponse.json();

          // get listing id that booked by user
          for (const booking of allBookings.bookings) {
            if (booking.owner === email) {
              bookingIds.add(booking.listingId);
            }
          }
        }
      }

      const data = await response.json();
      const breifListings = []; // all valid listings
      const bookListings = []; // all booked listings
      const breifListingIds = []; // all valid listings id
      const bookListingIds = []; // all booked listings id

      for (const listing of data.listings) {
        if (bookingIds.has(listing.id.toString())) {
          // store booked booking
          bookListings.push(sendGetDetailListing(listing.id));
          bookListingIds.push(listing.id);
        } else if (listing.owner !== email) {
          // store normal listing
          breifListings.push(sendGetDetailListing(listing.id));
          breifListingIds.push(listing.id);
        }
      }

      // get response data
      const detailListingsJson = await Promise.all(breifListings);
      const detailBookListingJson = await Promise.all(bookListings);

      const bookedListings = []; // booking listings
      const unbookedListing = []; // unbooking listings
      const numListing = detailListingsJson.length;
      const bookNum = detailBookListingJson.length;

      // get user own booking listings
      for (let i = 0; i < bookNum; i++) {
        const listing = await detailBookListingJson[i].json();

        // ignore those not published listing
        if (listing.listing.published === false) {
          continue;
        }
        // get rating
        listing.listing.rate = getRating(listing.listing);
        // get id
        listing.listing.id = bookListingIds[i];
        bookedListings.push(listing.listing);
      }

      // get user normal listings
      for (let i = 0; i < numListing; ++i) {
        const listing = await detailListingsJson[i].json();

        // ignore those not published listing
        if (listing.listing.published === false) {
          continue;
        }
        // get rating
        listing.listing.rate = getRating(listing.listing);
        // get id
        listing.listing.id = breifListingIds[i];
        unbookedListing.push(listing.listing);
      }

      // sort listing
      bookedListings.sort((a, b) => a.title.localeCompare(b.title));
      unbookedListing.sort((a, b) => a.title.localeCompare(b.title));

      // store listings in state
      setListing(bookedListings.concat(unbookedListing));
      setDisplayListings(bookedListings.concat(unbookedListing));
    }
  };

  // action after page load
  React.useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const timeout = localStorage.getItem('timeout');

    // clear time out from login/register
    if (timeout) {
      clearTimeout(timeout);
    }
    // initlize all listing in home page
    getAllListing(email);
  }, [token]);

  return (
    <>
      <Background />
      <HeaderNav
        token={token}
        setToken={setToken}
        listings={listings}
        displayListings={displayListings}
        setDay={setDay}
        setDisplayListings={setDisplayListings}
      />
      <main>
        {/* display all listings */}
        <Grid container>
          <Grid item xs={1} sm={2} md={3}></Grid>
          {displayListings.map((item, index) => {
            return (
              <>
                <Grid item key={item.id} xs={10} sm={8} md={6}>
                  <HomePageListingItem listing={item} day={day} />
                </Grid>
              </>
            );
          })}
          <Grid item xs={1} sm={2} md={3}></Grid>
        </Grid>
      </main>
    </>
  );
};

export default PageHome;
