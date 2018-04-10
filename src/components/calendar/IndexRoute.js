import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class IndexRoute extends React.Component{

  state = {
    days: [],
    shifts: [],
    shiftsRequested: 0
  }

  componentDidMount(){
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
      .then(res => this.setState({ days: res.data.days }, () => console.log('DATA', this.state)));
  }

  handleDelete = () => {
    axios.delete(`api/days/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/days'));
  }

  handleClick = (shift) => {

    this.setState({shiftsRequested: this.state.shiftsRequested + 1});

    if(this.state.shiftsRequested === 0){
      this.setState({ shiftOne: shift, shiftId: shift._id, userOne: shift.employee._id}, () => console.log(this.state));
    } else {
      this.setState({ shiftTwo: shift, userTwo: shift.employee._id }, () => console.log(this.state));
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ shiftsRequested: 0});

    axios({
      method: 'POST',
      url: '/api/requests',
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => this.props.history.push('/shifts/new'));
  }

  handleReset = () => {
    this.setState({ shifts: []}, () => console.log(this.state.shifts));
  }


  render(){
    return(
      <div className="container">
        <ul className="columns is-multiline">
          <div className="column is-full-desktop">
            {this.state.shifts.length === 1 &&
              <div>
                <h1 className="subtitle">Change Shift: {this.state.shifts[0].employee.firstName} {this.state.shifts[0].employee.lastName}s {this.state.shifts[0].shiftType} on {this.state.shifts[0].day.dayOfTheWeek} - {this.state.shifts[0].day.date} {}</h1>
                <h1 className="button" onClick={this.handleReset}>Reset</h1>
              </div>
            }
            {this.state.shifts.length > 1 &&
              <div>
                <h1 className="subtitle">Change Shift: {this.state.shifts[0].employee.firstName} {this.state.shifts[0].employee.lastName}s {this.state.shifts[0].shiftType} on {this.state.shifts[0].day.dayOfTheWeek} - {this.state.shifts[0].day.date} with {this.state.shifts[0].employee.firstName} {this.state.shifts[1].employee.lastName}s {this.state.shifts[1].shiftType} on {this.state.shifts[1].day.dayOfTheWeek} - {this.state.shifts[1].day.date}</h1>
                <h1 className="button" onClick={this.handleReset}>Reset</h1>
              </div>
            }
            <form onSubmit={this.handleSubmit}>
              {this.state.shiftTwo &&
              <button className="button is-info">Change Shift</button>
              }
            </form>
          </div>
          {this.state.days.map((day, i) =>
            <div key={i} className="card column is-full-desktop">
              <li className="card-content">
                <div>
                  <Link className="title" to={`days/${day._id}`}>
                    {day.dayOfTheWeek} - {day.date}
                  </Link>
                </div>
                <div className="column is-half-desktop">
                  <h1 className="subtitle is-size-4">Afternoon Shifts</h1>
                  {day.shifts.map((shift, i) =>
                    shift.shiftType === 'Afternoon Shift' &&
                    <div key={i}>
                      <h1>{shift.employee.firstName} {shift.employee.lastName} - {shift.employee.jobRole}</h1>
                      {this.state.shiftsRequested === 0 && this.state.userId === shift.employee._id &&
                      <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />
                      }
                      {this.state.shiftsRequested === 1 && this.state.userId !== shift.employee._id &&
                        <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />}
                    </div>
                  )}
                </div>
                <div className="column is-half-desktop">
                  <h1 className="subtitle is-size-4">Evening Shifts</h1>
                  {day.shifts.map((shift, i) =>
                    shift.shiftType === 'Evening Shift' &&
                    <div key={i}>
                      <h1>{shift.employee.firstName} {shift.employee.lastName} - {shift.employee.jobRole}</h1>
                      {this.state.shiftsRequested === 0 && this.state.userId === shift.employee._id &&
                      <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />
                      }
                      {this.state.shiftsRequested === 1 && this.state.userId !== shift.employee._id &&
                        <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />}
                    </div>
                  )}
                </div>
              </li>
            </div>
          )}
        </ul>
      </div>
    );
  }
}

export default IndexRoute;
