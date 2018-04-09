import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class IndexRoute extends React.Component{

  state = {
    day: [],
    shifts: []
  }

  componentDidMount(){
    axios.get('/api/days')
      .then(res => this.setState({ day: res.data.days }, () => console.log('DATA', res.data)));
  }

  handleDelete = () => {
    axios.delete(`api/days/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/days'));
  }

  handleClick = (shift) => {
    // console.log(shift);
    const chosenShifts = this.state.shifts.concat(shift);
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
      this.setState({ updatedShifts: updatedShifts }, () => console.log(this.state.updatedShifts));
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

  render(){
    return(
      <div className="container">
        <ul className="columns is-multiline">
          {this.state.day.map((day, i) =>
            <li key={i} className="column card is-half-desktop is-full-mobile">
              <Link to={`days/${day._id}`}>
                {day.dayOfTheWeek} - {day.date}
              </Link>
              {day.shifts.map((shift, i) =>
                <div key={i}>
                  <h1>{shift.employee.firstName} {shift.shiftType}</h1>
                  <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />
                </div>
              )}
            </li>)}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <button className="button is-info">Change Shift</button>
        </form>
      </div>
    );
  }

}

export default IndexRoute;
