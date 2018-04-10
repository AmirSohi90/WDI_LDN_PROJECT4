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
    password: ''
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState(res.data, () => console.log(this.state)));
  }

  handleChange = ({ target: { name, value }  }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'PUT',
      url: `/api/users/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => this.props.history.push('/days'));
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
        </div>
        <div className="field">
          <label htmlFor="firstname">First Name</label>
          <input className="input"
            placeholder="First Name"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </div>
        <div className="field">
          <label htmlFor="lastname">Last Name</label>
          <input className="input"
            placeholder="Last Name"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
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

        <button className="button is-primary">Submit</button>
      </form>
    );
  }

}

export default EditUser;
