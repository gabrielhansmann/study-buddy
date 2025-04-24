import "./App.css";
import CalendarComponent from "./CalendarComponent";

function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <aside
        style={{
          width: "220px",
          backgroundColor: "#f9fafb",
          padding: "1.5rem",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        <div style={{ marginBottom: "2rem", fontWeight: 600 }}>👤 Student</div>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "1rem" }}>
              <a href="#" style={{ textDecoration: "none", color: "#111827" }}>
                📊 Dashboard
              </a>
            </li>
            <li
              style={{
                marginBottom: "1rem",
                backgroundColor: "#111827",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
              }}
            >
              📅 Schedule
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <a href="#" style={{ textDecoration: "none", color: "#111827" }}>
                ✅ To Do
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: "none", color: "#111827" }}>
                ⚙️ Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, backgroundColor: "#ffffff", padding: "2rem" }}>
        <header
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
          }}
        >
          Schedule
        </header>
        <CalendarComponent />
      </main>
    </div>
  );
}

export default Dashboard;
