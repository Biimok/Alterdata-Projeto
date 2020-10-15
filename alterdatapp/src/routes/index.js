import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hook/auth';


const Routes = () => {

  const { user } = useAuth();
  return(
    <Switch>
      <Route component={user ? AppRoutes : AuthRoutes}/>
    </Switch>
  )
  

}

export default Routes;