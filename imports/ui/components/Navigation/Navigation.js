import React from 'react';
import { Meteor } from 'meteor/meteor';
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
  ToolbarIcon,
  ToolbarFixedAdjust
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

  closeMenus() {
    this.setState({
      drawerOpen: false,
      menuOpen: false,
    })
  }

  render() {
    return (
      <div>
      <Toolbar fixed>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon use="menu"
            onClick={() => this.setState({drawerOpen: !this.state.drawerOpen}) }
            />
            <ToolbarTitle>
              <Link to="/">{Meteor.settings.public.AppName}</Link>
            </ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            {this.props.authenticated && (
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
            )}
          </ToolbarSection>
        </ToolbarRow>
        {!this.props.authenticated ? <PublicNavigation drawerOpen={this.state.drawerOpen} onClose={this.closeMenus.bind(this)} /> : <AuthenticatedNavigation drawerOpen={this.state.drawerOpen} onClose={this.closeMenus.bind(this)} {...this.props} />}
      </Toolbar>
      <ToolbarFixedAdjust />
      </div>
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
