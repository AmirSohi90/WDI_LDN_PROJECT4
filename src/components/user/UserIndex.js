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
        {!this.state.employer &&
          <h1 className="title">You do not have access to this page</h1>
        }

        {this.state.employer &&
        <div className="columns user-index-wrap-box card is-multiline is-mobile">
          {this.state.users.map((user, i) =>
            <div key={i} className="column user-index-employee-box card is-full-desktop is-full-tablet is-full-mobile">
              <h1 className="subtitle">{user.firstName} {user.lastName} - {user.jobRole}</h1>
              {this.state.employer &&
                <div>
                  <Link className="button is-info" to={`users/${user._id}/edit`}>Edit</Link>
                  {' '}
                  <li className="button is-danger" onClick={() => this.deleteEmployee(user)}>Delete</li>
                </div>
              }
            </div>
          )}
        </div>
        }
      </div>
    );
  }
}

export default UserIndex;
