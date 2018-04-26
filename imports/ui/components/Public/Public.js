import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Public = ({
  loggingIn, authenticated, afterLoginPath, component, path, exact, ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      React.createElement(component, {
        ...props, ...rest
      })
    )}
  />
);

Public.defaultProps = {
  path: '',
  exact: false,
};

Public.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default Public;
