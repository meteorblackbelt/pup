import React from 'react';
import { Card } from 'rmwc/Card';

import './Alert.scss';

class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let type= this.props.type || 'info';

    return (
      <Card className={["Alert", type].join(' ')}>
        {this.props.children}
      </Card>
    );
  }
}

export default Alert;
