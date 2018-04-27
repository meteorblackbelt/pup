import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class Public extends React.Component {
  static get defaultProps() {
    return {
      path: '',
      exact: false,
    }
  }

  static get propTypes() {
    return {
      component: PropTypes.func.isRequired,
      path: PropTypes.string,
      exact: PropTypes.bool,
    }
  }

  render() {
    const { loggingIn, authenticated, afterLoginPath, component, path, exact, ...rest } = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        render={props => (
          React.createElement(component, {
            ...props,
            ...rest
          })
        )}
      />
    );
  }
}

export default Public;
