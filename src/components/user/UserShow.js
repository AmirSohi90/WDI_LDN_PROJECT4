import React from 'react';
import axios from 'axios';
// import Auth from '../../lib/Auth';
// import { Link } from 'react-router-dom';

class UserShow extends React.Component{

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }, () => console.log(this.state)));
    axios.get('/api/days')
      .then(res => this.setState({ shifts: res.data }, () => console.log(this.state)));
  }

  render(){
    return(
      <h1>Hello</h1>
    );
  }
}

export default UserShow;
