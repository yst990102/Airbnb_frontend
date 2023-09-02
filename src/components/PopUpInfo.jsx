import React from 'react';
import PropTypes from 'prop-types';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

// import styled components
import { Wrap } from './style/StyleSideBar';
import { PopUpContainer, CloseButtonContainer } from './style/StylePopUp';
import {
  ViewListingAmenitie, // amenitie details
  ViewListingAmenitieItem // amenitie item
} from '../components/style/StyleListing';

// popup container showing all the amenitie
function PopUpInfo ({ id, role, amenitie, setPopUp }) {
  return (
    <>
      <Wrap onClick={() => setPopUp(false)} />
      <PopUpContainer id={id} role={role}>
        <CloseButtonContainer
          label="close button"
          onClick={() => setPopUp(false)}
        >
          <HighlightOffSharpIcon fontSize="large" />
        </CloseButtonContainer>
        <h3>Amenitie</h3>
        {/* display all amenitie */}
        <ViewListingAmenitie>
          {amenitie.map((item, index) => {
            return (
              <ViewListingAmenitieItem key={index}>
                {item}
              </ViewListingAmenitieItem>
            );
          })}
        </ViewListingAmenitie>
      </PopUpContainer>
    </>
  );
}

PopUpInfo.propTypes = {
  id: PropTypes.string,
  role: PropTypes.string,
  amenitie: PropTypes.array,
  setPopUp: PropTypes.func
};

export default PopUpInfo;
