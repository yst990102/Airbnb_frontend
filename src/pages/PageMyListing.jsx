import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MyListingItem from '../components/MyListingItem'; // listing item
import PopUpDate from '../components/PopUpDateContainer'; // popup date form
import PopUpMessage from '../components/PopUpMessage'; // popup notification
import HeaderNav from '../components/HeaderNav'; // Header Navigator

import Background from '../img/Background';

// all user listing display in this page
const PageMyListing = () => {
  const urlParam = useLocation().search.slice(1); // url parameter
  const paraLength = urlParam.length; // url parameter length
  // pop up date form flag
  const [popUpDate, setPopUpDate] = React.useState(false);
  const [listingInfo, setListingInfo] = React.useState({}); // listings information
  const [token, setToken] = React.useState(localStorage.getItem('token') || ''); // user token
  const [listing, setListing] = React.useState([]); // listings
  // pattern of current path
  const [pattern, setPattern] = React.useState(
    urlParam.slice(0, paraLength - 8) || ''
  );
  // success flag
  const [success, setSuccess] = React.useState(useLocation().state);
  // displayed listings
  const [displayListings, setDisplayListings] = React.useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // clear prvious router state
  React.useEffect(() => {
    window.history.replaceState({}, '');
  }, []);

  // get all user's listing
  const getOwnListing = async (email) => {
    const response = await fetch('https://airbnb-backend-ewh3.onrender.com/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      const data = await response.json();
      const userListings = []; // user listings
      const listingIds = []; // listing ids

      // get all user listings
      for (const listing of data.listings) {
        if (listing.owner === email) {
          listingIds.push(listing.id);
          userListings.push(
            fetch(`https://airbnb-backend-ewh3.onrender.com/listings/${listing.id}`, {
              method: 'GET',
              headers: {
                'Content-type': 'application/json'
              }
            })
          );
        }
      }

      const detailListingsJson = await Promise.all(userListings);
      const detailListings = [];
      const numListing = detailListingsJson.length;

      // get listing details
      for (let i = 0; i < numListing; ++i) {
        const listing = await detailListingsJson[i].json();
        listing.listing.id = listingIds[i];
        detailListings.push(listing.listing);
      }

      // store listings
      setListing(detailListings);
      setDisplayListings(detailListings);
    }
  };

  React.useEffect(() => {
    const loggedInToken = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');

    // setup page
    if (loggedInToken) {
      setToken(loggedInToken);
      getOwnListing(email);
    } else {
      // return to login page
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
  }, []);

  return (
    <>
      <Background />
      <HeaderNav
        token={token}
        setToken={setToken}
        listings={listing}
        displayListings={displayListings}
        setDisplayListings={setDisplayListings}
      />
      <main
        style={{
          position: 'relative',
          height: 'calc(100vh - 80px)'
        }}
      >
        {displayListings.map((item, index) => {
          return (
            <MyListingItem
              token={token}
              listingInfo={item}
              key={`${index}-${item.published}`}
              index={index}
              displayListings={displayListings}
              setListingInfo={setListingInfo}
              setListing={setListing}
              setDisplayListings={setDisplayListings}
              setPopUpDate={setPopUpDate}
              setSuccess={setSuccess}
              setPattern={setPattern}
            />
          );
        })}

        {/* popup date input field for availability */}
        {popUpDate && (
          <PopUpDate
            token={token}
            listingInfo={listingInfo}
            listing={listing}
            setListing={setListing}
            setPopUpDate={setPopUpDate}
            setSuccess={setSuccess}
          />
        )}
        {/* popup success notification */}
        {success && (
          <PopUpMessage msg={`Successful ${pattern}`} setSuccess={setSuccess} />
        )}
      </main>
    </>
  );
};

export default PageMyListing;
