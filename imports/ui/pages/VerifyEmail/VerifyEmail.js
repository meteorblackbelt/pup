import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../../components/Alert/Alert';
import { Accounts } from 'meteor/accounts-base';

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidMount() {
    const { match, history } = this.props;
    Accounts.verifyEmail(match.params.token, (error) => {
      if (error) {
        this.props.onAlert(error.reason, 'danger');
        this.setState({ error: `${error.reason}. Please try again.` });
      } else {
        setTimeout(() => {
          this.props.onAlert('All set, thanks!', 'success');
          history.push('/documents');
        }, 1500);
      }
    });
  }

  render() {
    return (
      <div className="VerifyEmail">
        <Alert type={!this.state.error ? 'info' : 'danger'}>
          {!this.state.error ? 'Verifying...' : this.state.error}
        </Alert>
      </div>
    );
  }
}

VerifyEmail.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default VerifyEmail;
