import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component{
  render(){
    return(
      <div className="container">
        <div>
          <Link to="/login" className="button">Login</Link>
        </div>
        <div className="columns is-multiline is-mobile">
          <div className="column is-full-desktop is-full-mobile is-full-tablet">
            <h1>Welcome to Shwap</h1>
            <p>Lorem ipsum dolor sit amet, mea enim ridens ex, eos vero dictas verterem no, timeam iuvaret labores ne vix. Ei solet scripta his, alia voluptatum pri no. Quot inermis dolorem eu eum. Eu mel aperiam denique maiestatis. Quod noster gloriatur no eos, eam tamquam legimus ut. Mundi inciderint vix ei, feugait eligendi ad per. Nec dolores probatus ne. Quod purto iracundia ex mei, viderer fabellas cu mea, idque exerci postea et eam. Ei nec quem dicam cotidieque, vero dolor noster at mel. Natum facer cetero at usu, usu stet option aperiri ea. Ei albucius mentitum neglegentur vis, per diam quot et, cu eam melius detracto.</p>
          </div>
          <div className="column is-half-desktop is-full-mobile is-full-tablet">
            <h1>Great For Employers</h1>
            <p>Lorem ipsum dolor sit amet, mea enim ridens ex, eos vero dictas verterem no, timeam iuvaret labores ne vix. Ei solet scripta his, alia voluptatum pri no. Quot inermis dolorem eu eum. Eu mel aperiam denique maiestatis. Quod noster gloriatur no eos, eam tamquam legimus ut. Mundi inciderint vix ei, feugait eligendi ad per. Nec dolores probatus ne. Quod purto iracundia ex mei, viderer fabellas cu mea, idque exerci postea et eam. Ei nec quem dicam cotidieque, vero dolor noster at mel. Natum facer cetero at usu, usu stet option aperiri ea. Ei albucius mentitum neglegentur vis, per diam quot et, cu eam melius detracto.</p>
          </div>
          <div className="column is-half-desktop is-full-mobile is-full-tablet">
            <h1>Great For Employees</h1>
            <p>Lorem ipsum dolor sit amet, mea enim ridens ex, eos vero dictas verterem no, timeam iuvaret labores ne vix. Ei solet scripta his, alia voluptatum pri no. Quot inermis dolorem eu eum. Eu mel aperiam denique maiestatis. Quod noster gloriatur no eos, eam tamquam legimus ut. Mundi inciderint vix ei, feugait eligendi ad per. Nec dolores probatus ne. Quod purto iracundia ex mei, viderer fabellas cu mea, idque exerci postea et eam. Ei nec quem dicam cotidieque, vero dolor noster at mel. Natum facer cetero at usu, usu stet option aperiri ea. Ei albucius mentitum neglegentur vis, per diam quot et, cu eam melius detracto.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
