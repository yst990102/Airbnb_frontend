import styled, { css, keyframes } from 'styled-components';

// animation for input label
const shrink = keyframes`
    from {
        transform: translateX(0) translateY(0) scale(1);
    }

    to {
        transform: translateX(-1em) translateY(-25px) scale(0.7);
        background-color: white;
    }
`;

// defalut input label style
export const defalutInputLabel = css`
  position: absolute;
  height: 1.5em;
  top: 50%;
  left: 0.5em;
  margin-top: -0.75em;
  padding: 0 10px;
  color: grey;
  font-size: 20px;
  cursor: text;
  user-select: none;
`;

// input label as placeholder style
export const InputLabelPlaceholder = styled.label`
  ${defalutInputLabel};
`;

// input label style
export const InputLabelTitle = styled.label`
  ${defalutInputLabel};
  animation: ${shrink} linear 0.12s 1 forwards;
`;

// input field style
export const InputArea = styled.input`
  display: inline-block;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1.3em;
  margin-left: 0.5em;
  background-color: transparent;

  &[type='password']::-ms-reveal {
    display: none;
  }
`;

// default radio label style
const defaultRadioLabel = css`
  box-sizing: border-box;
  user-select: none;
  text-align: center;
  border-radius: 5px;
  background-color: #dcdcdc;
  cursor: pointer;
  font-size: 20px;
`;

// radio label style
export const RadioLabel = styled.label`
  ${defaultRadioLabel};
  height: 3em;
  line-height: 3em;
`;

// selected radio label style
export const SelectedRadioLabel = styled.label`
  ${defaultRadioLabel};
  display: block;
  background-color: #5e86c1;
  height: 3em;
  line-height: 3em;
  color: white;
`;

// deatil raido label style
export const DetailRadioLabel = styled.label`
  ${defaultRadioLabel};
  padding: 0 0.2em;
`;

// selected deatil raido label style
export const SelectedDetailRadioLabel = styled.label`
  ${defaultRadioLabel};
  color: white;
  background-color: #5e86c1;
  padding: 0 0.2em;
`;

// radio title style
export const RadioTitle = styled.h3`
  width: 100%;
  margin-top: 0;
  margin-bottom: 0.5em;
  font-size: 18px;
`;

// date input field style
export const DateInput = styled.input`
  font-size: 16px;
  border: ${(props) =>
    props.warn ? '1px solid #8B0000' : '1px solid #c4c4c4'};
  background-color: ${(props) => (props.warn ? '#FFDAB9' : 'inheirt')};
`;

// remove date button style
export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
