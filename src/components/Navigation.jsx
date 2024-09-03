
const Navigation = () => {
  return (
    <div className="header">
        <nav>
          <div className="Logo-wrapper"><img className="Logo" src="./images/judicio-logo.png" alt="logo" /></div>
          <ul>
            <li className="proj-name">Judicio</li>
            <li href="#">Get Verdict</li>
            <li href="#">Verdicts Passed</li>
            <li href="#">About Us</li>
            <li href="#">Contact Us</li>
          </ul>
          <a className="chat" href="/Login">Login</a>
        </nav>
    </div>
  )
}

export default Navigation;