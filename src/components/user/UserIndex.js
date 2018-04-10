import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class UserIndex extends React.Component{

  state = {
    users: []
  }

  componentDidMount(){
    const userId = Auth.getPayload().sub;
    axios.get(`/api/users/${userId}`)
      .then(res => this.setState({
        userId: res.data._id,
        employer: res.data.employer
      },
      () => console.log('STATE', this.state)));
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }, () => console.log('USER', this.state)));
  }

  deleteEmployee = (user) => {
    axios.delete(`/api/users/${user._id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/users'));
  }

  render(){
    // console.log('STATE', this.state);
    return(
      <div className="container">
        <div className="columns card is-multiline">
          {this.state.users.map((user, i) =>
            <h1 key={i} className="column card is-full-desktop">
              {user.firstName} {user.lastName} - {user.jobRole}
              {this.state.employer &&
                <div>
                  <Link className="button" to={`users/${user._id}/edit`}>
                  Edit
                  </Link>
                  <li className="button is-danger" onClick={() => this.deleteEmployee(user)}>Delete</li>
                </div>
              }
            </h1>
          )}
        </div>
      </div>
    );
  }
}

export default UserIndex;
