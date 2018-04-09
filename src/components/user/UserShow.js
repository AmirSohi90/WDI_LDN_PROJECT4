import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
// import { Link } from 'react-router-dom';

class UserShow extends React.Component{

  state = {
    day: [],
    shift: [],
    user: ''
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }, () => console.log('USER', this.state.user)));
    const userId = Auth.getPayload().sub;
    console.log(userId);
    axios.get(`/api/users/${userId}`)
      .then(res => this.setState({
        user: res.data,
        userId: res.data._id,
        employer: res.data.employer
      },
      () => console.log('STATE', this.state)));
    axios.get('/api/days')
      .then(res => this.setState({ day: res.data.days }, () => console.log('DATA', this.state)));
  }

  render(){
    return(
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-full-desktop">
            <h1 className="title">Name: {this.state.user.firstName} {this.state.user.lastName}</h1>
          </div>
          <div className="column is-full-desktop">
            <h1 className="title">Job Title: {this.state.user.jobRole}</h1>
          </div>
        </div>
        <ul className="columns is-multiline">
          {this.state.day.map((day, i) =>
            <li key={i} className="card column is-full-desktop">
              <h1 className="title is-size-4">{day.dayOfTheWeek} - {day.date}</h1>
              {day.shifts.map((shift, i) =>
                shift.employee._id === this.state.userId &&
                <h1 key={i} className="subtitle is-size-5">{shift.employee.firstName} {shift.employee.lastName} - {shift.shiftType}</h1>
              )}
            </li>)}
        </ul>
      </div>
    );
  }
}

export default UserShow;
