import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class NewShift extends React.Component{

  state = {
    shiftType: '',
    employee: '',
    day: '',
    displayDays: [],
    displayEmployees: []
  }

  componentDidMount(){
    axios.get('/api/days')
      .then(res => this.setState({ displayDays: res.data.days, displayEmployees: res.data.users }, () => console.log(res.data)));
  }

  handleDayChange = (day) => {
    this.setState({ day: day }, () => console.log('State', this.state));
  }

  handleEmployeeChange = (staff) => {
    this.setState({ employee: staff}, () => console.log('Employee', this.state));
  }

  handleShiftType = (e) => {
    this.setState({ shiftType: e.target.value}, () => console.log('Shift', this.state));
  }

  handleSubmit = () => {

    axios({
      method: 'POST',
      url: '/api/shifts',
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => this.props.history.push('/shifts/new'))
      .then(() => console.log(this.state));
  }

  render() {
    return (
      <div className="container">
        <ul className="columns is-multiline">
          {this.state.displayDays.map((day, i) =>
            <li key={i} className="column is-one-third-desktop">
              {day.dayOfTheWeek} - {day.date}
              {day.shifts.map((shift, i) =>
                <li key={i}>{shift.employee} - {shift.shiftType}</li>
              )}
            </li>)}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <div className="columns is-multiline is-mobile">
            <div className="column is-full-desktop">
              <div className="field">
                <div className="control">
                  <h1>Select Day: {this.state.day.dayOfTheWeek} {this.state.day.date}</h1>
                  <ul>
                    {this.state.displayDays.map((day, i) =>
                      <li key={i} className="button" onClick={() => this.handleDayChange(day)}>{day.dayOfTheWeek} {day.date}</li>
                    )}
                  </ul>
                  <h1>Select Employee: {this.state.employee.firstName} {this.state.employee.lastName} - {this.state.employee.jobRole}</h1>
                  <ul>
                    {this.state.displayEmployees.map((staff, i) =>
                      <li key={i} value={staff} className="button" onClick={() => this.handleEmployeeChange(staff)}>{staff.firstName} {staff.lastName} - {staff.jobRole}</li>
                    )}
                  </ul>
                  <h1>Select Shift Type: {this.state.shiftType}</h1>
                  <input type="radio" value="Afternoon Shift" onClick={this.handleShiftType}/>
                  <label>Afternoon Shift</label>
                  {' '}
                  <input type="radio" value="Evening Shift" onClick={this.handleShiftType}/>
                  <label>Evening Shift</label>
                </div>
              </div>
            </div>
          </div>

          <button className="button is-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default NewShift;
