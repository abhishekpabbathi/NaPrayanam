import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await api.get("/trips");
      setTrips(res.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to fetch trips");
    }
    setLoading(false);
  };

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;

    try {
      await api.delete(`/trips/${id}`);
      setTrips(trips.filter((trip) => trip._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) return <h2 style={{ padding: "30px" }}>Loading trips...</h2>;

  return (
    <div style={page}>
      <div style={header}>
        <h1>My Trips ✈️</h1>
        <Link to="/create-trip">
          <button style={primaryBtn}>+ Create Trip</button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <div style={emptyBox}>
          <h2>No trips yet</h2>
          <p>Create your first AI travel plan.</p>
          <Link to="/create-trip">
            <button style={primaryBtn}>Create Trip</button>
          </Link>
        </div>
      ) : (
        <div style={grid}>
          {trips.map((trip) => (
            <div key={trip._id} style={card}>
              <h2>{trip.destination}</h2>
              <p>📅 {trip.days} Days</p>
              <p>💰 {trip.budgetType} Budget</p>
              <p>🎯 {trip.interests?.join(", ") || "General Travel"}</p>

              <div style={btnRow}>
                <Link to={`/trip/${trip._id}`}>
                  <button style={viewBtn}>View</button>
                </Link>
                <button style={deleteBtn} onClick={() => deleteTrip(trip._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const page = {
  background: "#f8fafc",
  minHeight: "100vh",
  padding: "25px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "20px",
};

const card = {
  background: "white",
  padding: "22px",
  borderRadius: "16px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const btnRow = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
};

const primaryBtn = {
  padding: "11px 18px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const viewBtn = {
  ...primaryBtn,
};

const deleteBtn = {
  ...primaryBtn,
  background: "#dc2626",
};

const emptyBox = {
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  textAlign: "center",
};
