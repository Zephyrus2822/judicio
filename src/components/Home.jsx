import React from 'react';
import video from '../assets/video2.mp4'

const Home = () => {
  return (


    <div>
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4" />
        </video>
        <div className="heading">
          Welcome to Judicio!
        </div>
        <div className="text-1">
          Justice delayed is Justice denied!
        </div>
        <div className='text-2'>
          With that thought in mind, we have come up with
        </div>
        <div className='text-2'>
          a Bail reckoning system called Judicio.
        </div>
        <div className='button-holder flex items-center w-[600px]'>
        <button class="animated-button">
          <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
          <span class="text"> <a href="/prisoner">Try Judicio</a></span>
          <span class="circle"></span>
          <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
        </button>
        <button class="animated-button">
          <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
          <span class="text"> <a href="/map">Help Desk</a></span>
          <span class="circle"></span>
          <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
        </button>
        </div>
      </div>


    </div>
  );
};

export default Home;
