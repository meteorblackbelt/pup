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
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

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
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Last Updated</Th>
            <Th>Created</Th>
            <Th />
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {documents.map(({
            _id, title, createdAt, updatedAt,
          }) => (
            <Tr key={_id}>
              <Td>{title}</Td>
              <Td>{timeago(updatedAt)}</Td>
              <Td>{monthDayYearAtTime(createdAt)}</Td>
              <Td>
                <Button
                  raised
                  theme="secondary-bg text-secondary-on-background"
                  onClick={() => history.push(`${match.url}/${_id}`)}
                >
                  View
                </Button>
              </Td>
              <Td>
                <Button
                  raised
                  theme="secondary-bg text-secondary-on-background"
                  onClick={() => handleRemove(_id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table> : <Alert type="info">No documents yet!</Alert>}
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
