import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App.js';
import Register from './auth/Register.js';
import Login from './auth/Login.js';
import Activate from './auth/Activate.js';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/a/activate/:token" exact component={Activate} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;