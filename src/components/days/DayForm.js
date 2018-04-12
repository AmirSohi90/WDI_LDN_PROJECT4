import React from 'react';

const DayForm = ({ handleChange, handleSubmit, data }) => {
  return (
    <div className="container">
      <div className="columns is-multiline is-mobile day-form-title">
        <div className="column is-full-mobile is-full-desktop is-full-tablet">
          <h1 className="day-form-title-text">Please Make a Day to Add to the Calendar</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="columns day-form-wrap-box is-multiline is-mobile">
          <div className="column is-full-desktop is-full-mobile is-full-tablet">
            <div className="field">
              <div className="control">
                <div className="select">
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
                  {data.errors.dayOfTheWeek && <small>{data.errors.dayOfTheWeek}</small>}
                </div>
              </div>
            </div>
          </div>
          <div className="column day-form-date is-full-desktop is-full-mobile is-full-tablet">
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
                {data.errors.date && <small>{data.errors.date}</small>}
              </div>
            </div>
          </div>
          <button className="button is-info day-form-button">Submit</button>
        </div>

      </form>
    </div>
  );
};

export default DayForm;
