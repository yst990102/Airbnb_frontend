import styled, { keyframes } from 'styled-components';

// popup sidebar animation
const display = keyframes`
    from {
        right: -100%;
    }

    to {
        right: 0;
    }
`;

// sidebar container style
export const SideBarContainer = styled.div`
  overflow: hidden;
  position: relative;
  z-index: 2;

  @media (min-width: 600px) {
    width: 100%;
    height: calc(100% - 80px);
    position: absolute;
    overflow: unset;
  }
`;

// background wrap
export const Wrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: #80808080;

  @media (min-width: 600px) {
    background-color: transparent;
  }
`;

// side bar style
export const SideBar = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;

  position: fixed;
  height: 100vh;
  width: 70vw;
  top: 0;
  background-color: white;
  z-index: 2;

  @media (max-width: 600px) {
    animation: ${display} 0.3s ease-out forwards 1;
  }

  @media (min-width: 600px) {
    position: absolute;
    width: 200px;
    height: unset;
    right: 10px;
    border: 1px solid black;
    justify-content: flex-start;
    top: 40px;

    &:before {
      content: '';
      position: absolute;
      height: 0;
      width: 0;
      border: 18px solid transparent;
      border-bottom: 18px solid black;
      top: -36px;
      right: 4.5vw;
      z-index: 2;
    }

    &:after {
      content: '';
      position: absolute;
      height: 0;
      width: 0;
      border: 17px solid transparent;
      border-bottom: 17px solid white;
      top: -33px;
      right: calc(4.5vw + 1px);
      z-index: 2;
    }
  }
`;

// sidebar content style
export const SideBarContent = styled.div`
  width: 100%;
  height: 50px;
  border-top: 1px solid #a9a9a9;
  border-bottom: 1px solid #a9a9a9;
`;
