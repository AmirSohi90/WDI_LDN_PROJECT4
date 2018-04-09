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
                <h1 className="subtitle"><strong>Select Day: {data.day.dayOfTheWeek} {data.day.date}</strong></h1>
                <ul className="columns is-multiline">
                  {data.displayDays.map((day, i) =>
                    <div key={i} className="column is-one-quarter-desktop">
                      <li className="button is-info" onClick={() => handleDayChange(day)}>{day.dayOfTheWeek} {day.date}</li>
                    </div>
                  )}
                  <div className="column is-full-desktop">
                    <Link className="button" to="/days/new">Click here if you cant find a day</Link>
                  </div>
                </ul>
                <h1 className="subtitle"><strong>Select Employee: {data.employee.firstName} {data.employee.lastName} - {data.employee.jobRole}</strong></h1>
                <ul className="columns is-multiline">
                  {data.displayEmployees.map((staff, i) =>
                    <div key={i} className="column is-one-quarter-desktop">
                      <li value={staff} className="button is-info" onClick={() => handleEmployeeChange(staff)}>{staff.firstName} {staff.lastName} - {staff.jobRole}</li>
                    </div>
                  )}
                </ul>
                <h1 className="subtitle"><strong>Select Shift Type: {data.shiftType}</strong></h1>
                <input name="shift" type="radio" value="Afternoon Shift" onClick={handleShiftType}/>
                <label>Afternoon Shift</label>
                {' '}
                <input name="shift" type="radio" value="Evening Shift" onClick={handleShiftType}/>
                <label>Evening Shift</label>
              </div>
            </div>
          </div>
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    </div>
  );
};

export default ShiftForm;
