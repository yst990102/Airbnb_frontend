import React from 'react';
import PropTypes from 'prop-types';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// styled components
import { DateContainer } from './style/StyleContainer'; // date container
import {
  DateInput, // date input field
  RemoveButton // remove date button
} from './style/StyleForm';

// date range for user input
function DateRange ({
  index,
  warn,
  availability,
  numAvailability,
  setAvailability,
  setNumAvailability,
  setWrongDate
}) {
  // start date
  const [from, setFrom] = React.useState(availability[index].start);
  // end date
  const [to, setTo] = React.useState(availability[index].end);

  // update date when start and end date are entered
  React.useEffect(() => {
    if (from !== '' && to !== '') {
      const temp = [...availability];
      temp[index] = {
        start: from,
        end: to
      };
      setAvailability(temp);
    }
  }, [from, to]);

  return (
    <DateContainer>
      {/* start date input field */}
      <DateInput
        name={`from${index}`}
        type="date"
        onChange={(event) => {
          const temp = [...warn];
          temp[index] = false;
          setFrom(event.target.value);
          setWrongDate(temp);
        }}
        value={from}
        warn={warn[index]}
      />
      &nbsp;to&nbsp;
      {/* end date input field */}
      <DateInput
        name={`to${index}`}
        type="date"
        onChange={(event) => {
          const temp = [...warn];
          temp[index] = false;
          setTo(event.target.value);
          setWrongDate(temp);
        }}
        value={to}
        warn={warn[index]}
      />
      {/* remove this date range button */}
      <RemoveButton
        label="a button for remove date range"
        onClick={() => {
          const temp = [...availability];
          temp.splice(index, 1);
          setAvailability(temp);
          setNumAvailability(numAvailability - 1);
        }}
      >
        <RemoveCircleOutlineIcon />
      </RemoveButton>
    </DateContainer>
  );
}

DateRange.propTypes = {
  index: PropTypes.number,
  availability: PropTypes.array,
  warn: PropTypes.array,
  numAvailability: PropTypes.number,
  setAvailability: PropTypes.func,
  setNumAvailability: PropTypes.func,
  setWrongDate: PropTypes.func
};

export default DateRange;
