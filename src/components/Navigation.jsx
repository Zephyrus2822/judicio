import { Link } from "react-router-dom";

const Navigation = () => {
  const username = window.localStorage.getItem("UserNamejudicio");
  const LoggedIn = window.localStorage.getItem("isLoggedInjudicio");

  const signout=()=>{
    window.localStorage.removeItem("UserNamejudicio");
    window.localStorage.removeItem("isLoggedInjudicio");
    window.location.reload();
  }

  return (
    <div className="header">
      <nav>
        <div className="Logo-wrapper">
          <img className="Logo" src="./images/judicio-logo.png" alt="logo" />
        </div>
        <ul>
          <li>
            <a className="proj-name" href="/">
              Home
            </a>
          </li>
          <li>
            <a href="/prisoner">Get Verdict</a>
          </li>
          <li>
            <a href="/verdictspassed">Verdicts Passed</a>
          </li>
          <li>
            <a href="/baildetails">Bail Details</a>
          </li>
        </ul>
        {username && LoggedIn ? (
          <div className="flex justify-center items-center gap-2 ">
            <h1 className="text-3xl">Hello! {username}</h1>
            <a onClick={signout} className="chat">Logout</a>
          </div>
        ) : (
          <div>
            <a className="chat" href="/login">
              Login
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
