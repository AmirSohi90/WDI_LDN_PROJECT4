import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class IndexRoute extends React.Component{

  state = {
    days: [],
    shifts: [],
    shiftsRequested: 0,
    modalIsOpen: false
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
      this.setState({ shiftTwo: shift, userTwo: shift.employee._id, modalIsOpen: true }, () => console.log(this.state));
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
      .then(() => this.props.history.push(`users/${this.state.userId}`));
  }

  handleReset = () => {
    this.setState({ shiftOne: '', shiftTwo: '', shiftsRequested: 0, modalIsOpen: false});
  }

  render(){
    const orderedDays = _.orderBy(this.state.days, ['date'], ['asc']);
    return(
      <div className="container">
        {this.state.modalIsOpen && <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            {this.state.shiftTwo &&
              <div className="index-route-modal">
                <h1 className="index-route-modal-text">Change Shift: {this.state.shiftOne.employee.firstName} {this.state.shiftOne.employee.lastName} on {this.state.shiftOne.day.dayOfTheWeek} - {this.state.shiftOne.day.date}</h1>
                <h1 className="index-route-modal-text">With: {this.state.shiftTwo.employee.firstName} {this.state.shiftTwo.employee.lastName} on {this.state.shiftTwo.day.dayOfTheWeek} - {this.state.shiftTwo.day.date}</h1>
                <div className="index-route-button-wrap">
                  <h1 className="button" onClick={this.handleReset}>Reset</h1>
                  <button className="button index-route-button-style" onClick={this.handleSubmit}>Change Shift</button>
                </div>
              </div>
            }
          </div>
        </div>
        }
        <ul className="columns is-multiline">
          {orderedDays.map((day, i) =>
            <div key={i} className="card calendar-index-date-box column is-half-desktop is-full-mobile is-full-tablet">
              <li className="card-content">
                <div>
                  <h1 className="calendar-index-date"><Link to={`days/${day._id}`}>
                    {day.dayOfTheWeek} - {day.date}
                  </Link></h1>
                </div>
                <div className="columns is-multiline is-mobile">
                  <div className="column is-half-desktop is-full-mobile is-full-tablet">
                    <h1 className="calendar-index-shift-title">Afternoon Shifts</h1>
                    {day.shifts.map((shift, i) =>
                      shift.shiftType === 'Afternoon Shift' &&
                      <div className="calendar-index-shift-box-border columns is-multiline is-mobile" key={i}>
                        <div className="column is-full-desktop is-full-mobile is-full-tablet">
                          <div className="columns is-multiline is-mobile">
                            <div className="column is-two-thirds-desktop is-two-thirds-mobile is-two-thirds-tablet">
                              <h1 className="calendar-index-employee">{shift.employee.firstName} {shift.employee.lastName} - {shift.employee.jobRole}</h1>
                            </div>
                            <div className="column is-one-third-desktop is-one-third-mobile is-one-third-tablet">
                              {this.state.shiftsRequested === 0 && this.state.userId === shift.employee._id &&
                                <button className="button calendar-index-button" value={shift} onClick={() => this.handleClick(shift)}>Change</button>
                              }
                              {this.state.shiftsRequested === 1 && this.state.userId !== shift.employee._id &&
                                <button className="button calendar-index-button" value={shift} onClick={() => this.handleClick(shift)}>Change</button>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="column is-half-desktop">
                    <h1 className="calendar-index-shift-title">Evening Shifts</h1>
                    {day.shifts.map((shift, i) =>
                      shift.shiftType === 'Evening Shift' &&
                      <div className="columns is-multiline is-mobile" key={i}>
                        <div className="column is-full-desktop is-full-mobile is-full-tablet">
                          <div className="columns is-multiline is-mobile">
                            <div className="calendar-index-shift-employee-box column is-two-thirds-desktop">
                              <h1 className="calendar-index-employee">{shift.employee.firstName} {shift.employee.lastName} - {shift.employee.jobRole}</h1>
                            </div>
                            <div className="column is-one-third-desktop">
                              {this.state.shiftsRequested === 0 && this.state.userId === shift.employee._id &&
                                <button className="button calendar-index-button" value={shift} onClick={() => this.handleClick(shift)}>Change</button>
                              }
                              {this.state.shiftsRequested === 1 && this.state.userId !== shift.employee._id &&
                                <button className="button calendar-index-button" value={shift} onClick={() => this.handleClick(shift)}>Change</button>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
