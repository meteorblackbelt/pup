/* eslint-disable jsx-a11y/no-href */

import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { RMWCProvider } from 'rmwc/Provider';
import Navigation from '../../components/Navigation/Navigation';
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';
import Unauthenticated from '../../components/Unauthenticated/Unauthenticated';
import Index from '../../pages/Index/Index';
import Documents from '../../pages/Documents/Documents';
import NewDocument from '../../pages/NewDocument/NewDocument';
import ViewDocument from '../../pages/ViewDocument/ViewDocument';
import EditDocument from '../../pages/EditDocument/EditDocument';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import VerifyEmail from '../../pages/VerifyEmail/VerifyEmail';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';
import Terms from '../../pages/Terms/Terms';
import Privacy from '../../pages/Privacy/Privacy';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';
import VerifyEmailAlert from '../../components/VerifyEmailAlert/VerifyEmailAlert';
import getUserName from '../../../modules/get-user-name';
import { Snackbar } from 'rmwc/Snackbar';

import './App.scss';
import 'material-components-web/dist/material-components-web.min.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { afterLoginPath: null };
    autoBind(this);
  }

  setAfterLoginPath(afterLoginPath) {
    this.setState({ afterLoginPath });
  }

  onAlert(alert, className) {
    this.setState({
      alert: alert
    })
  }

  render() {
    const { state, setAfterLoginPath } = this;
    const props = {
      onAlert: this.onAlert.bind(this),
      ...(this.props || {})
    }

    return (
			<RMWCProvider iconStrategy="ligature">
				<Router>
					{!props.loading ? (
						<div className="App">
              <Snackbar
                show={this.state.alert}
                onHide={evt => this.setState({alert: null})}
                message={this.state.alert}
              />

							<Navigation {...props} {...state} />

              <main>
                {props.authenticated ?
                  <VerifyEmailAlert
                    userId={props.userId}
                    emailVerified={props.emailVerified}
                    emailAddress={props.emailAddress}
                    onAlert={this.onAlert}
                  />
                  : ''}
                <Switch>
                  <Route exact name="index" path="/" component={Index} />
                  <Authenticated exact path="/documents" component={Documents} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                  <Authenticated exact path="/documents/new" component={NewDocument} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                  <Authenticated exact path="/documents/:_id" component={ViewDocument} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                  <Authenticated exact path="/documents/:_id/edit" component={EditDocument} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                  <Authenticated exact path="/profile" component={Profile} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                  <Unauthenticated path="/signup" component={Signup} {...props} {...state} />
                  <Unauthenticated path="/login" component={Login} {...props} {...state} />
                  <Route path="/logout" render={routeProps => <Logout {...routeProps} setAfterLoginPath={setAfterLoginPath} />} {...props} {...state} />
                  <Public name="verify-email" path="/verify-email/:token" component={VerifyEmail} {...props} />
                  <Public name="recover-password" path="/recover-password" component={RecoverPassword} {...props} />
                  <Public name="reset-password" path="/reset-password/:token" component={ResetPassword} {...props} />
                  <Public name="terms" path="/terms" component={Terms} />
                  <Public name="privacy" path="/privacy" component={Privacy} />
                  <Public name="examplePage" path="/example-page" component={ExamplePage} />
                  <Public component={NotFound} />
                </Switch>
              </main>
							<Footer />
						</div>
					) : ''}
				</Router>
			</RMWCProvider>
    );
  }
}

App.defaultProps = {
  userId: '',
  emailAddress: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
    userId,
    emailAddress,
    emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
  };
})(App);
