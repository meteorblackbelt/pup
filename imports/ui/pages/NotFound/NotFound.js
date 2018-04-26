import React from 'react';
import Alert from '../../components/Alert/Alert';

const NotFound = () => (
  <div className="NotFound">
    <Alert type="danger">
      <p><strong>Error [404]</strong>: {window.location.pathname} does not exist.</p>
    </Alert>
  </div>
);

export default NotFound;
