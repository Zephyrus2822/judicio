
// hero section
const Hero = () => {
  return (
    <div className="web-body">
      <div className="hero-text">
        <h1>Welcome to Judicio!</h1>
        <p style={{marginLeft: "30px", fontSize: "30px", fontFamily: "Poppins"}}>Justice delayed is Justice denied. <br />With that thought in mind, we have come up with a Bail reckoning system called Judicio. <br />
          Congregating technology with robust law abiding by the Constitution of India,<br /> our application ensures swift justice to undertrial individuals- <br />be it grueling jailtime or fleeting mercy by Bail.
        </p>
      </div>
      <div className="hero-pic">
        <img src="./images/judge-removebg-preview.png" alt="judge" />
      </div>
      <div className="hero-button">
        <button><a href="#">Try Judicio Now!</a></button>
      </div>
    </div>
  )
}

export default Hero;