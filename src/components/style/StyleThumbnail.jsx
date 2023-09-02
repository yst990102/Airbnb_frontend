import styled, { keyframes, css } from 'styled-components';

// thumbnail container style
export const ThumbnailContainer = styled.div`
  position: relative;
  width: 90vw;
  max-width: 480px;
  height: 50.625vw;
  max-height: 270px;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  overflow: hidden;
  margin: 0 auto;
`;

// thumbnail style
export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
`;

// default button style for thumbnail type
const defaultButtonStyle = css`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1;
  width: 40px;
  height: 50px;
  top: 50%;
  margin-top: -25px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: #a9a9a9;

  &:hover {
    background-color: #808080;
  }

  &:active {
    background-color: #a9a9a9;
  }
`;

// previous button style
export const PreviousButton = styled.button`
  ${defaultButtonStyle};
  justify-content: flex-end;
  left: 0;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`;

// next button style
export const NextButton = styled.button`
  ${defaultButtonStyle};
  justify-content: flex-start;
  right: 0;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`;

// shift left animation
const shiftleft = keyframes`
    from {
        transform: translateY(0)
    }
    to {
        transform: translateX(-100%)
    }
`;

// shift right animation
const shiftRight = keyframes`
    from {
        transform: translateY(0)
    }
    to {
        transform: translateX(100%)
    }
`;

// thumbnail shift left to hide style
export const ShiftLeftCenter = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  animation: ${shiftleft} 0.5s ease-in-out 1 forwards;
`;

// thumbnail shift left to display style
export const ShiftLeftRight = styled.img`
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  animation: ${shiftleft} 0.5s ease-in-out 1 forwards;
`;

// thumbnail shift right to hide style
export const ShiftRightCenter = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  animation: ${shiftRight} 0.5s ease-in-out 1 forwards;
`;

// thumbnail shift right to display style
export const ShiftRightLeft = styled.img`
  position: absolute;
  top: 0;
  right: 100%;
  width: 100%;
  height: 100%;
  animation: ${shiftRight} 0.5s ease-in-out 1 forwards;
`;
