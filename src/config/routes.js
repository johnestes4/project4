import React from 'react';

import { Route } from 'react-router'
import App from '../App';
import DogsContainer from '../DogsContainer'

module.exports = (
  <Route path='/'component={App}>
    <Route path='/dogs' component={DogsContainer} />
  </Route>
)
