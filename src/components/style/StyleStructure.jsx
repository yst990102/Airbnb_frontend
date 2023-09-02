import styled from 'styled-components';

// header style
export const Header = styled.header`
  position: relative;
  left: 0;
  top: 0;

  display: flex;
  width: 100vw;
  height: 80px;

  background: #64ed92;
  color: white;

  justify-content: left;
  align-items: center;
`;

// head title style
export const HeadTitle = styled.h2`
  margin: 0 20px;
  font-weight: bold;

  @media (min-width: 600px) {
    font-size: 40px;
  }
`;

// body style
export const Body = styled.main`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 0;
  overflow: auto;
`;

// navigator style
export const Nav = styled.nav`
  display: flex;
  height: 100%;
`;

// navigator button style
export const NavButton = styled.a`
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  border-right: 1px solid #4e4e4e;

  &:hover {
    background-color: #36bf36;
  }

  &:first-child {
    border-left: 1px solid #4e4e4e;
  }

  @media (min-width: 600px) {
    padding: 20px;
    font-size: 30px;
  }
`;
