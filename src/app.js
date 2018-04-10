import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bulma';

import Navbar from './components/common/Navbar';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NewDay from './components/days/NewDay';
import EditRoute from './components/days/EditRoute';
import NewShift from './components/shifts/NewShift';
import IndexRoute from './components/calendar/IndexRoute';
import ShowRoute from './components/calendar/ShowRoute';
import EditShift from './components/shifts/EditShift';
import UserShow from './components/user/UserShow';
import UserIndex from './components/user/UserIndex';
import EditUser from './components/user/EditUser';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <section className="section">
            <Switch>
              <Route path ="/shifts/:id/edit" component={EditShift} />
              <Route path ="/shifts/new" component={NewShift} />
              <Route path ="/days/new" component={NewDay} />
              <Route path ="/users/:id/edit" component={EditUser} />
              <Route path ="/users/:id" component={UserShow} />
              <Route path ="/users" component={UserIndex} />
              <Route path ="/days/:id/edit" component={EditRoute} />
              <Route path ="/days/:id" component={ShowRoute} />
              <Route path ="/days" component={IndexRoute} />
              <Route path ="/Login" component={Login} />
              <Route path ="/register" component={Register} />
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
