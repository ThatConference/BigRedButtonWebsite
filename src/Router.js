import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Map from './components/Map/Map';

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Map} />
    </Switch>
  </BrowserRouter>
);

export default Router;
