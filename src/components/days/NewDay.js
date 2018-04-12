import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import DayForm from './DayForm';
import Flash from '../../lib/Flash';

class NewDay extends React.Component{

  state = {
    dayOfTheWeek: '',
    date: '',
    errors: {}
  }


  componentDidMount(){
    const userId = Auth.getPayload().sub;
    axios.get(`/api/users/${userId}`)
      .then(res => this.setState({
        user: res.data,
        userId: res.data._id,
        employer: res.data.employer
      }, () => console.log('STATE', this.state)));
  }

  handleChange = ({ target: { name, value }  }) => {
    const errors = Object.assign({}, this.state.errors, { [name]: ''});
    this.setState({ [name]: value, errors }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: '/api/days',
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state
    })
      .then(() => Flash.setMessage('info', 'Day Created'))
      .then(() => this.props.history.push('/shifts/new'))
      .catch(err => this.setState({errors: err.response.data.errors}));
  }

  render() {
    return (
      <div className="container">
        <div>
          {!this.state.employer &&
            <h1 className="title">You do not have access to this page</h1>
          }
          {this.state.employer &&
            <div>
              <div className="columns is-multiline is-mobile day-form-title">
                <div className="column is-full-mobile is-full-desktop is-full-tablet">
                  <h1 className="day-form-title-text">Please Make a Day to Add to the Calendar</h1>
                </div>
              </div>
              <DayForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                data={this.state}
              />

            </div>
          }
        </div>
      </div>
    );
  }

}

export default NewDay;
