export default function Dashboard() {
  const stats = [
    { title: "Trips", value: "12", icon: "✈️" },
    { title: "Countries", value: "8", icon: "🌍" },
    { title: "Upcoming", value: "4", icon: "📅" },
    { title: "Budget", value: "₹25K", icon: "💰" },
  ];

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "25px",
      }}
    >
      <h1>Welcome Back 👋</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        {stats.map((item) => (
          <div
            key={item.title}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "32px" }}>{item.icon}</div>
            <h3>{item.title}</h3>
            <h1>{item.value}</h1>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "15px",
        }}
      >
        <a href="/create-trip">
          <button style={btn}>+ Create Trip</button>
        </a>

        <a href="/my-trips">
          <button style={btn}>📋 My Trips</button>
        </a>
      </div>
    </div>
  );
}

const btn = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};
