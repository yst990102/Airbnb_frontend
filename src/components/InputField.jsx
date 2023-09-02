import React from 'react';
import PropTypes from 'prop-types';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import styled components
// container for entire component
import { InputContainer } from './style/StyleContainer';
import {
  InputArea, // input field
  InputLabelPlaceholder, // input label as placeholder
  InputLabelTitle // input label
} from './style/StyleForm';
import PasswordButton from './PasswordButton'; // password button

function InputField ({
  inputtype,
  title,
  value,
  warn,
  setWarn,
  setState,
  hasInput,
  onKeyDown
}) {
  // hide password flag
  const [hidePassword, setHidePassword] = React.useState(true);
  const [focus, setFocus] = React.useState(false); // focus flag

  return (
    <InputContainer warn={warn}>
      {/* set different label based on whether click on the input field */}
      {focus || value
        ? (
        <InputLabelTitle htmlFor={title.split(' ').join('')}>
          {title}
        </InputLabelTitle>
          )
        : (
        <InputLabelPlaceholder htmlFor={title.split(' ').join('')}>
          {title}
        </InputLabelPlaceholder>
          )}

      {/* input field */}
      <InputArea
        aria-invalid={warn}
        id={title.split(' ').join('')}
        value={value}
        type={inputtype === 'password' && hidePassword ? 'password' : 'text'}
        onFocus={() => {
          // set focus on the input field
          setFocus(true);
          setWarn(false);
        }}
        onBlur={() => setFocus(false)}
        onChange={(event) => {
          // change value
          setState(event.target.value);
          if (event.target.value !== '') {
            hasInput(true);
          }
        }}
        onKeyDown={onKeyDown}
      />

      {/* show password button */}
      {inputtype === 'password' && hidePassword && (
        <PasswordButton
          onClick={() => setHidePassword(!hidePassword)}
          icon={<Visibility />}
          ariaLabel="show password"
        />
      )}
      {/* hide password button */}
      {inputtype === 'password' && !hidePassword && (
        <PasswordButton
          onClick={() => setHidePassword(!hidePassword)}
          icon={<VisibilityOff />}
          ariaLabel="hide password"
        />
      )}
    </InputContainer>
  );
}

InputField.propTypes = {
  inputtype: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  warn: PropTypes.bool,
  setWarn: PropTypes.func,
  setState: PropTypes.func,
  hasInput: PropTypes.func,
  onKeyDown: PropTypes.func
};

export default InputField;
