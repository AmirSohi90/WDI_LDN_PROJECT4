import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class ShowRoute extends React.Component{
  state = {
    day: []
  }

  componentDidMount(){
    axios.get(`/api/days/${this.props.match.params.id}`)
      .then(res => this.setState({ day: res.data, shifts: res.data.shifts }, () => console.log(this.state.day)));
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
        {/* <ul>
          {this.state.day.shifts.map((shift, i) => {
            <li key={i}>
              {shift.employee}
              {shift.shiftType}
            </li>
          })}
        </ul> */}
        <button className="button is-danger" onClick={this.deleteDay}>Delete</button>
      </div>
    );
  }
}

export default ShowRoute;
