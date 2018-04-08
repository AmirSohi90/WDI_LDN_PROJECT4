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
      .then(res => this.setState({ day: res.data.days } ,() => console.log(this.props.match.params)));
  }

  handleDelete = () => {
    axios.delete(`api/days/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/days'));
  }

  render(){
    return(
      <div className="container">
        <ul className="columns is-multiline">
          {this.state.day.map((day, i) =>
            <li key={i} className="column is-one-third-desktop">
              <Link to={`days/${day._id}`}>
                {day.dayOfTheWeek} - {day.date}
                {day.shifts.map((shift, i) =>
                  <h1 key={i}>{shift.employee} - {shift.shiftType}</h1>
                )}
              </Link>
            </li>)}
        </ul>
      </div>
    );
  }

}

export default IndexRoute;
