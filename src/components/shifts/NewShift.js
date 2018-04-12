import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import ShiftForm from './ShiftForm';
import Flash from '../../lib/Flash';

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
    this.setState({ employee: staff, errosr: errors}, () => console.log('Employee', this.state));
  }

  handleShiftType = (e) => {
    console.log(e.target.value);
    const errors = Object.assign({}, this.state.errors, { shiftType: '' });
    this.setState({ shiftType: e.target.value, errors: errors},
      () =>
        this.state.shiftType === 0 ? this.setState({ shiftType: 'Afternoon Shift'}) : this.setState({ shiftType: 'Evening Shift'}));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: '/api/shifts',
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => {
        axios.get('/api/days')
          .then(res => this.setState({ displayDays: res.data.days, displayEmployees: res.data.users, shiftType: '' }));
      })
      .then(() => Flash.setMessage('info', 'Shift Created'))
      .then(() => this.props.history.push('/shifts/new'))
      .then(() => console.log(this.state))
      .catch(err => this.setState({errors: err.response.data.errors}));
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
