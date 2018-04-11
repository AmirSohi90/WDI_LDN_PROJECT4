import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';


//rest contains whatever is in the app.js route. Example className, pathname etc
const ProtectedRoute = ({ component: Component, ...rest }) => {
  !Auth.isAuthenticated() && Flash.setMessage('danger', 'You must be logged in');
  return(
    <Route
      {...rest}
      //props comes from the route. It contains things like the history, location etc
      render={props =>
        Auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
