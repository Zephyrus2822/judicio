import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="header">
        <nav>
          <div className="Logo-wrapper"><img className="Logo" src="./images/judicio-logo.png" alt="logo" /></div>
          <ul>
            <li>
              <a className="proj-name" href="/">Home</a>           
              </li>
            <li><a href="/prisoner">Get Verdict</a></li>
            <li>
              {/* <Link href="/tablee">#</Link> */}
              Verdicts Passed
              </li>
              <li>
                If Needed 1
              </li>
              <li>
                If Needed 2
              </li>
           
            
          </ul>
          <div><a className="chat" href="/login">Login</a>
          </div>
          
        </nav>
    </div>
  )
}

export default Navigation;