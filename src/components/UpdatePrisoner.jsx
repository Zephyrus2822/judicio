import React from 'react'
import './updateprisoner.css'

const UpdatePrisoner = () => {
  return (
    <div className='body-container'>

      <div className='container-ap'>
        <form className='form-addprisoner'>
          <h1 className='wel-message'>UPDATE PRISONER DETAILS:</h1>

          <label id='name'>Name of Miscreant</label>
          <input type="text" name="name" id="name" placeholder='Rudranil Chowdhury' /><br />
         
          <label id='fathername'>S/O</label>
          <input type="text" name="fathername" id="f-name" placeholder='Jagdish Chandra' /><br />

          <label id='aadhar'>Aadhaar Number</label>
          <input type="text" name="aadharnum" id="aadhar" placeholder='#### #### ####'/>
          <button className='w-15 ml-0.75 text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
            Fetch</button>
            <br />
          

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

          
          <label id='crime1'>Crime</label>
          <input list='crime1' name="crime1" placeholder='Crime Status'/><br />

          <datalist id="crime1">
                <option value="Cyber Crime"></option>
                <option value="Crime against SCs and STs"></option>
                <option value="Crime against Women"></option>
                <option value="Crime against Children"></option>
                <option value="Offenses against the state"></option>
                <option value="Economic Offenses"></option>
                <option value="Crime against Foreigners"></option>
                <option value="Others"></option>
              </datalist>

        </form>
        

      </div>
    </div>
  );
};

export default UpdatePrisoner