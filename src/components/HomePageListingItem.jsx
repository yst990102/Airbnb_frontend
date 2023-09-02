import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRateIcon from '@mui/icons-material/StarRate';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

// import styled components
import {
  HomeListingContainer, // listing container
  HomeListingThumbnail, // listing thumbnail container
  ListingDisplayThumbnail, // listing thumbnail
  HomeListingInfoContainer, // listing information container
  HomeListingTitle, // listing title container
  HomeListingReviews, // listing reviews container
  ListingItemContainer // listing detail information container
} from './style/StyleListing';

function HomePageListingItem ({ listing, day }) {
  const navigate = useNavigate();
  return (
    <>
      <HomeListingContainer
        id={`listing_${listing.id}`}
        role="button"
        onClick={() => {
          navigate(
            {
              pathname: `/listings/${listing.id}`
            },
            { state: day }
          );
        }}
      >
        {/* cover thumbnail for this listing */}
        <HomeListingThumbnail>
          <ListingDisplayThumbnail src={listing.thumbnail} />
        </HomeListingThumbnail>
        <HomeListingInfoContainer>
          {/* listing title */}
          <HomeListingTitle title={listing.title}>
            {listing.title.length > 15 && listing.title.slice(0, 15) + '...'}
            {listing.title.length <= 15 && listing.title}
          </HomeListingTitle>
          <HomeListingReviews>
            {/* listing rating */}
            <ListingItemContainer color="#FFD700">
              <StarRateIcon />
              &nbsp;
            </ListingItemContainer>
            <ListingItemContainer>
              {listing.rate.toFixed(1)}&nbsp;
            </ListingItemContainer>

            {/* listing number of reviews */}
            <ListingItemContainer>
              <TextsmsOutlinedIcon />
              &nbsp;
            </ListingItemContainer>
            <ListingItemContainer>
              {listing.reviews.length}
            </ListingItemContainer>
          </HomeListingReviews>
        </HomeListingInfoContainer>
      </HomeListingContainer>
    </>
  );
}

HomePageListingItem.propTypes = {
  listing: PropTypes.object,
  day: PropTypes.number
};

export default HomePageListingItem;
