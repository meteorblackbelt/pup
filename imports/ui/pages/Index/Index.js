import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { Button, ButtonIcon } from 'rmwc/Button';
import { GridInner, GridCell } from 'rmwc/Grid';
import { Icon } from 'rmwc/Icon';
import { Card } from 'rmwc/Card';

import './Index.scss';

const Index = ({name, history}) => (
  <GridInner className="Index">
    <GridCell span="12">
      <Card>
        <img
          src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
          alt="Clever Beagle"
        />
        <h1>{Meteor.settings.public.AppName}</h1>
        <p>A boilerplate for products.</p>
        <div className="horizontal-buttons">
          <Button theme="secondary-bg text-secondary-on-background" onClick={() => window.open("http://cleverbeagle.com/pup", "_blank")} raised>Read the Docs</Button>
          <Button theme="secondary-bg text-secondary-on-background" onClick={() => window.open("https://github.com/meteorblackbelt/pup", "_blank")} raised><ButtonIcon>star</ButtonIcon> Star on GitHub</Button>
        </div>
        <footer>
          <p>Need help and want to stay accountable building your product? <a href="https://cleverbeagle.com?utm_source=pupappindex&utm_medium=app&utm_campaign=oss">Check out Clever Beagle</a>.</p>
        </footer>
      </Card>
    </GridCell>
  </GridInner>
);

export default withRouter(Index);
