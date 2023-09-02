import styled, { keyframes } from 'styled-components';

// popup animation
const popup = keyframes`
    from {
        transform: translateY(80%);
    }

    to {
        transform: translateY(0);
    }
`;

// popup container style
export const PopUpContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  background-color: #f5f5f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  min-height: ${(props) => (props.type === 'booking' ? '0%' : '60%')};
  padding: 0 5%;
  padding-top: 50px;
  z-index: 2;

  @media (max-width: 600px) {
    animation: ${popup} linear 0.3s 1 forwards;
    bottom: 0;
  }

  @media (min-width: 600px) {
    anmation: unset;
    width: 450px;
    left: 50%;
    margin-left: -200px;
    top: 20%;
    border-radius: 10px;
    padding: 50px 50px;
    border: 2px solid black;
  }
`;

// close button style
export const CloseButtonContainer = styled.button`
  position: absolute;
  width: 10px;
  top: 10px;
  font-size: 40px;
  left: 50%;
  margin-left: -20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

// publish button style
export const PublishButton = styled.button`
  position: absolute;
  min-width: 105px;
  background-color: #00bfff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  padding: 10px 20px;
  left: 50%;
  bottom: 20px;
  margin-left: -45px;
  cursor: pointer;
  &:hover {
    background-color: #87ceeb;
  }

  &:active {
    background-color: #00bfff;
  }
`;

// message container style
export const PopUpMsgContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 35%;
  left: 50%;
  width: 60%;
  padding: 1em;
  margin-left: max(-30%, -150px);
  border: 2px solid black;
  border-radius: 10px;
  max-width: 300px;
  font-size: 20px;
  background-color: #fffafa;
  text-align: center;
  color: black;
  z-index: 2;
`;

// close button style
export const PopUpCloseButton = styled.button`
  display: block;
  font-size: 20px;
  padding: 10px;
  background-color: rgb(152, 251, 152);
  border: 1px solid black;
  border-radius: 5px;
  margin: 1em auto;
  cursor: pointer;
`;

// popup question style
export const Question = styled.p`
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
`;
