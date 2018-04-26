/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import FileSaver from 'file-saver';
import base64ToBlob from 'b64-to-blob';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import InputHint from '../../components/InputHint/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';
import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';
import { GridInner, GridCell } from 'rmwc/Grid';

import './Profile.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        emailAddress: {
          required: true,
          email: true,
        },
        currentPassword: {
          required() {
            // Only required if newPassword field has a value.
            return component.form.newPassword.value.length > 0;
          },
        },
        newPassword: {
          required() {
            // Only required if currentPassword field has a value.
            return component.form.currentPassword.value.length > 0;
          },
        },
      },
      messages: {
        firstName: {
          required: 'What\'s your first name?',
        },
        lastName: {
          required: 'What\'s your last name?',
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        currentPassword: {
          required: 'Need your current password if changing.',
        },
        newPassword: {
          required: 'Need your new password if changing.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  getUserType(user) {
    const userToCheck = user;
    delete userToCheck.services.resume;
    const service = Object.keys(userToCheck.services)[0];
    return service === 'password' ? 'password' : 'oauth';
  }

  handleExportData(event) {
    event.preventDefault();
    Meteor.call('users.exportData', (error, exportData) => {
      if (error) {
        this.props.onAlert(error.reason, 'danger');
      } else {
        FileSaver.saveAs(base64ToBlob(exportData), `${Meteor.userId()}.zip`);
      }
    });
  }

  handleDeleteAccount() {
    if (confirm('Are you sure? This will permanently delete your account and all of its data.')) {
      Meteor.call('users.deleteAccount', (error) => {
        if (error) {
          this.props.onAlert(error.reason, 'danger');
        } else {
          this.props.onAlert('Account deleted!', 'success');
        }
      });
    }
  }

  handleSubmit(form) {
    const profile = {
      emailAddress: form.emailAddress.value,
      profile: {
        name: {
          first: form.firstName.value,
          last: form.lastName.value,
        },
      },
    };

    Meteor.call('users.editProfile', profile, (error) => {
      if (error) {
        this.props.onAlert(error.reason, 'danger');
      } else {
        this.props.onAlert('Profile updated!', 'success');
      }
    });

    if (form.newPassword.value) {
      Accounts.changePassword(form.currentPassword.value, form.newPassword.value, (error) => {
        if (error) {
          this.props.onAlert(error.reason, 'danger');
        } else {
          form.currentPassword.value = '';
          form.newPassword.value = '';
        }
      });
    }
  }

  renderOAuthUser(loading, user) {
    return !loading ? (
      <div className="OAuthProfile">
        {Object.keys(user.services).map(service => (
          <div key={service} className={`LoggedInWith ${service}`}>
            <img src={`/${service}.svg`} alt={service} />
            <p>{`You're logged in with ${_.capitalize(service)} using the email address ${user.services[service].email}.`}</p>
            <Button
              className={`btn btn-${service}`}
              href={{
                facebook: 'https://www.facebook.com/settings',
                google: 'https://myaccount.google.com/privacy#personalinfo',
                github: 'https://github.com/settings/profile',
              }[service]}
              target="_blank"
            >
              Edit Profile on {_.capitalize(service)}
            </Button>
          </div>
        ))}
      </div>
    ) : <div />;
  }

  renderPasswordUser(loading, user) {
    return !loading ? (
      <div className="EmailProfile">
        <GridInner>
          <GridCell phone="2" tablet="4" desktop="6">
            <TextField name="firstName" fullwidth label="First Name" defaultValue={user.profile.name.first} />
          </GridCell>

          <GridCell phone="2" tablet="4" desktop="6">
            <TextField name="lastName" fullwidth label="Last Name" defaultValue={user.profile.name.last} />
          </GridCell>
        </GridInner>

        <TextField name="emailAddress" fullwidth label="Email Address" defaultValue={user.emails[0].address} />

        <TextField name="currentPassword" type="password" fullwidth label="Current Password" />
        <TextFieldHelperText>Use at least six characters.</TextFieldHelperText>

        <TextField name="newPassword" type="password" fullwidth label="New Password" />

        <Button raised type="submit">Save Profile</Button>
      </div>
    ) : <div />;
  }

  renderProfileForm(loading, user) {
    return !loading ? ({
      password: this.renderPasswordUser,
      oauth: this.renderOAuthUser,
    }[this.getUserType(user)])(loading, user) : <div />;
  }

  render() {
    const { loading, user } = this.props;
    return (
      <GridInner className="Profile">
        <GridCell span="6">
          <h4 className="page-header">Edit Profile</h4>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            {this.renderProfileForm(loading, user)}
          </form>
          <AccountPageFooter>
            <p><a href="#" onClick={this.handleExportData}>Export my data</a> – Download all of your documents as .txt files in a .zip</p>
          </AccountPageFooter>
          <AccountPageFooter>
            <Button raised className="btn danger" onClick={this.handleDeleteAccount}>Delete My Account</Button>
          </AccountPageFooter>
        </GridCell>
      </GridInner>
    );
  }
}

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('users.editProfile');

  return {
    loading: !subscription.ready(),
    user: Meteor.user(),
  };
})(Profile);
