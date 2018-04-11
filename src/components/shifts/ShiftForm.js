import React from 'react';

import { Link } from 'react-router-dom';

const ShiftForm = ({ handleDayChange, handleEmployeeChange, handleShiftType, handleSubmit, data }) => {

  return(
    <div className="container">
      <ul className="columns is-multiline">
        {data.displayDays.map((day, i) =>
          <li key={i} className="card column is-one-third-desktop">
            <h1 className="title">{day.dayOfTheWeek} - {day.date}</h1>
            {day.shifts.map((shift, i) =>
              <h1 key={i}>{shift.employee.firstName} {shift.employee.lastName} - {shift.shiftType}</h1>
            )}
          </li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="columns is-multiline is-mobile">
          <div className="column is-full-desktop">
            <div className="field">
              <div className="control">
                <ul className="columns is-multiline">
                  {data.displayDays.map((day, i) =>
                    //if the day of the week === data.dayOfTheWeek the colour changes
                    data.day !== day ?
                      <div key={i} className="column is-one-quarter-desktop">
                        <li className="button is-info" onClick={() => handleDayChange(day)}>{day.dayOfTheWeek} {day.date}</li>
                      </div>
                      :
                      <div key={i} className="column is-one-quarter-desktop">
                        <li className="button shift-form-selected" onClick={() => handleDayChange(day)}>{day.dayOfTheWeek} {day.date}</li>
                      </div>
                  )}
                  <div className="column is-full-desktop">
                    <Link className="button" to="/days/new">Click here if you cant find a day</Link>
                  </div>
                </ul>
                {data.errors.day && <small>Please select a day</small>}
                <ul className="columns is-multiline">
                  {data.displayEmployees.map((staff, i) =>
                    data.employee !== staff ?
                      <div key={i} className="column is-one-quarter-desktop">
                        <li value={staff} className="button is-info" onClick={() => handleEmployeeChange(staff)}>{staff.firstName} {staff.lastName} - {staff.jobRole}</li>
                      </div>
                      :
                      <div key={i} className="column is-one-quarter-desktop">
                        <li value={staff} className="button shift-form-selected" onClick={() => handleEmployeeChange(staff)}>{staff.firstName} {staff.lastName} - {staff.jobRole}</li>
                      </div>
                  )}
                </ul>
                {data.errors.employee && <small>Please select an employee</small>}
                <h1 className="subtitle"><strong>Select Shift Type: {data.shiftType}</strong></h1>
                <input name="shift" type="radio" value="Afternoon Shift" onClick={handleShiftType}/>
                <label>Afternoon Shift</label>
                {' '}
                <input name="shift" type="radio" value="Evening Shift" onClick={handleShiftType}/>
                <label>Evening Shift</label>
              </div>
              {data.errors.shiftType && <small>{data.errors.shiftType}</small>}
            </div>
          </div>
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    </div>
  );
};

export default ShiftForm;
