import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, IconButton, Paper, TextField } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

function TitleForm ({
  title,
  path,
  submitSuccess,
  setTitle,
  setSubmitSuccess,
  update
}) {
  const { id } = useParams(); // listing id

  const [titleHelperText, setTitleHelperText] = React.useState('');

  const [nextStepDisable, setNextStepDisable] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (title === '') {
      setTitleHelperText('Please enter your listing title');
      setNextStepDisable(true);
    } else {
      setTitleHelperText('');
      setNextStepDisable(false);
    }
  }, [title]);

  return (
    <>
      <Grid container alignItems={'center'} justify={'center'} height="100%">
        <Grid item xs={2} sm={4} align="center"></Grid>
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
                <h1>Create for your new listing</h1>
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <div>Step 1</div>
                <h3>Title of your listing</h3>
                {nextStepDisable === true && (
                  <h5>(Enter info below to enable next-step button)</h5>
                )}
              </Grid>
              <Grid item xs={1} align="center"></Grid>

              <Grid item xs={1} align="center"></Grid>
              <Grid item xs={10} align="center">
                <TextField
                  label="Title"
                  value={title}
                  variant="outlined"
                  type={'text'}
                  fullWidth
                  required
                  helperText={titleHelperText}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                ></TextField>
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
            disabled={nextStepDisable}
            name="next-step"
            variant="contained"
            width="50%"
            color="success"
            onClick={() => {
              if (title !== '' && title.length <= 20) {
                const pathname =
                  path === 'edit'
                    ? `/mylistings/${path}/${id}`
                    : `/mylistings/${path}`;
                navigate({
                  pathname,
                  search: '?address'
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

TitleForm.propTypes = {
  title: PropTypes.string,
  submitSuccess: PropTypes.bool,
  path: PropTypes.string,
  setTitle: PropTypes.func,
  setSubmitSuccess: PropTypes.func,
  update: PropTypes.func
};

export default TitleForm;
