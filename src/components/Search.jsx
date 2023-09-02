import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

// import styled components
import {
  AppBar,
  IconButton,
  Button,
  Toolbar,
  TextField,
  Grid
} from '@mui/material';
import { Box } from '@mui/system';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

function Search ({ listings, displayListings, setDay, setDisplayListings }) {
  // input search text
  const [searchText, setSearchText] = React.useState('');
  // number of bedrrom
  const [bedroomsNum, setBedroomsNum] = React.useState(['', '']);
  const [price, setPrice] = React.useState(['', '']); // price
  const [date, setDate] = React.useState(['', '']); // date range
  const [order, setOrder] = React.useState(1); // display order

  // popup dialog setting
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // check whether specific condition is set
  const isSet = (item) => {
    return item[0] !== '' || item[1] !== '';
  };

  // check whether a listing satisfy the condition
  const passCheck = (listing, pattern, bedroom, datems) => {
    const title = listing.title.toLowerCase(); // nomalize listing's title
    const city = listing.address.city.toLowerCase(); // normalize listing's city
    // number of bedrrom of listing
    const listingBedroomNum = listing.metadata.propertyInfo.bedroomNum;
    let pass = true;

    // not match search text
    if (searchText !== '' && title !== pattern && city !== pattern) {
      pass = false;
    }

    // not match number of bedroom
    if (
      isSet(bedroom) &&
      (listingBedroomNum < bedroom[0] || listingBedroomNum > bedroom[1])
    ) {
      pass = false;
    }

    // not match price
    if (
      isSet(price) &&
      (listing.price < price[0] || listing.price > price[1])
    ) {
      pass = false;
    }

    // check availability
    let isAvailable = !isSet(date);

    if (isSet(date)) {
      for (const availability of listing.availability) {
        // normalize listing availability date
        const ms = [
          Date.parse(availability.start),
          Date.parse(availability.end)
        ];

        // match availability
        if (datems[0] >= ms[0] && datems[1] <= ms[1]) {
          // match day range
          isAvailable = true;
          break;
        } else if (datems[0] >= ms[0] && isNaN(datems[1])) {
          // match start day and end day is not provided
          isAvailable = true;
          break;
        } else if (isNaN(datems[0]) && datems[1] <= ms[1]) {
          // match end day and start day is not provided
          isAvailable = true;
          break;
        }
      }
    }

    // get number of days of search range
    const numDay = (datems[1] - datems[0]) / (1000 * 60 * 60 * 24);

    // set number of days
    if (setDay) {
      setDay(numDay || 1);
    }

    return pass && isAvailable && (!isSet(date) || date[0] !== date[1]);
  };

  // sort display listings
  const sort = () => {
    const tempListings = [...displayListings];
    tempListings.sort((a, b) => {
      return order * (a.rate - b.rate);
    });
    setOrder(-1 * order);
    setDisplayListings(tempListings);
  };

  // search listings
  const search = () => {
    const pattern = searchText.toLowerCase(); // normalize search text
    const displayListings = []; // display listigns list
    const bedroom = [...bedroomsNum]; // range of number of bedrooms
    const prices = [...price]; // range of price
    const datems = [...date]; // range of date

    // reverse input numbers of bedroom if user input in order
    if (bedroom[0] > bedroom[1]) {
      bedroom.reverse();
      setBedroomsNum(bedroom);
    }

    // reverse input prices if user input in order
    if (prices[0] > prices[1]) {
      prices.reverse();
      setBedroomsNum(prices);
    }

    // normalize input date
    datems[0] = Date.parse(datems[0]);
    datems[1] = Date.parse(datems[1]);

    // check all listing
    for (const listing of listings) {
      if (passCheck(listing, pattern, bedroom, datems)) {
        displayListings.push(listing);
      }
    }

    // reset search component
    setDate(['', '']);

    // display listings
    setDisplayListings(displayListings);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleClickOpen}
            label="button for handleClickOpen"
          >
            <FilterAltIcon />
          </IconButton>

          <SearchBar>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => {
                setSearchText(event.target.value);
                if (event.target.value === '') {
                  setDisplayListings(listings);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  search();
                }
              }}
              value={searchText}
            />
          </SearchBar>
          <IconButton
            label="search button"
            onClick={() => {
              search();
            }}
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Config your advance filter here'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container justify={'center'} alignItems={'center'}>
              <Grid item xs={12} align="left">
                Bedrooms:
              </Grid>
              <Grid item xs={4} align="center">
                <TextField
                  onChange={(event) => {
                    if (
                      !isNaN(event.target.value) ||
                      event.target.value === ''
                    ) {
                      const temp = [...bedroomsNum];
                      temp[0] = parseInt(event.target.value) || '';
                      setBedroomsNum(temp);
                    }
                  }}
                  value={bedroomsNum[0]}
                />
              </Grid>
              <Grid item xs={4} align="center">
                to
              </Grid>
              <Grid item xs={4} align="center">
                <TextField
                  onChange={(event) => {
                    if (
                      !isNaN(event.target.value) ||
                      event.target.value === ''
                    ) {
                      const temp = [...bedroomsNum];
                      temp[1] = parseInt(event.target.value) || '';
                      setBedroomsNum(temp);
                    }
                  }}
                  value={bedroomsNum[1]}
                />
              </Grid>

              {/* Range of Price */}
              <Grid item xs={12} align="left">
                Price:
              </Grid>
              <Grid item xs={4} align="center">
                <TextField
                  onChange={(event) => {
                    if (
                      !isNaN(event.target.value) ||
                      event.target.value === ''
                    ) {
                      const temp = [...price];
                      temp[0] = parseInt(event.target.value) || '';
                      setPrice(temp);
                    }
                  }}
                  value={price[0]}
                />
              </Grid>
              <Grid item xs={4} align="center">
                to
              </Grid>
              <Grid item xs={4} align="center">
                <TextField
                  onChange={(event) => {
                    if (
                      !isNaN(event.target.value) ||
                      event.target.value === ''
                    ) {
                      const temp = [...price];
                      temp[1] = parseInt(event.target.value) || '';
                      setPrice(temp);
                    }
                  }}
                  value={price[1]}
                />
              </Grid>

              {/* From Date */}
              <Grid item xs={6} align="left">
                From:
              </Grid>
              <Grid item xs={6} align="right">
                <input
                  type="date"
                  value={date[0]}
                  onChange={(event) => {
                    const range = [...date];
                    range[0] = event.target.value;
                    setDate(range);
                  }}
                />
              </Grid>

              {/* To Date */}
              <Grid item xs={6} align="left">
                To:
              </Grid>
              <Grid item xs={6} align="right">
                <input
                  type="date"
                  value={date[1]}
                  onChange={(event) => {
                    const range = [...date];
                    range[1] = event.target.value;
                    setDate(range);
                  }}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6} align="right">
                {order === 1 && (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => sort()}
                      label="a sort button"
                    >
                      Rate
                      <ArrowDownwardIcon />
                    </Button>
                  </>
                )}
                {order === -1 && (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => sort()}
                      label="a sort button"
                    >
                      Rate
                      <ArrowUpwardIcon />
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

Search.propTypes = {
  listings: PropTypes.array,
  displayListings: PropTypes.array,
  setDay: PropTypes.func,
  setDisplayListings: PropTypes.func
};

export default Search;
