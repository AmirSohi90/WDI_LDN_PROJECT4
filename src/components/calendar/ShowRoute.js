import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class ShowRoute extends React.Component{
  state = {
    day: '',
    shifts: [],
    isDeleted: false
  }

  componentDidMount(){
    const userId = Auth.getPayload().sub;
    console.log('USERID', userId);
    axios.get(`/api/users/${userId}`)
      .then(res => this.setState({
        user: res.data,
        userId: res.data._id,
        employer: res.data.employer
      },
      () => console.log('STATE', this.state)));
    axios.get(`/api/days/${this.props.match.params.id}`)
      .then(res => this.setState({ day: res.data, shifts: res.data.shifts }, () => console.log('DATA', this.state)));
  }

  handleToggle = () => {
    this.setState({ isDeleted: !this.state.isDeleted });
  }

  deleteDay = () => {
    axios.delete(`/api/days/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/days'));
  }

  render(){
    return(
      <div className="container">
        <div className="card">
          <h1 className="card-content calendar-show-title">{this.state.day.dayOfTheWeek} - {this.state.day.date}</h1>
          <div className="calendar-show-box">
            {this.state.shifts.map((shift, i) =>
              <div key={i} className="card-content">
                <h1 className="calendar-show-shifts">{shift.employee.firstName} {shift.employee.lastName} - {shift.shiftType}</h1>
              </div>
            )}
          </div>
        </div>
        {this.state.employer && <div>
          {!this.state.isDeleted ?
            <div>
              <Link className="button is-info" to={`/days/${this.props.match.params.id}/edit`}>Edit Day</Link>
              {' '}
              <button className="button is-danger" onClick={this.handleToggle}>Delete Day</button>
            </div>
            :
            <div>
              <h5 className="subtitle">Are you sure?</h5>
              <button className="button is-primary" onClick={this.handleToggle}>No</button>
              {' '}
              <button className="button is-danger" onClick={this.deleteDay}>Yes</button>
            </div>
          }
        </div>}
      </div>
    );
  }
}

export default ShowRoute;
