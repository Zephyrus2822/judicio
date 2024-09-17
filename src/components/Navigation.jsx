import { Link } from "react-router-dom";

const Navigation = () => {
  const username = window.localStorage.getItem("UserNamejudicio");
  const LoggedIn = window.localStorage.getItem("isLoggedInjudicio");

  const usertype = window.localStorage.getItem("usertype");
  // const user=window.localStorage.getItem("usertype");

  const signout = () => {
    window.localStorage.removeItem("UserNamejudicio");
    window.localStorage.removeItem("isLoggedInjudicio");
    window.localStorage.removeItem("usertype");
    window.location.reload();
  };

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
          {!LoggedIn && (
            <>
            <li>
              <a href="/About">Docs</a>
            </li>
              <li>
                <a href="/prisoner">Get Verdict</a>
              </li>
            </>
            
          )}

          {LoggedIn && usertype === "Admin" && (
            <>
              <li>
                <a href="/verdictspassed">Verdicts Passed</a>
              </li>
              <li>
                <a href="/addprisoner">Add Prisoner</a>
              </li>
              <li>
                <a href="/updateprisoner">Update Prisoner</a>
              </li>
              <li>
                <a href="/eligiblecriminals">Eligibility</a>
              </li>
            </>
          )}
          {LoggedIn && usertype == "Judiciary" && (
            <>
            
              <li>
                <a href="/prisoner">Get Verdict</a>
              </li>

              <li>
                <a href="/aboutbail">Information</a>
              </li>
            </>
          )}
        </ul>
        {username && LoggedIn ? (
          <div className="flex justify-center items-center gap-2 ">
            <a onClick={signout} className="chat">
              Logout
            </a>
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
