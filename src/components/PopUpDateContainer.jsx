import React from 'react';
import PropTypes from 'prop-types';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

// import styled components
// date container
import { DateRangeContainer } from './style/StyleContainer';
import { Wrap } from './style/StyleSideBar'; // background wrap
import DateRange from './DateRange'; // date range input field
import Warn from './Warn'; // warn message component

import {
  PopUpContainer, // popup container
  CloseButtonContainer, // close button
  PublishButton // publish button
} from './style/StylePopUp';

import {
  Counter, // entire counter container
  CounterTitle, // counter title
  CounterContainer, // counter container
  CounterButton // counter button
} from './style/StyleCounter';

// popup for user to set availability of a listing
function PopUpDate ({
  token,
  listingInfo,
  listing,
  setListing,
  setPopUpDate,
  setSuccess
}) {
  // availability
  const [availability, setAvailability] = React.useState([]);
  // number of availability
  const [numAvailability, setNumAvailability] = React.useState(0);
  const [wrongDate, setWrongDate] = React.useState([]); // wrong date format flag
  const [warn, setWarn] = React.useState(false); // warn flag

  // check whether the availability is in correct format
  const checkAvailability = () => {
    let pass = true;
    const isWrongDate = [...wrongDate];

    // check all input date range
    for (let i = 0; i < numAvailability; ++i) {
      const from = Date.parse(availability[i].start);
      const to = Date.parse(availability[i].end);

      // set wrong if no input or start date later than end date
      if (!from || !to || from >= to) {
        isWrongDate[i] = true;
        pass = false;
      }
    }
    setWrongDate(isWrongDate);
    return pass;
  };

  // send publish request
  const publish = async () => {
    const response = await fetch(
      `https://airbnb-backend.up.railway.app/listings/publish/${listingInfo.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ availability })
      }
    );

    if (response.status === 200) {
      // set listing status to be published
      const temp = [...listing];
      temp[listingInfo.index].published = true;
      setListing(temp);
      setPopUpDate(false);
      setSuccess(true);
    }
  };

  // render all wrong date with warning
  React.useEffect(() => {
    let pass = true;
    for (const wrong of wrongDate) {
      if (wrong) {
        pass = false;
      }
    }

    setWarn(!pass);
  }, [wrongDate]);

  return (
    <>
      <Wrap onClick={() => setPopUpDate(false)} />
      <PopUpContainer id={`publish${listingInfo.id}`} role="form">
        {warn && <Warn warnmsg="Please set valid dates" />}
        {/* set number of availability and
        provide relative number of input filed */}
        <Counter>
          <CounterTitle>Number of availability:</CounterTitle>
          <CounterContainer>
            {/* decrease number of availability */}
            {numAvailability !== 0 && (
              <CounterButton
                name="availabilityMinus"
                label="a counter button"
                onClick={() => {
                  setAvailability(availability.splice(0, numAvailability - 1));
                  setWrongDate(wrongDate.splice(0, numAvailability - 1));
                  setNumAvailability(numAvailability - 1);
                }}
              >
                -
              </CounterButton>
            )}
            {/* disabled decrease button */}
            {numAvailability === 0 && (
              <CounterButton disabled label="a disabled button">
                -
              </CounterButton>
            )}
            {numAvailability}
            {/* increase number button */}
            <CounterButton
              name="availabilityAdd"
              label="increase number button"
              onClick={() => {
                const newDate = {
                  start: '',
                  end: ''
                };
                setAvailability([...availability, newDate]);
                setNumAvailability(numAvailability + 1);
                setWrongDate([...wrongDate, false]);
              }}
            >
              +
            </CounterButton>
          </CounterContainer>
        </Counter>
        <CloseButtonContainer onClick={() => setPopUpDate(false)} label="close button">
          <HighlightOffSharpIcon fontSize="large" />
        </CloseButtonContainer>

        {/* all date range field for this listing */}
        <DateRangeContainer>
          {availability.map((item, index) => {
            return (
              <DateRange
                key={`availability-${numAvailability}-${index}`}
                index={index}
                warn={wrongDate}
                availability={availability}
                numAvailability={numAvailability}
                setAvailability={setAvailability}
                setNumAvailability={setNumAvailability}
                setWrongDate={setWrongDate}
              />
            );
          })}
        </DateRangeContainer>
        <PublishButton
          name="submit"
          onClick={() => {
            if (checkAvailability()) {
              publish();
            } else {
              setWarn(true);
            }
          }}
          label="submit button for publish"
        >
          Publish
        </PublishButton>
      </PopUpContainer>
    </>
  );
}

PopUpDate.propTypes = {
  token: PropTypes.string,
  listing: PropTypes.array,
  listingInfo: PropTypes.object,
  setListing: PropTypes.func,
  setPopUpDate: PropTypes.func,
  setSuccess: PropTypes.func
};

export default PopUpDate;
