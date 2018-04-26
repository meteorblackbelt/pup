import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Icon from '../Icon/Icon';
import { Button, ButtonIcon } from 'rmwc/Button';

import './OAuthLoginButton.scss';

const handleLogin = (service, callback) => {
  const options = {
    facebook: {
      requestPermissions: ['email'],
      loginStyle: 'popup',
    },
    github: {
      requestPermissions: ['user:email'],
      loginStyle: 'popup',
    },
    google: {
      requestPermissions: ['email', 'profile'],
      requestOfflineToken: true,
      loginStyle: 'popup',
    },
  }[service];

  return {
    facebook: Meteor.loginWithFacebook,
    github: Meteor.loginWithGithub,
    google: Meteor.loginWithGoogle,
  }[service](options, callback);
};

const serviceLabel = {
  facebook: <span><Icon icon="facebook-official" /> Log In with Facebook</span>,
  github: <span><Icon icon="github" /> Log In with GitHub</span>,
  google: <span><Icon icon="google" /> Log In with Google</span>,
};

const OAuthLoginButton = ({ service, callback }) => (
  <Button
    raised
    className={`OAuthLoginButton OAuthLoginButton-${service}`}
    onClick={() => handleLogin(service, callback)}
  >
    {serviceLabel[service]}
  </Button>
);

OAuthLoginButton.defaultProps = {
  callback: (error) => {
    if (error) this.props.onAlert(error.message, 'danger');
  },
};

OAuthLoginButton.propTypes = {
  service: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default OAuthLoginButton;
