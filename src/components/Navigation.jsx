import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="header">
        <nav>
          <div className="Logo-wrapper"><img className="Logo" src="./images/judicio-logo.png" alt="logo" /></div>
          <ul>
            <li className="proj-name" onClick={() => navigate('/Home')}>
              Judicio
              </li>
            <li href="#">Get Verdict</li>
            <li href="#">Verdicts Passed</li>
            <li href="#">About Us</li>
            <li href="#">Contact Us</li>
          </ul>
          <div><a className="chat" href="/Login">Login</a>
          </div>
          
        </nav>
    </div>
  )
}

export default Navigation;