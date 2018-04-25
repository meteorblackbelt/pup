import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import { Button } from 'rmwc/Button';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';
import {
  Menu,
  MenuItem,
  MenuAnchor
} from 'rmwc/Menu';

import './Navigation.scss';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
      menuOpen: false,
    }
  }

  closeDrawer() {
    this.setState({
      drawerOpen: false,
    })
  }

  render() {
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon use="menu"
            onClick={() => this.setState({drawerOpen: !this.state.drawerOpen}) }
            />
            <ToolbarTitle>
              <Link to="/">Pup</Link>
            </ToolbarTitle>
          </ToolbarSection>
          {this.props.authenticated && (
            <ToolbarSection alignEnd>
              <MenuAnchor>
                <ToolbarMenuIcon use="more_vert"
                  onClick={() => this.setState({menuOpen: !this.state.menuOpen}) }
                />

                <Menu
                  open={this.state.menuOpen}
                  onClick={() => this.setState({menuOpen: !this.state.menuOpen}) }
                  anchorCorner="topRight"
                >
                  <MenuItem onClick={() => this.props.history.push('/profile')}>Profile</MenuItem>
                  <MenuItem onClick={() => this.props.history.push('/logout')}>Logout</MenuItem>
                </Menu>
              </MenuAnchor>

            </ToolbarSection>
          )}
        </ToolbarRow>
        {!this.props.authenticated ? <PublicNavigation drawerOpen={this.state.drawerOpen} onClose={this.closeDrawer.bind(this)} /> : <AuthenticatedNavigation drawerOpen={this.state.drawerOpen} onClose={this.closeDrawer.bind(this)} {...this.props} />}
      </Toolbar>
    )
  }
}

Navigation.defaultProps = {
  name: '',
};

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  name: PropTypes.string,
};

export default withRouter(Navigation);
