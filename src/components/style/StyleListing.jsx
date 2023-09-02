/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components';

// default unorder list style
const defaultUnorderList = css`
  padding: 0;
  list-style: none;
`;

// listing header style
export const ListingHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  padding-top: 0.5em;
  margin-bottom: 20px;
  background: #f5f5f5;
  z-index: 1;
`;

// create listing button style
export const ListingCreateButton = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  right: 50px;
  bottom: 50px;
  border: none;
  background: #00808c;
  color: white;
  border-radius: 20px;
  cursor: pointer;
`;

// listing container style
export const ListingContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 90vw;
  max-width: 725px;
  margin: 0 auto 20px;
  padding: 10px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 2px 5px #696969;
  border-radius: 5px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

// listing brief information container style
export const ListingBriefContainer = styled.div`
  display: flex;

  @media (min-width: 600px) {
    flex: 3;
  }
`;

// listing thumbnail container style
export const ListingThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  overflow: hidden;

  @media (min-width: 600px) {
    flex: 1;
  }
`;

// all listing container style
export const AllListing = styled.ul`
  ${defaultUnorderList};
  margin-bottom: 100px;
`;

// export const InfoContainer = styled.div`

// `;

// listing main information container style
export const ListingMainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding-left: 10px;

  @media (min-width: 600px) {
    flex: 1;
  }
`;

// displayed thumbnail style
export const ListingDisplayThumbnail = styled.img`
  width: 100%;
  height: 100%;
`;

// listing title style
export const ListingTitle = styled.h2`
  font-size: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
`;

// listing review container style
export const ListingReviewContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

// listing detail container style
export const ListingDetaiContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin-top: 10px;

  @media (min-width: 600px) {
    flex: 2;
    justify-content: center;
  }
`;

// mange booking link style
export const ManageBookingLink = styled.a`
  text-decoration: underline;
  color: #00808c;
  cursor: pointer;

  &:hover {
    color: #2dbfcd;
  }

  &:active {
    color: #00808c;
  }
`;

// button container style
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
`;

// default button style
const defaultButton = css`
  color: white;
  border-radius: 10px;
  height: 30px;
  min-width: 80px;
  padding: 0 10px;
  font-size: 20px;
  border: none;
  cursor: pointer;
`;

// edit button style
export const EditButton = styled.button`
  ${defaultButton};
  background-color: #00bfff;

  &:hover {
    background-color: #20b9ee;
  }

  &:ative {
    background-color: #00bfff;
  }
`;

// publish button style
export const PublishButton = styled.button`
  ${defaultButton};
  background-color: #32cd32;

  &:hover {
    background-color: #36bf36;
  }

  &:ative {
    background-color: #32cd32;
  }
`;

// delete button style
export const DeleteButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  top: 10px;
  right: 15px;
`;

// listing container style
export const HomeListingContainer = styled.li`
  display: flex;
  height: min(25vw, 150px);
  max-width: 500px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 2px 5px #696969;
  margin-bottom: 10px;
  overflow: hidden;
  cursor: pointer;

  @media (min-width: 600px) {
    height: 300px;
    width: 47%;
    max-width: 400px;
    flex-direction: column;
    margin-bottom: 30px;
  }
`;

// listing thumbnail container
export const HomeListingThumbnail = styled.div`
  flex: 1;
  margin: 5% 2%;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  overflow: hidden;

  @media (min-width: 600px) {
    flex: 2;
    width: 80%;
    height: 100%;
    max-width: 300px;
    max-height: 168.75px;
    margin: 5% auto 0;
    border-radius: 10px;
  }
`;

// listing information container
export const HomeListingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  padding-left: 20px;

  @media (min-width: 600px) {
    flex: 1;
    padding: 20px 50px;
  }
`;

// listing title container style
export const HomeListingTitle = styled.h3`
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0;
  font-weight: normal;
  padding-top: 10px;
`;

// listing reviews container style
export const HomeListingReviews = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  @media (min-width: 600px) {
    flex: 2;
  }
`;

// listing title style
export const ViewListingTitle = styled.h3`
  font-size: 20px;
`;

// listing evaluation container style
export const ViewListingEvaluate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

// listing inforamtion container style
export const ListingItemContainer = styled.span`
  color: ${(props) => (props.color ? props.color : 'black')};
  font-weight: ${(props) => (props.type === 'cost' ? 700 : 'normal')};
  margin-right: 4px;
`;

// address container style
export const ViewListingAddress = styled.div`
  margin-bottom: 20px;
`;

// amenitie container style
export const ViewListingAmenitieContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
`;

// price container style
export const ViewListingPrice = styled.div`
  font-weight: 600;
  font-size: 20px;
`;

// room information container style
export const ViewListingRoomInfo = styled.div`
  margin-bottom: 20px;
  border-top: 1px solid #dcdcdc;
`;

// amenitie details style
export const ViewListingAmenitie = styled.ul`
  ${defaultUnorderList};
  max-height: 300px;
  overflow: auto;
`;

// amenitie item style
export const ViewListingAmenitieItem = styled.li`
  margin-bottom: 10px;
  font-size: 20px;
`;

// show more button style
export const ShowMoreButton = styled.button`
  display: block;
  border: 2px solid grey;
  border-radius: 10px;
  width: 50%;
  max-width: 100px;
  height: 40px;
  background-color: transparent;
  margin: 0 auto 10px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: transparent;
  }
`;

// type container style
export const ViewListingType = styled.div`
  margin-top: 20px;
  border-top: 1px solid #dcdcdc;
`;

// details container style
export const Type = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

// detail item container style
export const TypeContent = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  font-size: 20px;
`;

// reivews container style
export const ViewListingReview = styled.ul`
  ${defaultUnorderList};
  overflow: auto;
`;

// all reviews container style
export const AllReview = styled.ul`
  ${defaultUnorderList};
  height: 300px;
  overflow: auto;
`;

// review detail container style
export const Review = styled.li`
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
`;

// review date container style
export const ReviewDate = styled.div`
  margin-bottom: 10px;
`;

// booking container style
export const ListingBookContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 70px;
  bottom: 0;
  border-top: 1px solid grey;
  background-color: white;
  padding: 0 10%;
`;

// booking button style
export const BookingButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #00bfff;
  color: white;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #1daad9;
  }

  &:active {
    background-color: #00bfff;
  }
`;

// leave review button style
export const LeaveReivewButton = styled.button`
  display: flex;
  align-items: center;

  padding: 5px 10px;
  margin: 10px 0;
  background-color: #f0fff0;
  border: 2px solid #00808c;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #dff2df;
  }

  &:active {
    background-color: #f0fff0;
  }
`;
