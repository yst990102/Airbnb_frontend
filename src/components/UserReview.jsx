import React from 'react';
import PropTypes from 'prop-types';
import StarRateIcon from '@mui/icons-material/StarRate';

// import styled components
// rate container
import { RateInfo } from '../components/style/StyleContainer';
import {
  ViewListingEvaluate, // listing evaluation container
  ListingItemContainer, // listing inforamtion container
  Review, // review detail container
  ReviewDate // review date container
} from '../components/style/StyleListing';

function UserReview ({ item }) {
  const timeMs = new Date(item.date);
  const date = `${timeMs.getDate()}/${timeMs.getMonth()}/${timeMs.getFullYear()}`;

  return (
    <Review>
      <RateInfo>
        {/* review date */}
        <ReviewDate>{date}</ReviewDate>
        <ViewListingEvaluate>
          {/* review rate */}
          <ListingItemContainer color="#FFD700">
            <StarRateIcon />
          </ListingItemContainer>
          {/* review rate */}
          <ListingItemContainer>{item.rate}</ListingItemContainer>
        </ViewListingEvaluate>
      </RateInfo>
      <div>{item.comment}</div>
    </Review>
  );
}

UserReview.propTypes = {
  item: PropTypes.object
};

export default UserReview;
