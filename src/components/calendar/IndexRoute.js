import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

let chosenShifts = 0;

class IndexRoute extends React.Component{

  state = {
    days: [],
    shifts: []
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
    chosenShifts = this.state.shifts.concat(shift);
    console.log(chosenShifts);
    let updatedShift1 = {};
    let updatedShift2 = {};
    this.setState({ shifts: chosenShifts}, () => {
      if (this.state.shifts.length === 2) {
        updatedShift1 = Object.assign({}, this.state.shifts[0],
          {
            ... this.state.shifts[0],
            employee: this.state.shifts[1].employee}
        );
        updatedShift2 = Object.assign({}, this.state.shifts[1],
          {
            ... this.state.shifts[1],
            employee: this.state.shifts[0].employee}
        );
      }

      const updatedShifts = [updatedShift1, updatedShift2];
      this.setState({ updatedShifts: updatedShifts }, () => console.log(this.state.shifts));
    });
  }

  handleSubmit = () => {
    this.state.updatedShifts.forEach((shift, i) => {
      axios({
        method: 'PUT',
        url: `/api/shifts/${shift._id}`,
        headers: { Authorization: `Bearer ${Auth.getToken()}` },
        data: this.state.updatedShifts[i]
      })
        .then(() => this.props.history.push('/days'));
    });
  }

  handleReset = () => {
    this.setState({ shifts: []});
  }


  render(){
    return(
      <div className="container">
        <ul className="columns is-multiline">
          <div className="column is-full-desktop">
            {this.state.shifts.length === 1 &&
              <div>
                <h1>Change Shift: {this.state.shifts[0].employee.firstName} on {}</h1>
                <h1 className="button" onClick={this.handleReset}>Reset</h1>
              </div>
            }
            {this.state.shifts.length > 1 &&
              <div>
                <h1>Change Shift: {this.state.shifts[0].employee.firstName} {this.state.shifts[0].employee.lastName}s {this.state.shifts[0].shiftType} on {this.state.shifts[0].day.dayOfTheWeek} - {this.state.shifts[0].day.date} with {this.state.shifts[0].employee.firstName} {this.state.shifts[1].employee.lastName}s {this.state.shifts[1].shiftType} on {this.state.shifts[1].day.dayOfTheWeek} - {this.state.shifts[1].day.date}</h1>
                <h1 className="button" onClick={this.handleReset}>Reset</h1>
              </div>
            }
          </div>
          {this.state.shifts.length === 2 &&
            <form onSubmit={this.handleSubmit}>
              <button className="button is-info">Change Shift</button>
            </form>
          }
          {this.state.days.map((day, i) =>
            <div key={i} className="card column is-full-desktop">
              <li className="card-content">
                <div>
                  <Link className="title" to={`days/${day._id}`}>
                    {day.dayOfTheWeek} - {day.date}
                  </Link>
                </div>
                <div className="column is-half-desktop">
                  <h1 className="">Afternoon Shifts</h1>
                  {day.shifts.map((shift, i) =>
                    shift.shiftType === 'Afternoon Shift' &&
                    <div key={i}>
                      <h1>{shift.employee.firstName} {shift.shiftType}</h1>
                      {this.state.shifts.length === 0 && this.state.userId === shift.employee._id &&
                        <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />
                      }
                      {this.state.shifts.length === 1 && this.state.userId !== shift.employee._id &&
                        <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />
                      }
                    </div>
                  )}
                </div>
                <div className="column is-half-desktop">
                  <h1>Evening Shifts</h1>
                  {day.shifts.map((shift, i) =>
                    shift.shiftType === 'Evening Shift' &&
                    <div key={i}>
                      <h1>{shift.employee.firstName} {shift.shiftType}</h1>
                      {this.state.shifts.length === 0 && this.state.userId === shift.employee._id &&
                        <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />
                      }
                      {this.state.shifts.length === 1 && this.state.userId !== shift.employee._id &&
                        <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />
                      }
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
