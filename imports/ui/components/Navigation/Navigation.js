import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import {
    Toolbar,
    ToolbarRow,
    ToolbarSection,
    ToolbarTitle,
    ToolbarMenuIcon,
    ToolbarIcon
} from 'rmwc/Toolbar';

import './Navigation.scss';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    }
  }

  closeDrawer() {
    this.setState({
      menuOpen: false,
    })
  }

  render() {
    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarMenuIcon use="menu"
            onClick={() => this.setState({menuOpen: !this.state.menuOpen}) }
            />
            <ToolbarTitle>
              <Link to="/">Pup</Link>
            </ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
          </ToolbarSection>
        </ToolbarRow>
        {!this.props.authenticated ? <PublicNavigation menuOpen={this.state.menuOpen} onClose={this.closeDrawer.bind(this)} /> : <AuthenticatedNavigation menuOpen={this.state.menuOpen} onClose={this.closeDrawer.bind(this)} {...this.props} />}
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
