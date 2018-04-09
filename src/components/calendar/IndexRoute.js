import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

class IndexRoute extends React.Component{

  state = {
    day: []
  }

  componentDidMount(){
    axios.get('/api/days')
      .then(res => this.setState({ day: res.data.days }, () => console.log(res.data)));
  }

  handleDelete = () => {
    axios.delete(`api/days/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/days'));
  }

  handleClick = (shift) => {
    console.log(shift);
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
                  <h1>{shift.employee} {shift.shiftType}</h1>
                  <input type="checkbox" value={shift} onClick={() => this.handleClick(shift)} />
                </div>
              )}
            </li>)}
        </ul>
        <button className="button is-info">Change Shift</button>
      </div>
    );
  }

}

export default IndexRoute;
