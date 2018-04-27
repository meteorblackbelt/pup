import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class Unauthenticated extends React.Component {
  static get defaultProps() {
    return {
      path: '',
      exact: false,
      afterLoginPath: null,
    }
  }

  static get propTypes() {
    return {
      loggingIn: PropTypes.bool.isRequired,
      authenticated: PropTypes.bool.isRequired,
      component: PropTypes.func.isRequired,
      afterLoginPath: PropTypes.string,
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
          !authenticated ?
            (React.createElement(component, {
              ...props,
              ...rest,
              loggingIn,
              authenticated,
            })) :
            (<Redirect to={afterLoginPath || '/documents'} />)
        )}
      />
    );
  }
}

export default Unauthenticated;
