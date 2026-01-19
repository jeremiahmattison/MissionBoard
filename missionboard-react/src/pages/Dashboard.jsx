function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#eee", padding: "20px" }}>
        <h3>MissionBoard</h3>
        <p>Dashboard</p>
        <p>Tasks</p>
        <p>Notes</p>
        <p>People</p>
        <p>Opportunities</p>
        <p>Calendar</p>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "40px" }}>
        <h1>Dashboard</h1>
        <p>This is the main app area.</p>
      </div>
    </div>
  );
}

export default Dashboard;
