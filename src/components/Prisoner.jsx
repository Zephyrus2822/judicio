import './prisoner.css'; 

const Prisoner = () => {
    

  return (
    <div className='container'>
      <div className='title'>Registration</div>
      <div className='content'>
        <form>
          <div className='user-details'>
            <div className='input-box'>
              <span className='details'>Full Name</span>
              <input type="text" placeholder='Enter your name' required />
            </div>
            <div className='input-box'>
              <span className='details'>Residential Address</span>
              <input type="email" placeholder='Enter Email Address' required />
            </div>
            <div className='input-box'>
              <span className='details'>Permanent Address (if exists)</span>
              <input type="email" placeholder='Enter Email Address' required />
            </div>
            <div className='input-box'>
              <span className='details'>Aadhar Number</span>
              <input type="text" placeholder='Enter Aadhar number' required />
            </div>
            <div className='input-box'>
              <span className='details'>Password</span>
              <input type="password" placeholder='Enter password' required />
            </div>
            <div className='input-box'>
              <span className='details'>FIR Lodge Date</span>
              <input type="date" placeholder='Enter password' required />
            </div>
            <div className='input-box'>
              <span className='details'>Date of Trial</span>
              <input type="date" placeholder='Enter password' required />
            </div>
            
            <div  className='conviction'>
            <label htmlFor="crime" style={{ fontSize: "16px;", fontWeight: "500;"}}>Convicted For:</label>
            <select id="crime">
                <option value="#" disabled>Select Criminal Offense</option>
                <option value="1">Cyber Crimes</option>
                <option value="2">Crimes against SCs and STs</option>
                <option value="3">Crimes against Women</option>
                <option value="4">Crimes against Children</option>
                <option value="5">Offenses against the State</option>
                <option value="6">Economic Offenses</option>
                <option value="7">Crimes against Foreigners</option>
                <option value="8">Others</option>
            </select>
            </div>
            <div className='gender-details'>
              <input type="radio" name='gender' id='dot-1' />
              <input type="radio" name='gender' id='dot-2' />
              <input type="radio" name='gender' id='dot-3' />
              <span className='gender-title'>Gender</span>
              <div className='category'>
                <label htmlFor="dot-1">
                  <span className='dot one'></span>
                  <span className='gender'>Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className='dot two'></span>
                  <span className='gender'>Female</span>
                </label>
                <label htmlFor="dot-3">
                  <span className='dot three'></span>
                  <span className='gender'>Other</span>
                </label>
              </div>
            </div>
            <div className='button'>
              <input type="submit" value="Register" /> 
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Prisoner;
