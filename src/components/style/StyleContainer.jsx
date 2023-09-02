import styled, { css } from 'styled-components';

// default container style
export const baseContainer = css`
  position: relative;
  box-sizing: border-box;
`;

// bi wing container style
export const biwindLayOut = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// login register contaier style
export const LoginRegisterContainer = styled.div`
  ${baseContainer};
  box-sizing: border-box;
  position: absolute;
  width: 80%;
  max-width: 400px;
  top: 50%;
  margin-top: -300px;
  left: 50%;
  margin-left: max(-40%, -200px);

  @media (min-width: 600px) {
    border: 1px solid #c4c4c4;
    border-radius: 1em;
  }
`;

// warn container style
export const WarnContainer = styled.div`
  margin: 20px auto;
  width: 80%;
  min-height: 60px;
  display: grid;
  grid-template-columns: 1fr 5fr;
  border-radius: 10px;
  border: 1px solid #b8b8b8;
  overflow: hidden;
`;

// icon container style
export const WarnIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff4d00;
  color: white;
`;

// message container style
export const WarnMessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 20px;
`;

// login register header style
export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  item-align: center;
  font-size: 1.5em;
  font-weight: bold;
  line-height: 2.5em;

  @media (min-width: 600px) {
    border-bottom: 1px solid #c4c4c4;
  }
`;

// login body container
export const BodyContainer = styled.div`
  margin-top: 20px;
  padding: 0 10%;
`;

// container for login register button
export const LoginRegisterButtonContainer = styled.div`
  width: 80%;
  margin: 0 auto 20px;
`;

// switch button container style
export const LoginRegisterSwitchMsgContainer = styled.div`
  text-align: center;
`;

// input field container style
export const InputContainer = styled.div`
  ${baseContainer};
  display: flex;
  height: 50px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 0.5em;
  border: ${(props) =>
    props.warn ? '1px solid #8B0000' : '1px solid #c4c4c4'};
  background-color: ${(props) => (props.warn ? '#FFDAB9' : 'inheirt')};

  @media (min-width: 600px) {
    width: 100%;
  }
`;

// explain container style
export const Explain = styled.h3`
  width: 100%;
  margin-bottom: 0.5em;
`;

// select container style
export const SelectContainer = styled.div`
  ${baseContainer};
  font-size: 20px;
  width: 80%;
  margin: 0 auto;
  margin-top: 1em;

  @media (min-width: 600px) {
    width: 100%;
  }
`;

// input radio container style
export const RadioContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-bottom: 30px;
`;

// upload thumbnail container style
export const UploadThumbnailContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

// cover thumbnail container style
export const CoverThumbnailContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
`;

// addition thumbnail container style
export const AdditionThumnailContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 50%;
  padding: 5px;
`;

// date container style
export const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
  font-size: 20px;
  margin-top: 20px;
`;

// date container style
export const DateRangeContainer = styled.div`
  height: 250px;
  margin-bottom: 90px;
  overflow-y: auto;
  background-color: white;

  @media (min-width: 600px) {
    margin-bottom: 40px;
  }
`;

// listing container style
export const HomeListing = styled.ul`
  list-style: none;
  padding: 0;
  width: 80%;
  margin: 0 auto;

  @media (min-width: 600px) {
    width: 70%;
    max-width: 830px;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
  }
`;

// all information container style
export const ListingInfoContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  padding: 10px 5%;
  margin: 0 auto;
  margin-bottom: 100px;
`;

// display all bookings container style
export const AllBookingContainer = styled.ul`
  list-style: none;
  padding: 0;
  overflow: auto;
  max-height: 270px;
  border: 2px solid grey;
  border-radius: 10px;
  padding: 0 10px;
`;

// booking container style
export const Booking = styled.li`
  ${biwindLayOut};
  border-top: 1px solid #dcdcdc;
  padding: 10px 0;
`;

// date of booking container style
export const DateInfoContainer = styled.div`
  width: 40%;
  max-width: 140px;
`;

// date style
export const DateInfo = styled.div`
  ${biwindLayOut};
`;

// export const Status = styled.div`

// `;

// rate container style
export const RateInfo = styled.div`
  ${biwindLayOut};
`;

// booking status style
export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

// comment container style
export const CommentContainer = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  resize: none;
  font-size: 20px;
`;

// rating container style
export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 20px;
  margin: 10px 0;
`;

// send button container style
export const SendContainer = styled.div`
  text-align: center;
`;
