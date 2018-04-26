import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert/Alert';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import './VerifyEmailAlert.scss';

class VerifyEmailAlert extends React.Component {
  handleResendVerificationEmail(emailAddress) {
    Meteor.call('users.sendVerificationEmail', (error) => {
      if (error) {
        this.props.onAlert(error.reason, 'danger');
      } else {
        this.props.onAlert(`Check ${emailAddress} for a verification link!`, 'success');
      }
    });
  }

  render() {
    const { userId, emailVerified, emailAddress } = this.props;

    return (
      userId && !emailVerified ? (
        <div className="VerifyEmailAlert">
          <Alert className="verify-email text-center">
            <p>Hey friend! Can you <strong>verify your email address</strong> ({emailAddress}) for us?
              {' '}
              <Link
                onClick={() => this.handleResendVerificationEmail(emailAddress)}
                to="#"
              >
                Re-send verification email
              </Link>
            </p>
          </Alert>
        </div>
      ) : null
    )
  }
}

VerifyEmailAlert.propTypes = {
  userId: PropTypes.string.isRequired,
  emailVerified: PropTypes.bool.isRequired,
  emailAddress: PropTypes.string.isRequired,
};

export default VerifyEmailAlert;
