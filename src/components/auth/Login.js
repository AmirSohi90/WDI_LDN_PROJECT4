import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import User from '../../lib/User';

class Login extends React.Component{

  state = {}

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value}, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        console.log(res);
        Auth.setToken(res.data.token);
        User.setUser(res.data.user);
      })
      .then(() => Flash.setMessage('success', 'Welcome back!'))
      .then(() => this.props.history.push('/days'));
  }

  render() {
    return (
      <div className="login-form-wrap">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
          </div>

          <button className="button login-button">Submit</button>
        </form>

      </div>
    );
  }

}

export default Login;
