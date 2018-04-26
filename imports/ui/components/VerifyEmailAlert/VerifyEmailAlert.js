import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert/Alert';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import './VerifyEmailAlert.scss';

const handleResendVerificationEmail = (emailAddress) => {
  Meteor.call('users.sendVerificationEmail', (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(`Check ${emailAddress} for a verification link!`, 'success');
    }
  });
};

const VerifyEmailAlert = ({ userId, emailVerified, emailAddress }) => (
  userId && !emailVerified ? (
    <div className="VerifyEmailAlert">
      <Alert className="verify-email text-center">
        <p>Hey friend! Can you <strong>verify your email address</strong> ({emailAddress}) for us?
          {' '}
          <Link
            onClick={() => handleResendVerificationEmail(emailAddress)}
            to="#"
          >
            Re-send verification email
          </Link>
        </p>
      </Alert>
    </div>
  ) : null
);

VerifyEmailAlert.propTypes = {
  userId: PropTypes.string.isRequired,
  emailVerified: PropTypes.bool.isRequired,
  emailAddress: PropTypes.string.isRequired,
};

export default VerifyEmailAlert;
