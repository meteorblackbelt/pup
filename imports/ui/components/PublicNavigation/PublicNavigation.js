import React from 'react';
import { withRouter } from 'react-router-dom';
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

class PublicNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: this.props.drawerOpen,
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
            <ListItem onClick={() => this.navigate('/signup')}>
              <ListItemText>Sign Up</ListItemText>
            </ListItem>
            <ListItem onClick={() => this.navigate('/login')}>
              <ListItemText>Log In</ListItemText>
            </ListItem>
          </List>
        </DrawerContent>
      </Drawer>
    )
  }
}

export default withRouter(PublicNavigation);
