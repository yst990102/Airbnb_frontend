import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { Button, Grid, IconButton, Paper } from '@mui/material';

// input new room/bed information for the listing
function PropertyInfoForm ({ propertyInfo, path, setPropertyInfo, update }) {
  const { id } = useParams(); // listing id
  // bed information
  const bedInfo = {
    number: 0,
    single: 0,
    double: 0,
    queen: 0,
    king: 0
  };

  // number of bedroom
  const [bedroomNum, setBedroomNum] = React.useState(
    propertyInfo.bedroomNum || 0
  );
  // number of bathroom
  const [bathroomNum, setBathroomNum] = React.useState(
    propertyInfo.bathroomNum || 0
  );
  // number of beds
  const [bedsNum, setBedsNum] = React.useState(propertyInfo.bedsNum || 0);
  // beds information
  const [beds, setBeds] = React.useState(propertyInfo.beds || [bedInfo]);
  // bed has set flag
  const [bedDetailsSet, setBedDetailsSet] = React.useState([false]);
  // detail beds type number
  const [detailBedsNum, setDetailBedsNum] = React.useState(
    propertyInfo.bedsNum || 0
  );

  const navigate = useNavigate();

  // set detail of bed
  const setDetail = (index) => {
    const temp = [...bedDetailsSet];
    temp[index] = !temp[index];
    setBedDetailsSet(temp);
  };

  return (
    <>
      <Grid container alignItems={'center'} justify={'center'} height="100%">
        <Grid item xs={2} sm={4} align="center">
          {/* Move to the Previous Form */}
          <IconButton
            label="Move to the Previous Form"
            name="previous-step"
            variant="contained"
            width="50%"
            color="success"
            onClick={() => {
              const pathname =
                path === 'edit'
                  ? `/mylistings/${path}/${id}`
                  : `/mylistings/${path}`;
              navigate({
                pathname,
                search: '?type'
              });
            }}
          >
            <ArrowCircleLeftOutlinedIcon style={{ transform: 'scale(2.5)' }} />
          </IconButton>
        </Grid>
        <Grid item xs={8} sm={4} align="center">
          <Paper
            style={{
              backgroundColor: 'rgb(255,255,255,0.6)',
              color: 'black',
              borderRadius: '20px'
            }}
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <div>Step 4</div>
                <h3>Information of your property</h3>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <Grid container alignItems={'center'} justify={'center'}>
                  <Grid item xs={5} align="center">
                    <div>Bedroom</div>
                  </Grid>
                  <Grid item xs={3} align="right">
                    <Button
                      label="bedroomMinus"
                      disabled={bedroomNum === 0}
                      name="bedroomMinus"
                      onClick={() => {
                        setBeds(beds.slice(0, bedroomNum));
                        setBedroomNum(bedroomNum - 1);
                      }}
                    >
                      <RemoveCircleOutlineOutlinedIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={1} align="center">
                    {bedroomNum}
                  </Grid>
                  <Grid item xs={3} align="left">
                    <Button
                      label="bedroomAdd"
                      name="bedroomAdd"
                      onClick={() => {
                        const newBedInfo = {
                          number: 0,
                          single: 0,
                          double: 0,
                          queen: 0,
                          king: 0
                        };
                        setBedroomNum(bedroomNum + 1);
                        setBeds([...beds, newBedInfo]);
                      }}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <Grid container alignItems={'center'} justify={'center'}>
                  <Grid item xs={5} align="center">
                    <div>Beds</div>
                  </Grid>
                  <Grid item xs={3} align="right">
                    <Button
                      label="bedsNum === 0, disabled button"
                      disabled={bedsNum === 0}
                      name="bedMinus"
                      onClick={() => {
                        setBedsNum(bedsNum - 1);
                      }}
                    >
                      <RemoveCircleOutlineOutlinedIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={1} align="center">
                    {bedsNum}
                  </Grid>
                  <Grid item xs={3} align="left">
                    <Button
                      label="bedAdd"
                      name="bedAdd"
                      onClick={() => {
                        setBedsNum(bedsNum + 1);
                      }}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <Grid container alignItems={'center'} justify={'center'}>
                  <Grid item xs={5} align="center">
                    <div>Bathroom</div>
                  </Grid>
                  <Grid item xs={3} align="right">
                    <Button
                      label="bathroomMinus"
                      disabled={bathroomNum === 0}
                      name="bathroomMinus"
                      onClick={() => setBathroomNum(bathroomNum - 1)}
                    >
                      <RemoveCircleOutlineOutlinedIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={1} align="center">
                    {bathroomNum}
                  </Grid>
                  <Grid item xs={3} align="left">
                    <Button
                      name="bathroomAdd"
                      onClick={() => {
                        setBathroomNum(bathroomNum + 1);
                      }}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                {/* bed information in each room */}
                <ol>
                  {beds.map((item, index) => {
                    return (
                      <BedListItem
                        key={`${index}`}
                        index={index}
                        beds={beds}
                        bedsNum={bedsNum}
                        detailBedsNum={detailBedsNum}
                        setBedsNum={setBedsNum}
                        setBeds={setBeds}
                        bedDetailsSet={bedDetailsSet}
                        setDetail={setDetail}
                        setDetailBedsNum={setDetailBedsNum}
                      />
                    );
                  })}
                </ol>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={12} align="center"></Grid>
              <Grid item xs={12} align="center"></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2} sm={4} align="center">
          {/* Move to the Next Form */}
          <IconButton
            label="Move to the Next Form"
            name="next-step"
            variant="contained"
            width="50%"
            color="success"
            onClick={() => {
              if (bedroomNum !== 0 && bathroomNum !== 0) {
                const pathname =
                  path === 'edit'
                    ? `/mylistings/${path}/${id}`
                    : `/mylistings/${path}`;

                // store room information
                setPropertyInfo({
                  bedroomNum,
                  bathroomNum,
                  bedsNum,
                  beds
                });
                navigate({
                  pathname,
                  search: '?amenities'
                });
              }
            }}
          >
            <ArrowCircleRightOutlinedIcon style={{ transform: 'scale(2.5)' }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

PropertyInfoForm.propTypes = {
  propertyInfo: PropTypes.object,
  path: PropTypes.string,
  setPropertyInfo: PropTypes.func,
  update: PropTypes.func
};

export default PropertyInfoForm;

function BedTypeInput ({
  index,
  type,
  beds,
  bedsNum,
  detailBedsNum,
  setBedsNum,
  setDetailBedsNum,
  setBeds
}) {
  return (
    <div>
      <div>{type[0].toUpperCase() + type.slice(1)}</div>
      {/* decrease number of bed type */}
      <div>
        {beds[index][type] !== 0 && (
          <Button
            label="decrease number of bed type"
            name={`${index === 0 ? 'public' : 'bedroom'}${
              index !== 0 && index
            }_${type}Minus`}
            onClick={() => {
              const temp = [...beds];
              --temp[index][type];
              --temp[index].number;
              setBeds(temp);
              setDetailBedsNum(detailBedsNum - 1);
              if (detailBedsNum === bedsNum) {
                setBedsNum(bedsNum - 1);
              }
            }}
          >
            -
          </Button>
        )}
        {beds[index][type] === 0 && <Button disabled>-</Button>}
        {beds[index][type]}
        {/* increase number of bed type */}
        <Button
          name={`${index === 0 ? 'public' : 'bedroom'}${
            index !== 0 && index
          }_${type}Add`}
          onClick={() => {
            const temp = [...beds];
            ++temp[index][type];
            ++temp[index].number;
            setBeds(temp);
            setDetailBedsNum(detailBedsNum + 1);
            if (detailBedsNum === bedsNum) {
              setBedsNum(bedsNum + 1);
            }
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
}

// display bed list
function BedListItem ({
  index,
  beds,
  bedsNum,
  detailBedsNum,
  bedDetailsSet,
  setBeds,
  setBedsNum,
  setDetailBedsNum,
  setDetail
}) {
  return (
    <li>
      <div>
        {/* room title */}
        {index === 0 && <h3>Public space</h3>}
        {index !== 0 && <h3>Bedroom {index}</h3>}

        {/* number of beds in room */}
        {beds[index].number <= 1 && <div>{beds[index].number} bed</div>}
        {beds[index].number > 1 && <div>{beds[index].number} beds</div>}
        {/* show all bed detail */}
        {!bedDetailsSet[index] && (
          <Button
            name={`${index === 0 ? 'public' : 'bedroom'}${
              index !== 0 && index
            }`}
            onClick={() => setDetail(index)}
            aria-controls={`bedDetail${index}`}
            aria-expanded={false}
            aria-haspopup="listbox"
          >
            Add
          </Button>
        )}
        {/* hide all bed detail */}
        {bedDetailsSet[index] && (
          <Button
            onClick={() => setDetail(index)}
            aria-controls={`bedDetail${index}`}
            aria-expanded={true}
            aria-haspopup="listbox"
          >
            Hide
          </Button>
        )}
      </div>
      {bedDetailsSet[index] && (
        <ul id={`bedDetail${index}`}>
          {/* type of single counter */}
          <BedTypeInput
            index={index}
            type="single"
            beds={beds}
            bedsNum={bedsNum}
            detailBedsNum={detailBedsNum}
            setBedsNum={setBedsNum}
            setDetailBedsNum={setDetailBedsNum}
            setBeds={setBeds}
          />
          {/* type of double counter */}
          <BedTypeInput
            index={index}
            type="double"
            beds={beds}
            bedsNum={bedsNum}
            detailBedsNum={detailBedsNum}
            setBedsNum={setBedsNum}
            setDetailBedsNum={setDetailBedsNum}
            setBeds={setBeds}
          />
          {/* type of queen counter */}
          <BedTypeInput
            index={index}
            type="queen"
            beds={beds}
            bedsNum={bedsNum}
            detailBedsNum={detailBedsNum}
            setBedsNum={setBedsNum}
            setDetailBedsNum={setDetailBedsNum}
            setBeds={setBeds}
          />
          {/* type of king counter */}
          <BedTypeInput
            index={index}
            type="king"
            beds={beds}
            bedsNum={bedsNum}
            detailBedsNum={detailBedsNum}
            setBedsNum={setBedsNum}
            setDetailBedsNum={setDetailBedsNum}
            setBeds={setBeds}
          />
        </ul>
      )}
    </li>
  );
}

BedListItem.propTypes = {
  index: PropTypes.number,
  beds: PropTypes.array,
  bedsNum: PropTypes.number,
  detailBedsNum: PropTypes.number,
  bedDetailsSet: PropTypes.array,
  setBeds: PropTypes.func,
  setBedsNum: PropTypes.func,
  setDetailBedsNum: PropTypes.func,
  setDetail: PropTypes.func
};

BedTypeInput.propTypes = {
  index: PropTypes.number,
  type: PropTypes.string,
  beds: PropTypes.array,
  detailBedsNum: PropTypes.number,
  bedsNum: PropTypes.number,
  setBedsNum: PropTypes.func,
  setDetailBedsNum: PropTypes.func,
  setBeds: PropTypes.func
};
