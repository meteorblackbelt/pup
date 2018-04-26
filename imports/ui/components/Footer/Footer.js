import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Grid, GridCell } from 'rmwc/Grid';
import { year } from '../../../modules/dates';

import './Footer.scss';

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === '2017' ? '2017' : `2017-${currentYear}`;
};

const Footer = () => (
  <div className="Footer">
    <p className="copyright">&copy; {copyrightYear()} {Meteor.settings.public.AppName}</p>

    <ul className="links">
      <li><Link to="/terms">Terms<span className="hidden-xs"> of Service</span></Link></li>
      <li><Link to="/privacy">Privacy<span className="hidden-xs"> Policy</span></Link></li>
    </ul>
  </div>
);

Footer.propTypes = {};

export default Footer;
