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

  handleDayChange = (e) => {
    this.setState({ day: e.target.value }, () => console.log('State' + this.state));
  }

  handleEmployeeChange = (e) => {
    this.setState({ employee: e.target.value}, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: '/api/shifts',
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => this.props.history.push('/days'));
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="columns is-multiline is-mobile">
            <div className="column is-full-desktop">
              <div className="field">
                <div className="control">
                  <h1>Select Day: {this.state.day}</h1>
                  {this.state.displayDays.map((day, i) =>
                    <button key={i} value={day} className="button" onClick={this.handleDayChange}>{day.dayOfTheWeek} {day.date}</button>
                  )}
                  <h1>Select Employee: {this.state.employee}</h1>
                  {this.state.displayEmployees.map((staff, i) =>
                    <button key={i} value={staff} className="button" onClick={this.handleEmployeeChange}>{staff.firstName} {staff.lastName} - {staff.jobRole}</button>
                  )}
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

{/* <form onSubmit={this.handleSubmit}>
  <div className="columns is-multiline is-mobile">
    <div className="column is-full-desktop">
      <div className="field">
        <div className="control">
          <div className="select">
            <label htmlFor="dayOfTheWeek">Day of the Week</label>
            <select name="day" onChange={this.handleChange} value={this.state.day.dayOfTheWeek}>
              {this.state.day.map((day, i) =>
                <option key={i} value={this.state.day}>{day.dayOfTheWeek} {day.date}</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button className="button is-primary">Submit</button>
</form> */}
