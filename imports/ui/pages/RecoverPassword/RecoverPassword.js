import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';
import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField, TextFieldIcon, TextFieldHelperText } from 'rmwc/TextField';
import { Grid, GridCell } from 'rmwc/Grid';
import { Card } from 'rmwc/Card';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;
    const email = form.emailAddress.value;

    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Check ${email} for a reset link!`, 'success');
        history.push('/login');
      }
    });
  }

  render() {
    return (
      <Grid className="RecoverPassword">
        <GridCell span="6">
          <h4 className="page-header">Recover Password</h4>
          <Card className="Alert">
            Enter your email address below to receive a link to reset your password.
          </Card>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <TextField name="emailAddress" fullwidth label="Email Address" />

            <Button raised type="submit">Recover Password</Button>
          </form>

          <AccountPageFooter>
            <p>Remember your password? <Link to="/login">Log In</Link>.</p>
          </AccountPageFooter>
        </GridCell>
      </Grid>
    );
  }
}

RecoverPassword.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RecoverPassword;
