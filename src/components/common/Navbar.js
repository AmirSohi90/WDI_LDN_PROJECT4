import React from 'react';
import axios from 'axios';

import { Link, withRouter} from 'react-router-dom';
import Auth from '../../lib/Auth';
import User from '../../lib/User';

class Navbar extends React.Component{
  state = {
    navIsOpen: false
  }

  componentDidMount(){
    const userId = Auth.getPayload().sub;
    axios.get(`/api/users/${userId}`)
      .then(res => this.setState({ user: res.data, userId: userId, employer: res.data.employer }, () => console.log(User.getUser())));
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
  }

  componentWillUpdate(){
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }

  render(){
    return(
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
          Shwap
          </Link>
          {/* if the navbarIsOpen is true the navBar is active otherwise it's falsey */}
          <div
            onClick={this.handleToggle}
            className={`navbar-burger ${this.state.navIsOpen ? 'is-active' : ''}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/days">Calender</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to={`/users/${this.state.userId}`}>My Profile</Link>}
            {Auth.isAuthenticated() && User.getUser().employer && <Link className="navbar-item" to="/days/new">New Day</Link>}
            {Auth.isAuthenticated() && User.getUser().employer && <Link className="navbar-item" to="/shifts/new">New Shift</Link>}
            {Auth.isAuthenticated() && User.getUser().employer && <Link className="navbar-item" to="/users">All Employees</Link>}
            {Auth.isAuthenticated() && User.getUser().employer && <Link className="navbar-item" to="/register">Register an Employee</Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout}>Logout</a>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
          </div>
        </div>
      </nav>
    );
  }

}

export default withRouter(Navbar);
