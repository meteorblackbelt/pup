import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import InputHint from '../../components/InputHint/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';
import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';
import { GridInner, GridCell } from 'rmwc/Grid';

class Signup extends React.Component {
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
        password: {
          required: true,
          minlength: 6,
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
        password: {
          required: 'Need a password here.',
          minlength: 'Please use at least six characters.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;

    Accounts.createUser({
      email: form.emailAddress.value,
      password: form.password.value,
      profile: {
        name: {
          first: form.firstName.value,
          last: form.lastName.value,
        },
      },
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Meteor.call('users.sendVerificationEmail');
        Bert.alert('Welcome!', 'success');
        history.push('/documents');
      }
    });
  }

  render() {
    return (
      <GridInner className="Signup">
        <GridCell span="6">
          <h4 className="page-header">Sign Up</h4>
          <OAuthLoginButtons
            services={['facebook', 'github', 'google']}
            emailMessage={{
              offset: 97,
              text: 'Sign Up with an Email Address',
            }}
          />
            <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              <GridInner>
                <GridCell phone="2" tablet="4" desktop="6">
                  <TextField name="firstName" fullwidth label="First Name" />
                </GridCell>

                <GridCell phone="2" tablet="4" desktop="6">
                  <TextField name="lastName" fullwidth label="Last Name" />
                </GridCell>
              </GridInner>

              <TextField name="emailAddress" fullwidth label="Email Address" />

              <TextField name="password" type="password" fullwidth label="Password" />
              <InputHint>Use at least six characters.</InputHint>

              <Button raised type="submit">Sign Up</Button>
            </form>

            <AccountPageFooter>
              <p>Already have an account? <Link to="/login">Log In</Link>.</p>
            </AccountPageFooter>
        </GridCell>
      </GridInner>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
