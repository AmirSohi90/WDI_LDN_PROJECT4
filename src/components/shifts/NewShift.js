import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import ShiftForm from './ShiftForm';

class NewShift extends React.Component{

  state = {
    shiftType: '',
    employee: '',
    day: ''
  }

  componentDidMount(){
    axios.get('/api/days')
      .then(res => this.setState({ day: res.data }, () => console.log(this.state)));
  }

  handleChange = ({ target: { name, value }  }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: '/api/shifts',
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => this.props.history.push('/shifts/new'));
  }

  render() {
    return (
      <div className="container">
      </div>
    );
  }
}

export default NewShift;
