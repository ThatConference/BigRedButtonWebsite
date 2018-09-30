import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Map from './components/Map/Map';
import List from './components/List/List';

const Router = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Map} />
      <Route path="/list/:customerId" component={List} />
    </Switch>
  </BrowserRouter>
);

export default Router;
