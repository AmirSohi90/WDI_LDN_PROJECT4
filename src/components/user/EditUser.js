import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class EditUser extends React.Component{

  state = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    jobRole: '',
    employer: '',
    password: '',
    errors: {}
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState(res.data, () => console.log(this.state)));
  }

  handleChange = ({ target: { name, value }  }) => {
    const errors = Object.assign({}, this.state.errors, { [name]: ''});
    this.setState({ [name]: value, errors }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'PUT',
      url: `/api/users/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => this.props.history.push('/days'))
      .catch(err => this.setState({errors: err.response.data.errors}));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input className="input"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          {this.state.errors.username && <small>{this.state.errors.username}</small>}
        </div>
        <div className="field">
          <label htmlFor="firstname">First Name</label>
          <input className="input"
            placeholder="First Name"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
          {this.state.errors.firstName && <small>{this.state.errors.firstName}</small>}
        </div>
        <div className="field">
          <label htmlFor="lastname">Last Name</label>
          <input className="input"
            placeholder="Last Name"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.firstName}
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
            value={this.state.email}
          />
          {this.state.errors.email && <small>{this.state.errors.email}</small>}
        </div>
        <div className="field">
          <label htmlFor="jobRole">Job Role</label>
          <input className="input"
            placeholder="Job Role"
            name="jobRole"
            onChange={this.handleChange}
            value={this.state.jobRole}
          />
        </div>
        {this.state.errors.jobRole && <small>{this.state.errors.jobRole}</small>}

        <button className="button login-button">Submit</button>
      </form>
    );
  }

}

export default EditUser;
