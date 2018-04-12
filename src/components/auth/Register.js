import React from 'react';
import Auth from '../../lib/Auth';
import axios from 'axios';
import Flash from '../../lib/Flash';

class Register extends React.Component{

  state = {
    errors: {}
  }

  componentDidMount(){
    const userId = Auth.getPayload().sub;
    axios.get(`/api/users/${userId}`)
      .then(res => this.setState({
        user: res.data,
        userId: res.data._id,
        employer: res.data.employer
      }, () => console.log('STATE', this.state)));
  }

  handleChange = ({ target: { name, value }  }) => {
    const errors = Object.assign({}, this.state.errors, { [name]: ''});
    this.setState({ [name]: value, errors }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        console.log(res);
        Auth.setToken(res.data.token);
      })
      .then(() => Flash.setMessage('success', 'Thanks for registering!'))
      .then(() => this.props.history.push('/days'))
      .catch(err => this.setState({errors: err.response.data.errors}));
  }

  render() {
    return (
      <div className="container">
        {!this.state.employer &&
          <h1 className="title">You do not have access to this page</h1>
        }
        {this.state.employer &&
        <form className="register-form-wrap" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input className="input"
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            />
            {this.state.errors.username && <small>{this.state.errors.username}</small>}
          </div>
          <div className="field">
            <label htmlFor="firstname">First Name</label>
            <input className="input"
              placeholder="First Name"
              name="firstName"
              onChange={this.handleChange}
            />
            {this.state.errors.firstName && <small>{this.state.errors.firstName}</small>}
          </div>
          <div className="field">
            <label htmlFor="lastname">Last Name</label>
            <input className="input"
              placeholder="Last Name"
              name="lastName"
              onChange={this.handleChange}
            />
            {this.state.errors.lastName && <small>{this.state.errors.lastName}</small>}
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
            {this.state.errors.email && <small>{this.state.errors.email}</small>}
          </div>
          <div className="field">
            <label htmlFor="jobRole">Job Role</label>
            <input className="input"
              placeholder="Job Role"
              name="jobRole"
              onChange={this.handleChange}
            />
            {this.state.errors.jobRole && <small>{this.state.errors.jobRole}</small>}
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
            {this.state.errors.password && <small>{this.state.errors.password}</small>}
          </div>
          <div className="field">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input
              type="password"
              className="input"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              onChange={this.handleChange}
            />
          </div>
          {this.state.errors.passwordConfirmation && <small>{this.state.errors.passwordConfirmation}</small>}

          <button className="button register-button">Submit</button>
        </form>
        }
      </div>
    );
  }
}

export default Register;
