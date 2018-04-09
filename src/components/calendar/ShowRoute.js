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
    axios.get(`/api/days/${this.props.match.params.id}`)
      .then(res => this.setState({ day: res.data, shifts: res.data.shifts }, () => console.log(this.state)));
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
        <h1 className="title">{this.state.day.dayOfTheWeek} - {this.state.day.date}</h1>
        <ul>
          {this.state.shifts.map((shift, i) =>
            <li key={i}>
              {shift.employee} - {shift.shiftType}
            </li>
          )}
        </ul>
        {!this.state.isDeleted ?
          <div>
            <Link className="button is-primary" to={`/days/${this.props.match.params.id}/edit`}>Edit</Link>
            {' '}
            <button className="button is-danger" onClick={this.handleToggle}>Delete</button>
          </div>
          :
          <div>
            <h5 className="subtitle">Are you sure?</h5>
            <button className="button is-primary" onClick={this.handleToggle}>No</button>
            {' '}
            <button className="button is-danger" onClick={this.deleteDay}>Yes</button>
          </div>
        }
      </div>
    );
  }
}

export default ShowRoute;
