import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
// import { Link } from 'react-router-dom';

class UserShow extends React.Component{

  state = {
    day: [],
    shifts: [],
    requests: [],
    user: ''
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }));
    const userId = Auth.getPayload().sub;
    axios.get(`/api/users/${userId}`)
      .then(res => this.setState({
        user: res.data,
        userId: res.data._id,
        employer: res.data.employer
      }));

    axios.get('/api/requests')
      .then(res => this.setState({ requests: res.data }));

    axios.get('/api/days')
      .then(res => this.setState({ day: res.data.days }));

    axios.get('/api/shifts')
      .then(res => this.setState({ shifts: res.data.shifts }, () => console.log(this.state)));
  }

  handleAcceptShift = (request) => {
    const acceptedRequest = Object.assign({}, request, { status: 'Accepted'});
    axios.put(`/api/requests/${request._id}`, acceptedRequest)
      .then(() => {
        console.log(this.state);
        axios.get('/api/days')
          .then(res => this.setState({ day: res.data.days }));
        this.handleAcceptChange(request);
      });
  }

  handleDeclineShift = (request) => {
    const declinedRequest = Object.assign({}, request, { status: 'Declined'});
    axios.put(`/api/requests/${request._id}`, declinedRequest)
      .then(() => {
        console.log(this.state);
        axios.get('/api/days')
          .then(res => this.setState({ day: res.data.days }));
      });
  }

  handleAcceptChange = (request) => {
    const shifts = this.state.shifts.slice();
    const shift1 = shifts.find(shift => request.shiftOne._id === shift._id);
    shift1.employee = request.shiftTwo.employee;
    axios.put(`/api/shifts/${shift1._id}`, shift1)
      .then(res => console.log('new shift 1', res.data));
    const shift2 = shifts.find(shift => request.shiftTwo._id === shift._id);
    shift2.employee = request.shiftOne.employee;
    axios.put(`/api/shifts/${shift2._id}`, shift2)
      .then(res => {
        console.log('new shift 2', res.data);
        axios.get('/api/days')
          .then(res => this.setState({ day: res.data.days }));
      });
  }

  render(){
    // console.log('STATE', this.state);
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
        <div className="columns is-multiline">
          <h1 className="title column is-full-desktop">Pending Shift Changes</h1>
        </div>
        <div className="columns is-multiline">
          {this.state.requests.map((request, i) =>
            request.status === 'Pending' &&
            <div className="column is-full-desktop card" key={i}>
              {request.userOne._id === this.state.userId && request.status === 'Pending' &&
                <h1>{request.status} {request.userOne.firstName} change with {request.userTwo.firstName}</h1>
                ||
                request.userTwo._id === this.state.userId && request.status === 'Pending' &&
                <h1>{request.status} {request.userOne.firstName} change with {request.userTwo.firstName}</h1>
                ||
                this.state.user.employer && request.status === 'Pending' &&
                <h1>{request.status} {request.userOne.firstName} change with {request.userTwo.firstName}</h1>
              }
              {this.state.user.employer && request.status === 'Pending' &&
              <div>
                <button className="button is-info" onClick={() => this.handleAcceptChange(request)}>Accept Shift Swap</button>
                {' '}
                <button className="button is-danger" onClick={() => this.handleDeclineShift(request)}>Decline Shift Swap</button>
              </div>
              }
            </div>
          )}
        </div>
        <div className="columns is-multiline">
          <h1 className="title column is-full-desktop">Accepted Shift Changes</h1>
        </div>
        <div className="columns is-multiline">
          {this.state.requests.map((request, i) =>
            request.status === 'Accepted' &&
            <div className="column is-full-desktop card" key={i}>
              {request.userOne._id === this.state.userId && request.status === 'Accepted' &&
                <h1>{request.status} {request.userOne.firstName} change with {request.userTwo.firstName}</h1>
                ||
                request.userTwo._id === this.state.userId && request.status === 'Accepted' &&
                <h1>{request.status} {request.userOne.firstName} change with {request.userTwo.firstName}</h1>
                ||
                this.state.user.employer && request.status === 'Accepted' &&
                <h1>{request.status} {request.userOne.firstName} change with {request.userTwo.firstName}</h1>
              }
            </div>
          )}
        </div>
        <div className="columns is-multiline">
          <h1 className="title column is-full-desktop">Declined Shift Changes</h1>
        </div>
        <div className="columns is-multiline">
          {this.state.requests.map((request, i) =>
            request.status === 'Declined' &&
            <div className="column is-full-desktop card" key={i}>
              {request.userOne._id === this.state.userId && request.status === 'Declined' &&
                <h1>{request.status} {request.userOne.firstName} change with {request.userTwo.firstName}</h1>
                ||
                request.userTwo._id === this.state.userId && request.status === 'Declined' &&
                <h1>{request.status} {request.userOne.firstName} change with {request.userTwo.firstName}</h1>
                ||
                this.state.user.employer && request.status === 'Declined' &&
                <h1>{request.status} {request.userOne.firstName} change with {request.userTwo.firstName}</h1>
              }
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserShow;
