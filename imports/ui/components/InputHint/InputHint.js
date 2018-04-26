import React from 'react';
import PropTypes from 'prop-types';
import { TextFieldHelperText } from 'rmwc/TextField';

import './InputHint.scss';

const InputHint = ({ children }) => (
  <TextFieldHelperText className="InputHint">
    {children}
  </TextFieldHelperText>
);

InputHint.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputHint;
