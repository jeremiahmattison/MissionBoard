import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="page">
      <h1>MissionBoard</h1>
      <p>This is the landing page.</p>

      <Link to="/app">
        <button>Enter Dashboard</button>
      </Link>
    </div>
  );
}

export default Landing;
