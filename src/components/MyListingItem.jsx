import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRateIcon from '@mui/icons-material/StarRate';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// styled components
import {
  ListingContainer, // listing container style
  ListingTitle, // listing title
  ListingThumbnailContainer, // listing thumbnail container
  ListingDisplayThumbnail, // displayed thumbnail
  ListingBriefContainer, // listing brief information container
  ListingMainInfoContainer, // listing main information container
  ListingItemContainer, // listing item container
  ListingReviewContainer, // listing review container
  ListingDetaiContainer, // listing detail container
  ManageBookingLink, // mange booking link
  ButtonContainer, // button container
  EditButton, // edit button
  PublishButton, // publish button
  DeleteButton // delete button
} from './style/StyleListing';

// display major information of listing
function MyListingItem ({
  token,
  listingInfo,
  index,
  displayListings,
  setListingInfo,
  setListing,
  setDisplayListings,
  setPopUpDate,
  setSuccess,
  setPattern
}) {
  const [publish] = React.useState(listingInfo.published); // publish flag
  const navigate = useNavigate();

  // get listing average listing
  const getRating = () => {
    let rate = 0;
    const rateNum = listingInfo.reviews.length;

    // sum rating
    for (const review of listingInfo.reviews) {
      rate += review.rate;
    }

    // get average
    if (rateNum) {
      rate /= rateNum;
    }

    return rate.toFixed(1);
  };

  // delete current listing
  const deleteListing = async () => {
    const response = await fetch(
      `https://airbnb-backend-yst990102.cloud.okteto.net/listings/${listingInfo.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      // remove listing from display
      const temp = [...displayListings];
      temp.splice(index, 1);
      setDisplayListings(temp);
      setListing(temp);
    }
  };

  // unpublish this listing
  const unPublish = async () => {
    const response = await fetch(
      `https://airbnb-backend-yst990102.cloud.okteto.net/listings/unpublish/${listingInfo.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      // set this listing to unpublish state
      const temp = [...displayListings];
      temp[index].published = false;
      setListing(temp);
      setDisplayListings(temp);
      setSuccess(true);
      setPattern('unpublish');
    }
  };

  return (
    <ListingContainer>
      <ListingBriefContainer>
        {/* display cover thumbnail */}
        <ListingThumbnailContainer>
          <ListingDisplayThumbnail
            src={listingInfo.thumbnail}
            alt="listing photo"
          />
        </ListingThumbnailContainer>
        <ListingMainInfoContainer>
          {/* listing title */}
          <ListingTitle>{listingInfo.title}</ListingTitle>

          {/* listing evaluation */}
          <ListingReviewContainer>
            {/* rating */}
            <ListingItemContainer color="#FFD700">
              <StarRateIcon />
            </ListingItemContainer>
            <ListingItemContainer>{getRating()}</ListingItemContainer>

            {/* number of reviews */}
            <ListingItemContainer>
              <TextsmsOutlinedIcon />
            </ListingItemContainer>
            <ListingItemContainer>
              {listingInfo.reviews.length}
            </ListingItemContainer>

            {/* listing price */}
            <ListingItemContainer type="cost">
              ${listingInfo.price}
            </ListingItemContainer>
          </ListingReviewContainer>

          {/* delete button to delete this listing */}
          <DeleteButton onClick={() => deleteListing()} label="for delete">
            <DeleteForeverIcon fontSize="large" />
          </DeleteButton>
        </ListingMainInfoContainer>
      </ListingBriefContainer>

      {/* listing information */}
      <ListingDetaiContainer>
        <div>
          <span>Type:&nbsp;</span>
          {listingInfo.metadata.type.propertyType},&nbsp;
          {listingInfo.metadata.type.leaseType}
        </div>
        <div>
          <span>Bed:&nbsp;</span>
          {listingInfo.metadata.propertyInfo.bedsNum}
        </div>
        <div>
          <span>Bathroom:&nbsp;</span>
          {listingInfo.metadata.propertyInfo.bathroomNum}
        </div>

        {/* manage all the booking to this listing */}
        {publish && (
          <div>
            <ManageBookingLink
              onClick={() => {
                navigate({
                  pathname: '/bookings',
                  search: `${listingInfo.id}`
                });
              }}
            >
              Manage booking
            </ManageBookingLink>
          </div>
        )}
        {/* edit button to edit this listing information */}
        <ButtonContainer>
          <EditButton
            name="edit"
            label="edit-button"
            onClick={() => {
              navigate(
                {
                  pathname: `/mylistings/edit/${listingInfo.id}`,
                  search: 'title'
                },
                { state: listingInfo }
              );
              setPattern('edit');
            }}
          >
            Edit
          </EditButton>

          {/* publish button to publish lisitng */}
          {!publish && (
            <PublishButton
              name="publish"
              label="a publish button"
              onClick={() => {
                setListingInfo({
                  id: listingInfo.id,
                  index
                });
                setPopUpDate(true);
                setPattern('publish');
              }}
              aria-controls={`publish${listingInfo.id}`}
              aria-expanded={true}
              aria-haspopup="form"
            >
              Publish
            </PublishButton>
          )}

          {/* unpublish button to unpublish lisitng */}
          {publish && (
            <PublishButton
              name="unpublish"
              label="a unpublish button"
              onClick={() => {
                unPublish();
              }}
            >
              Unpublish
            </PublishButton>
          )}
        </ButtonContainer>
      </ListingDetaiContainer>
    </ListingContainer>
  );
}

MyListingItem.propTypes = {
  token: PropTypes.string,
  listingInfo: PropTypes.object,
  index: PropTypes.number,
  displayListings: PropTypes.array,
  setListingInfo: PropTypes.func,
  setListing: PropTypes.func,
  setDisplayListings: PropTypes.func,
  setPopUpDate: PropTypes.func,
  setSuccess: PropTypes.func,
  setPattern: PropTypes.func
};

export default MyListingItem;
