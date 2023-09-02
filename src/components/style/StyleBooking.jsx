import styled, { css } from 'styled-components';

// default bi wind style
const biwindStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// default button style
const defaultButtonStyle = css`
  ${biwindStyle};
  width: 100%;
  position: sticky;
  padding: 0 10%;
  border: none;
  border-bottom: 1px solid grey;
  background-color: #f5f5f5;
  height: 80px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #dcdcdc;
  }
`;

// booking summary container styled
export const BookingSummary = styled.div`
  padding: 20px;
  font-size: 20px;
  background-color: white;

  @media (min-width: 600px) {
    width: 80%;
    max-width: 500px;
    margin: 0 auto;
  }
`;

// booking summary item style
export const BookingSummaryItem = styled.div`
  ${biwindStyle}
  padding: 0 20px;
`;

// view booking button style
export const ViewBookingButton = styled.button`
  ${defaultButtonStyle};
  top: 0;
`;

// view history button style
export const ViewHistoryButton = styled.button`
  ${defaultButtonStyle};
  top: 0;
`;

// information container style
export const InfoContainer = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  @media (min-width: 600px) {
    width: 80%;
    max-width: 500px;
    margin: 0 auto;
  }
`;

// list container style
export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #fffafa;
`;

// list item style
export const ListItem = styled.li`
  ${biwindStyle};
  padding: 20px;
  border-bottom: 1px solid #b4b4b4;

  &:hover {
    background-color: #f3f3f3;
  }
`;

// booking information style
export const BookingInfo = styled.div`
  margin-right: 60px;
  flex: 3;
  font-size: 18px;
`;

// booking detail style
export const BookingInfoDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
`;

// status style
export const Status = styled.div`
  text-align: center;
  font-size: 20px;
  flex: 2;
  font-weight: 600;
`;

// action button style
export const ActionButton = styled.button`
  padding: 5px 10px;
  font-size: 20px;
  color: white;
  background-color: #5ba8e8;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #4682b4;
  }

  &:active {
    background-color: #5ba8e8;
  }
`;

// action button container style
export const ActionButtonContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
`;

// action button style
export const UserActionButton = styled.button`
  display: block;
  background-color: ${(props) =>
    props.background === 'accept' ? '#36BF36' : '#FF4D00'};
  color: white;
  width: 70%;
  max-width: 205px;
  margin: 0 auto 20px;
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.background === 'accept' ? '#31A631' : '#E74803'};
  }

  &:active {
    background-color: ${(props) =>
      props.background === 'accept' ? '#36BF36' : '#FF4D00'};
  }
`;
