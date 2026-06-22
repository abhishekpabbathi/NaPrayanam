import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#0f172a",
        color: "white",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        ✈️ NaPrayanam
      </Link>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link to="/" style={linkStyle}>Home</Link>

        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>

        <Link to="/create-trip" style={linkStyle}>
          Create Trip
        </Link>

        <Link to="/my-trips" style={linkStyle}>
          My Trips
        </Link>

        <Link to="/login" style={linkStyle}>
          Login
        </Link>

        <Link to="/register" style={registerBtn}>
          Register
        </Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
};

const registerBtn = {
  color: "#0f172a",
  background: "white",
  padding: "8px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
};
