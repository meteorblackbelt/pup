import React from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';
import { Button, ButtonIcon } from 'rmwc/Button';
import { GridInner, GridCell } from 'rmwc/Grid';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';
import { Snackbar } from 'rmwc/Snackbar';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
      if (error) {
        this.props.onAlert(error.reason);
      } else {
        this.props.onAlert('Welcome back!', 'success');
      }
    });
  }

  render() {
    return (
      <GridInner className="Login">
        <GridCell span="6">

        <h4 className="page-header">Log In</h4>
        <OAuthLoginButtons
          services={['facebook', 'github', 'google']}
          emailMessage={{
            offset: 100,
            text: 'Log In with an Email Address',
          }}
          onAlert={this.props.onAlert}
        />
        <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
          <TextField name="emailAddress" fullwidth label="Email Address" />

          <TextField name="password" type="password" fullwidth label="Password" />
          <TextFieldHelperText>At least six characters.</TextFieldHelperText>

          <Link className="pull-right" to="/recover-password">Forgot password?</Link>
          <Button raised>Log In</Button>
        </form>

        <AccountPageFooter>
          <p>{'Don\'t have an account?'} <Link to="/signup">Sign Up</Link>.</p>
        </AccountPageFooter>
      </GridCell>
    </GridInner>
    );
  }
}

export default Login;
