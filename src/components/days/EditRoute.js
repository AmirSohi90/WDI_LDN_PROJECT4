import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import DayForm from './DayForm';

class EditDay extends React.Component{

  state = {
    dayOfTheWeek: '',
    date: ''
  }

  componentDidMount(){
    axios.get(`/api/days/${this.props.match.params.id}`)
      .then(res => this.setState(res.data, () => console.log(this.state)));
  }

  handleChange = ({ target: { name, value }  }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'PUT',
      url: `/api/days/${this.props.match.params.id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => this.props.history.push('/days'));
  }

  render() {
    return (
      <div className="container">
        <DayForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          data={this.state}
        />
      </div>
    );
  }

}

export default EditDay;
