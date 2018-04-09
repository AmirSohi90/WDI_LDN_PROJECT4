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
      <ShiftForm
        handleDayChange={this.handleDayChange}
        handleEmployeeChange={this.handleEmployeeChange}
        handleShiftType={this.handleShiftType}
        handleSubmit={this.handleSubmit}
        data={this.state}
      />
    );
  }
}

export default NewShift;
