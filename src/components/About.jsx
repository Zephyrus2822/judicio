import React from 'react'
import video from '../assets/video03.mp4'
const About = () => {
  return (
    <div>

      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4" />
        </video>
        <div className='about-container'>
          <div className='about-info'>
            <div className='info-1'>
              <h1>Introduction</h1>
              <p>This documentaion provides information on how to integrate your application wih our API</p>
            </div>
            <div className='info-1'>
              <h1>Authentication</h1>
              <p>To access our API , you will need an API key . Please contact our support team for more information</p>
            </div>
            <div className='info-1'>
              <h1>Endpoints</h1>
              <p>Get/Crimes: crime details </p>
              <p>get/crime/:crime : retrives data about crime the crime mentioned  </p>
            </div>
            <div className='info-1'>
              <h1>Request Format</h1>
              <p>   All API requests should be made using the HTTP GET or POST methods. The
                request body should be in JSON format.
              </p>
            </div>
            <div className='info-1'>
              <h1>Response Format</h1>
              <p>    API responses will be in JSON format. The response body will contain a
                status code and a message indicating the success or failure of the
                request.

              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About