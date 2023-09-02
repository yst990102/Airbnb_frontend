import React from 'react';
import PropTypes from 'prop-types';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

// import styled components
import { Wrap } from './style/StyleSideBar'; // background wrap
import { AllReview } from '../components/style/StyleListing'; // all reviews container
import UserReview from '../components/UserReview'; // user review
import {
  PopUpContainer, // popup container
  CloseButtonContainer // close button
} from './style/StylePopUp';

function PopUpReviews ({ id, role, reviews, setPopUpReviews }) {
  return (
    <>
      <Wrap onClick={() => setPopUpReviews(false)} />
      <PopUpContainer id={id} role={role}>
        <CloseButtonContainer
          label="close button"
          onClick={() => setPopUpReviews(false)}
        >
          <HighlightOffSharpIcon fontSize="large" />
        </CloseButtonContainer>
        <h3>Reviews</h3>
        {/* display all reviews that user leaves */}
        <AllReview>
          {reviews.map((item, index) => {
            return <UserReview item={item} key={`review_${index}`} />;
          })}
        </AllReview>
      </PopUpContainer>
    </>
  );
}

PopUpReviews.propTypes = {
  id: PropTypes.string,
  role: PropTypes.string,
  reviews: PropTypes.array,
  setPopUpReviews: PropTypes.func
};

export default PopUpReviews;
