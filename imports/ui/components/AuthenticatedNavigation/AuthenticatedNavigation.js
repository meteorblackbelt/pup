import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Drawer,
    DrawerHeader,
    DrawerContent
} from 'rmwc/Drawer';
import {
    List,
    ListItem,
    ListItemText
} from 'rmwc/List';

class AuthenticatedNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
    }
  }

  navigate(path) {
    this.props.onClose();
    this.props.history.push(path);
  }

  render() {
    return (
      <Drawer
        temporary
        open={this.props.drawerOpen}
        onClose={this.props.onClose}
      >
        <DrawerContent>
          <List>
            <ListItem onClick={() => this.navigate('/documents')}>
              <ListItemText>Documents</ListItemText>
            </ListItem>
          </List>
        </DrawerContent>
      </Drawer>
    )
  }
}

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AuthenticatedNavigation);
