import React from 'react'
import './addprisoner.css'

const AddPrisoner = () => {
  return (
    <div className='body-container'>

      <div className='container-ap'>
        <form className='form-addprisoner'>
          <h1 className='wel-message'>ENTER PRISONER DETAILS:</h1>

          <label id='name'>Name of Miscreant</label>
          <input type="text" name="name" id="name" placeholder='Rudranil Chowdhury' /><br />
         
          <label id='fathername'>S/O</label>
          <input type="text" name="fathername" id="f-name" placeholder='Jagdish Chandra' /><br />

          <label id='aadhar'>Aadhaar Number</label>
          <input type="text" name="aadharnum" id="aadhar" placeholder='#### #### ####'/><br />

          <label id='fir'>FIR Lodge</label>
          <input type="date" name="firdate" id="fir" placeholder='MM/DD/YYYY'/>

          <label id='trial'>Trial</label>
          <input type="date" name="trialdate" id="trial" placeholder='MM/DD/YYYY' /><br />

          <label id='testimonial'>Testimonial</label>
          <input type="text" name="testimonial" id="testimonal" placeholder='I witnessed this person doing....'/><br />

          <label id='location'>Status</label>
          <input list='location' name="location" placeholder='Location Status'/><br />

          <datalist id='location'>
            <option value="In India"></option>
            <option value="Outside India"></option>
            <option value="Unknown"></option>       {/*  in this case there will be instant bail cancellation */}
           <option value="Being Tracked"></option>  {/*  in this case there will be instant bail cancellation */}
          </datalist>
        </form>
        {/* <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
    <div className="drop drop-3"></div>
    <div className="drop drop-4"></div>
    <div className="drop drop-5"></div>
  </div> */}
      </div>
    </div>
  );
};

export default AddPrisoner