import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Accounts } from 'meteor/accounts-base';
import Alert from '../../components/Alert/Alert';
import validate from '../../../modules/validate';
import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';
import { GridInner, GridCell } from 'rmwc/Grid';
import { Card } from 'rmwc/Card';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        newPassword: {
          required: true,
          minlength: 6,
        },
        repeatNewPassword: {
          required: true,
          minlength: 6,
          equalTo: '[name="newPassword"]',
        },
      },
      messages: {
        newPassword: {
          required: 'Enter a new password, please.',
          minlength: 'Use at least six characters, please.',
        },
        repeatNewPassword: {
          required: 'Repeat your new password, please.',
          equalTo: 'Hmm, your passwords don\'t match. Try again?',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { match, history } = this.props;
    const { token } = match.params;

    Accounts.resetPassword(token, form.newPassword.value, (error) => {
      if (error) {
        this.props.onAlert(error.reason, 'danger');
      } else {
        history.push('/documents');
      }
    });
  }

  render() {
    return (
      <GridInner className="ResetPassword">
        <GridCell span="6">
          <h4 className="page-header">Reset Password</h4>
          <Alert type="info">
            To reset your password, enter a new one below. You will be logged in with your new password.
          </Alert>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <TextField type="password" name="newPassword" fullwidth label="New Password" />

            <TextField type="password" name="repeatNewPassword" fullwidth label="Repeat New Password" />

            <Button raised type="submit">Reset Password &amp; Login</Button>
          </form>
        </GridCell>
      </GridInner>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ResetPassword;
