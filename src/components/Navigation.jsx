import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = window.localStorage.getItem("JudicioAccessToken");

  const signout = async () => {
    try {
      window.localStorage.removeItem("JudicioAccessToken");
      window.location.reload();
    } catch (error) {
      console.error("Error Logout ", error.message);
    }
  };

  return (
    <div className="header">
      <nav className="flex justify-between items-center p-4 bg-white shadow-md relative">
        <div className="Logo-wrapper">
          <h1 className="Logo">Judicio</h1>
        </div>
        <ul className="flex gap-6">
          <li><a href="/" className="text-black font-semibold">Home</a></li>
          <li><a href="/about" className="text-black font-semibold">About Us</a></li>
        </ul>
        
        {token ? (
          <div className="flex items-center gap-4">
            <h1 className="text-black text-lg font-semibold">Hi, {jwtDecode(token).name}</h1>
            <button onClick={signout} className="px-4 py-2 bg-red-500 text-white rounded-md">Logout</button>
          </div>
        ) : (
          <a className="px-4 py-2 bg-blue-500 text-white rounded-md" href="/login">Login</a>
        )}

        {/* Hamburger Icon */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="block ml-4 text-black text-3xl">
          &#9776;
        </button>
      </nav>

      {/* Hamburger Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-64 bg-white/30 backdrop-blur-lg p-4 rounded-lg shadow-lg z-50">
          <ul className="flex flex-col gap-4 text-lg font-bold text-black">
            <li><a href="/prisoner">Get Verdict</a></li>
            <li><a href="/AdminDashboard">Admin Dashboard</a></li>
            <li><a href="/verdictspassed">Verdicts Passed</a></li>
            <li><a href="/addprisoner">Add Prisoner</a></li>
            <li><a href="/eligiblecriminals">Eligibility</a></li>
            <li><a href="/aboutbail">Information</a></li>
            <li><a href="/dashboard">User Dashboard</a></li>
            <li><a href="/judgedashboard">Judge's Dashboard</a></li>
            <li><a href="/map">Nearby Locations</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navigation;
