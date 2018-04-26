import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

class NewDocument extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    let { history } = this.props;

    return (
      <div className="NewDocument">
        <h4 className="page-header">New Document</h4>
        <DocumentEditor history={history} onAlert={this.props.onAlert} />
      </div>
    )
  }
}

NewDocument.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewDocument;
