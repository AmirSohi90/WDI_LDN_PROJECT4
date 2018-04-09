import React from 'react';

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
                <h1>Select Day: {data.day.dayOfTheWeek} {data.day.date}</h1>
                <ul>
                  {data.displayDays.map((day, i) =>
                    <li key={i} className="button" onClick={() => handleDayChange(day)}>{day.dayOfTheWeek} {day.date}</li>
                  )}
                </ul>
                <h1>Select Employee: {data.employee.firstName} {data.employee.lastName} - {data.employee.jobRole}</h1>
                <ul>
                  {data.displayEmployees.map((staff, i) =>
                    <li key={i} value={staff} className="button" onClick={() => handleEmployeeChange(staff)}>{staff.firstName} {staff.lastName} - {staff.jobRole}</li>
                  )}
                </ul>
                <h1>Select Shift Type: {data.shiftType}</h1>
                <input type="radio" value="Afternoon Shift" onClick={handleShiftType}/>
                <label>Afternoon Shift</label>
                {' '}
                <input type="radio" value="Evening Shift" onClick={handleShiftType}/>
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
