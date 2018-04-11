import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import ShiftForm from './ShiftForm';

class NewShift extends React.Component{

  state = {
    shiftType: '',
    employee: '',
    day: '',
    displayDays: [],
    displayEmployees: [],
    errors: {}
  }

  componentDidMount(){
    axios.get('/api/days')
      .then(res => this.setState({ displayDays: res.data.days, displayEmployees: res.data.users }, () => console.log(res.data)));
    axios.get(`/api/shifts/${this.props.match.params.id}`)
      .then((res => this.setState(res.data, () => console.log(this.state))));
    const userId = Auth.getPayload().sub;
    axios.get(`/api/users/${userId}`)
      .then(res => this.setState({
        user: res.data,
        userId: res.data._id,
        employer: res.data.employer
      }, () => console.log('STATE', this.state)));
  }

  handleDayChange = (day) => {
    const errors = Object.assign({}, this.state.errors, { day: '' });
    this.setState({ day: day, errors: errors }, () => console.log('State', this.state));
  }

  handleEmployeeChange = (staff) => {
    const errors = Object.assign({}, this.state.errors, { employee: '' });
    this.setState({ employee: staff, errors: errors}, () => console.log('Employee', this.state));
  }

  handleShiftType = (e) => {
    const errors = Object.assign({}, this.state.errors, { shiftType: '' });
    this.setState({ shiftType: e.target.value, errors: errors}, () => console.log('Shift', this.state));
  }

  handleSubmit = () => {

    axios({
      method: 'PUT',
      url: `/api/shifts/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => this.props.history.push(`/shifts/${this.props.match.params.id}`))
      .then(() => console.log(this.state));
  }

  render() {
    return (
      <div className="container">
        {!this.state.employer &&
          <h1 className="title">You do not have access to this page</h1>
        }
        {this.state.employer &&
      <ShiftForm
        handleDayChange={this.handleDayChange}
        handleEmployeeChange={this.handleEmployeeChange}
        handleShiftType={this.handleShiftType}
        handleSubmit={this.handleSubmit}
        data={this.state}
      />
        }
      </div>
    );
  }
}

export default NewShift;
