import React from 'react';
import { useParams } from 'react-router-dom';
import StarRateIcon from '@mui/icons-material/StarRate';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

import { Comment } from 'semantic-ui-react';

import Background from '../img/Background';

import PopUpInfo from '../components/PopUpInfo'; // popup information
import PopUpBooking from '../components/PopUpBooking'; // popup booking
import PopUpMessage from '../components/PopUpMessage'; // popup message
import PopUpStatus from '../components/PopUpStatus'; // popup status
import PopUpReviews from '../components/PopUpReviews'; // popup all review
import PopUpLeaveReview from '../components/PopUpLeaveReview'; // popup leave review
// import UserReview from '../components/UserReview'; // user review container
import HeaderNav from '../components/HeaderNav'; // Header Navigator
import { Button, Grid, Paper } from '@mui/material';

// displaying all the information of a specific listing
const PageListingDetail = () => {
  const { id } = useParams(); // listing id
  const [token, setToken] = React.useState(localStorage.getItem('token') || ''); // user tokoen
  const [listing, setListing] = React.useState({}); // listing information
  const [load, setLoad] = React.useState(false); // load flag
  const [popUp, setPopUp] = React.useState(false); // popup flag
  const [status, setStatus] = React.useState(false); // popup status flag
  const [book, setBook] = React.useState(false); // popup booking flag
  // popup message flag
  const [popUpMessage, setPopUpMessage] = React.useState(false);
  // popup leave review flag
  const [popUpReviews, setPopUpReviews] = React.useState(false);
  const [popUpLeaveReview, setPopUpLeaveReview] = React.useState(false);
  const [bookingId, setBookingId] = React.useState(''); // booking id
  const [message, setMessage] = React.useState(''); // notification
  const address = listing.address; // address

  // get information of listing
  const loadInfo = async () => {
    const response = await fetch(`https://airbnb-backend.up.railway.app/listings/${id}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    });

    // store listing information
    if (response.status === 200) {
      const data = (await response.json()).listing;
      const numReviews = data.reviews.length;
      let rate = 0;

      // get rate
      for (const review of data.reviews) {
        rate += review.rate;
      }

      if (numReviews) {
        rate /= numReviews;
      }
      data.rate = rate;

      // store listing
      setListing(data);
      console.log(listing);

      // premission to display on screen
      setLoad(true);
    }
  };

  // action after page load
  React.useEffect(() => {
    const loggedInToken = localStorage.getItem('token');

    if (loggedInToken) {
      setToken(loggedInToken);
    }

    if (popUpLeaveReview === false) {
      // load all information
      loadInfo();
    }
  }, [popUpLeaveReview]);

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
        <Grid container>
          <Grid item xs={1} sm={2} md={3}></Grid>
          <Grid item xs={10} sm={8} md={6}>
            <Paper
              style={{
                backgroundColor: 'rgb(255,255,255,0.6)',
                color: 'black',
                borderRadius: '20px'
              }}
            >
              <Grid
                container
                alignItems={'center'}
                justify={'center'}
                rowSpacing={2}
              >
                <Grid item xs={1} align="center"></Grid>
                <Grid item xs={10} align="center">
                  <img
                    src={listing.thumbnail}
                    style={{ 'max-width': '100%' }}
                  />
                </Grid>
                <Grid item xs={1} align="center"></Grid>
                <Grid item xs={1} align="center"></Grid>
                {/* Status Button */}
                <Grid item xs={5} align="center">
                  <Button variant="contained" onClick={() => setStatus(true)}>
                    Status
                  </Button>
                </Grid>
                {/* Book Button */}
                <Grid item xs={5} align="center">
                  <Button variant="contained" onClick={() => setBook(true)}>
                    Book
                  </Button>
                </Grid>
                <Grid item xs={1} align="center"></Grid>

                {/* Listing Detail Title */}
                <Grid item xs={2} align="center">
                  <SubtitlesOutlinedIcon />
                </Grid>
                <Grid item xs={2} align="center">
                  {listing.title}
                </Grid>
                {/* Listing Detail Rating */}
                <Grid item xs={4} align="center">
                  <span color="#FFD700">
                    <StarRateIcon />
                  </span>
                  <span>{load && listing.rate.toFixed(1)}</span>
                  <span>&nbsp;</span>
                </Grid>
                {/* Listing Detail Review Number */}
                <Grid item xs={4} align="center">
                  <span>
                    <TextsmsOutlinedIcon />
                  </span>
                  <span>{load && listing.reviews.length}</span>
                </Grid>
                {/* Listing Detail Address */}
                <Grid item xs={1} align="center"></Grid>
                <Grid item xs={5} align="center">
                  <PlaceOutlinedIcon />
                  {load &&
                    `${address.street}, ${address.city}, ${address.state}, ${address.country}`}
                </Grid>
                {/* Listing Detail Price */}
                <Grid item xs={5} align="center">
                  <PaidOutlinedIcon />
                  {load && listing.price} per night
                </Grid>
                <Grid item xs={1} align="center"></Grid>
                {/* Listing Detail Type */}
                <Grid item xs={1} align="center"></Grid>
                <Grid item xs={5} align="center">
                  {load && (
                    <>
                      <HomeOutlinedIcon />
                      {listing.metadata.type.propertyType}
                    </>
                  )}
                </Grid>
                <Grid ite xs={5} align="center">
                  {load && (
                    <>
                      <VpnKeyOutlinedIcon />
                      {listing.metadata.type.leaseType}
                    </>
                  )}
                </Grid>
                <Grid item xs={1} align="center"></Grid>
                {/* Listing Detail Rooms Info */}
                <Grid item xs={1} align="center"></Grid>
                <Grid item xs={3} align="center">
                  {load && (
                    <>
                      <BedroomChildOutlinedIcon />
                      {listing.metadata.propertyInfo.bedroomNum}
                    </>
                  )}
                </Grid>
                <Grid item xs={4} align="center">
                  {load && (
                    <>
                      <BathroomOutlinedIcon />
                      {listing.metadata.propertyInfo.bathroomNum}
                    </>
                  )}
                </Grid>
                <Grid item xs={3} align="center">
                  {load && (
                    <>
                      <BedOutlinedIcon />
                      {listing.metadata.propertyInfo.bedsNum}
                    </>
                  )}
                </Grid>
                <Grid item xs={1} align="center"></Grid>
                {/* Listing Detail Amenities */}
                <Grid item xs={1} align="center"></Grid>
                <Grid item xs={10} align="center">
                  <h3>Amenitie</h3>
                  <Grid container>
                    {load &&
                      listing.metadata.amenitie.map((item, index) => {
                        return (
                          <Grid key={index} item xs={6}>
                            {item}
                          </Grid>
                        );
                      })}
                  </Grid>
                </Grid>
                <Grid item xs={1} align="center"></Grid>
                {/* Listing Detail Review Details */}
                <Grid item xs={1} align="center"></Grid>
                <Grid item xs={10} align="center">
                  <h3>Reviews</h3>
                  <Comment.Group>
                    {load &&
                      listing.reviews.map((item, index) => {
                        console.log(item);
                        const timeMs = new Date(item.date);
                        const date = `${timeMs.getDate()}/${timeMs.getMonth()}/${timeMs.getFullYear()}`;
                        return (
                          <>
                            <Grid container wrap="nowrap" spacing={2}>
                              <Grid item>
                                <StarRateIcon />
                                {item.rate}
                              </Grid>
                              <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: 'left' }}>
                                  Comment Details:
                                </h4>
                                <p style={{ textAlign: 'left' }}>
                                  {' '}
                                  {item.comment}{' '}
                                </p>
                                <p style={{ textAlign: 'left', color: 'gray' }}>
                                  posted on {date}
                                </p>
                              </Grid>
                            </Grid>
                          </>
                        );
                      })}
                  </Comment.Group>
                </Grid>
                <Grid item xs={1} align="center"></Grid>

                <Grid item xs={12} align="center"></Grid>
                <Grid item xs={12} align="center"></Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} sm={2} md={3}></Grid>
        </Grid>

        {/* popup amenities list */}
        {popUp && (
          <PopUpInfo
            amenitie={listing.metadata.amenitie}
            setPopUp={setPopUp}
            role="listbox"
            id="moreAmenitie"
          />
        )}
        {/* popup reviews list */}
        {popUpReviews && (
          <PopUpReviews
            reviews={listing.reviews}
            setPopUpReviews={setPopUpReviews}
            role="listbox"
            id="moreReviews"
          />
        )}
        {/* popup booking status list */}
        {status && (
          <PopUpStatus
            id={id}
            setStatus={setStatus}
            setBookingId={setBookingId}
            setPopUpLeaveReview={setPopUpLeaveReview}
            role="listbox"
          />
        )}
        {/* popup booking */}
        {book && (
          <PopUpBooking
            id={id}
            price={listing.price}
            setBook={setBook}
            setPopUpMessage={setPopUpMessage}
            setMessage={setMessage}
            role="form"
          />
        )}
        {/* popup leave review */}
        {popUpLeaveReview && (
          <PopUpLeaveReview
            listingId={id}
            bookingId={bookingId}
            setPopUpLeaveReview={setPopUpLeaveReview}
            setPopUpMessage={setPopUpMessage}
            setMessage={setMessage}
          />
        )}
        {/* popup notification */}
        {popUpMessage && (
          <PopUpMessage msg={message} setSuccess={setPopUpMessage} />
        )}
      </main>
    </>
  );
};

export default PageListingDetail;
