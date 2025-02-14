import React from 'react';

/**
 * About component - Renders the About page with a video background and API information.
 * @returns {JSX.Element} The About component.
 */
const About = () => {
  return (
    <div className='bg-gradient-to-br from-amber-200 to-orange-600 min-h-screen py-10 '>

        {/* Container for the about information */}
        <div className='about-container'>
          <div className='about-info'>
            {/* Introduction Section */}
            <div className='info-1'>
              <h1>Introduction</h1>
              <p>This documentation provides information on how to integrate your application with our API.</p>
            </div>

            {/* Authentication Section */}
            <div className='info-1'>
              <h1>Authentication</h1>
              <p>To access our API, you will need an API key. Please contact our support team for more information.</p>
            </div>

            {/* Endpoints Section */}
            <div className='info-1'>
              <h1>Endpoints</h1>
              <p>Get/Crimes: crime details</p>
              <p>get/crime/:crime: retrieves data about the mentioned crime</p>
            </div>

            {/* Request Format Section */}
            <div className='info-1'>
              <h1>Request Format</h1>
              <p>All API requests should be made using the HTTP GET or POST methods. The request body should be in JSON format.</p>
            </div>

            {/* Response Format Section */}
            <div className='info-1'>
              <h1>Response Format</h1>
              <p>API responses will be in JSON format. The response body will contain a status code and a message indicating the success or failure of the request.</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default About;
