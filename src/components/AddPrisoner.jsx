import React from 'react'
import './addprisoner.css'

const AddPrisoner = () => {
  return (
    <div className='body-container'>

      <div className='container'>
        <form >
          <p>Welcome</p>
          <input type="text" name="name" id="name" placeholder='Rudranil Chowdhury' /><br />
          <input type="text" name="fathername" id="f-name" placeholder='Jagdish Chandra' /><br />
          <input type="text" name="aadharnum" id="aadhar" placeholder='#### #### ####'/><br />
          <input type="date" name="firdate" id="fir" placeholder='MM/DD/YYYY'/>
          <input type="date" name="trialdate" id="trial" placeholder='MM/DD/YYYY' /><br />
          <input type="text" name="testimonial" id="testimonal" placeholder='I witnessed this person doing....'/><br />
          <input list='location' name="location" placeholder='Location Status'/><br />

          <datalist id='location'>
            <option value="In India"></option>
            <option value="Outside India"></option>
            <option value="Unknown"></option>       {/*  in this case there will be instant bail cancellation */}
           <option value="Being Tracked"></option>  {/*  in this case there will be instant bail cancellation */}
          </datalist>
        </form>
        <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
    <div className="drop drop-3"></div>
    <div className="drop drop-4"></div>
    <div className="drop drop-5"></div>
  </div>
      </div>
    </div>
  );
};

export default AddPrisoner