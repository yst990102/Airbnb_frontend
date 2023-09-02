import styled from 'styled-components';

// entire counter container style
export const Counter = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 1.5em;
  padding: 0 10px;
`;

// counter title style
export const CounterTitle = styled.div`
  width: 90px;
  font-size: 18px;
  color: ${(props) => (props.warn ? 'red' : 'black')};
`;

// counter container style
export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 110px;
  font-size: 18px;
`;

// counter button style
export const CounterButton = styled.button`
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid #00808c;
  padding: 0;

  width: 2em;
  height: 2em;
  border-radius: 1em;
  font-size: 18px;

  cursor: pointer;
  user-select: none;

  &[disabled] {
    background-color: #f5f5f5;
    cursor: auto;
  }
`;
