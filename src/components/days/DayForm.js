import React from 'react';

const DayForm = ({ handleChange, handleSubmit, data }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="columns is-multiline is-mobile">
        <div className="column is-full-desktop">
          <div className="field">
            <div className="control">
              <div className="select">
                <label htmlFor="dayOfTheWeek">Day of the Week</label>
                <select name="dayOfTheWeek" onChange={handleChange} value={data.dayOfTheWeek}>
                  <option value="" disabled>Select a Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-full-desktop">
          <div className="field">
            <div className="control">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="input"
                placeholder="Date"
                name="date"
                onChange={handleChange}
                value={data.date}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="button is-primary">Submit</button>
    </form>
  );
};

export default DayForm;
