import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import { Button } from 'rmwc/Button';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import DocumentsCollection from '../../../api/Documents/Documents';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';

import './Documents.scss';

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};

const Documents = ({
  loading, documents, match, history,
}) => (!loading ? (
  <div className="Documents">
    <div className="page-header clearfix">
      <h4 className="pull-left">Documents</h4>
      <Button raised onClick={() => history.push(`${match.url}/new`)}>Add Document</Button>
    </div>
    {documents.length ?
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {documents.map(({
            _id, title, createdAt, updatedAt,
          }) => (
            <tr key={_id}>
              <td>{title}</td>
              <td>{timeago(updatedAt)}</td>
              <td>{monthDayYearAtTime(createdAt)}</td>
              <td>
                <Button
                  raised
                  theme="secondary-bg text-secondary-on-background"
                  onClick={() => history.push(`${match.url}/${_id}`)}
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  raised
                  theme="secondary-bg text-secondary-on-background"
                  onClick={() => handleRemove(_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <Alert type="info">No documents yet!</Alert>}
  </div>
) : <Loading />);

Documents.propTypes = {
  loading: PropTypes.bool.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('documents');
  return {
    loading: !subscription.ready(),
    documents: DocumentsCollection.find().fetch(),
  };
})(Documents);
