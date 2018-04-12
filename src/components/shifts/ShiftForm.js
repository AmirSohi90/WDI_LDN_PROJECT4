import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router-dom';

const ShiftForm = ({ handleDayChange, handleEmployeeChange, handleShiftType, handleSubmit, data }) => {

  const orderedDays = _.orderBy(data.displayDays, ['date'], ['asc']);
  const orderedEmployees = _.orderBy(data.displayEmployees, ['lastName'], ['asc']);

  return(
    <div className="container">
      <div className="columns is-multiline is-mobile">
        <div className="shift-form-wrap-box column is-full-desktop is-full-mobile is-full-tablet">
          <h1 className="shift-form-title">Please Make a Shift</h1>
        </div>
      </div>
      <ul className="columns shift-form-date-wrap-box is-multiline is-mobile">
        {data.displayDays.map((day, i) =>
          <li key={i} className="card shift-form-shift-boxes column is-one-third-desktop is-half-tablet is-full-mobile">
            <h1 className="shift-form-date-title">{day.dayOfTheWeek} - {day.date}</h1>
            {day.shifts.map((shift, i) =>
              <h1 className="shift-form-employee-text" key={i}>{shift.employee.firstName} {shift.employee.lastName} - {shift.shiftType}</h1>
            )}
          </li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="columns is-multiline is-mobile">
          <div className="column is-full-desktop">
            <div className="field">
              <div className="control">
                <div className="columns is-multiline is-mobile">
                  <div className="column is-full-desktop is-full-mobile is-full-tablet">
                    <h1 className="shift-form-title">Please Select a Day</h1>
                  </div>
                  {orderedDays.map((day, i) =>
                    data.day !== day ?
                      <div key={i} className="column is-one-quarter-desktop">
                        <li className="button shift-form-buttons-unselected" onClick={() => handleDayChange(day)}>{day.dayOfTheWeek} {day.date}</li>
                      </div>
                      :
                      <div key={i} className="column is-one-quarter-desktop">
                        <li className="button shift-form-buttons-selected" onClick={() => handleDayChange(day)}>{day.dayOfTheWeek} {day.date}</li>
                      </div>
                  )}
                  <div className="column is-full-desktop">
                    <Link className="button shift-form-new-day-button" to="/days/new">Click here if you cant find a day</Link>
                  </div>
                  <div className="column is-full-desktop is-full-mobile is-full-tablet">
                    <h1 className="shift-form-title">Please Select an Employee</h1>
                  </div>
                </div>
                {data.errors.day && <small>Please select a day</small>}
                <ul className="columns is-multiline">
                  {orderedEmployees.map((staff, i) =>
                    data.employee !== staff ?
                      <div key={i} className="column is-one-quarter-desktop">
                        <li value={staff} className="button shift-form-buttons-unselected" onClick={() => handleEmployeeChange(staff)}>{staff.firstName} {staff.lastName} - {staff.jobRole}</li>
                      </div>
                      :
                      <div key={i} className="column is-one-quarter-desktop">
                        <li value={staff} className="button shift-form-buttons-selected" onClick={() => handleEmployeeChange(staff)}>{staff.firstName} {staff.lastName} - {staff.jobRole}</li>
                      </div>
                  )}
                </ul>
                {data.errors.employee && <small>Please select an employee</small>}
                <div className="column is-full-desktop is-full-mobile is-full-tablet">
                  <h1 className="shift-form-title">Select Shift Type</h1>
                </div>
                {data.shiftType === 'Afternoon Shift' &&
                  <li className="button shift-form-buttons-selected" value="0" onClick={(e) => handleShiftType(e)}>
                    Afternoon Shift</li>
                }
                {(!data.shiftType === 'Afternoon Shift' || !data.shiftType || data.shiftType === 'Evening Shift') &&
                  <li className="button shift-form-buttons-unselected" value="0" onClick={(e) => handleShiftType(e)}>
                    Afternoon Shift</li>
                }
                {' '}
                {data.shiftType === 'Evening Shift' &&
                <li className="button shift-form-buttons-selected" value="1" onClick={(e) => handleShiftType(e)}>
                  Evening Shift</li>
                }
                {(!data.shiftType === 'Evening Shift' || !data.shiftType || data.shiftType === 'Afternoon Shift') &&
                <li className="button shift-form-buttons-unselected" value="1" onClick={(e) => handleShiftType(e)}>
                  Evening Shift</li>
                }
              </div>
              {data.errors.shiftType && <small>{data.errors.shiftType}</small>}
            </div>
          </div>
        </div>
        <button className="button shift-form-submit-button">Submit</button>
      </form>
    </div>
  );
};

export default ShiftForm;
