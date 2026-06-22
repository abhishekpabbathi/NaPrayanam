import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function CreateTrip() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destination: "",
    days: "",
    budgetType: "Medium",
    interests: [],
  });

  const [loading, setLoading] = useState(false);

  const interests = ["Food", "Adventure", "Culture", "Nature", "Shopping", "Photography"];

  const toggleInterest = (item) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.destination || !form.days) {
      alert("Please enter destination and days");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/trips", {
        destination: form.destination,
        days: Number(form.days),
        budgetType: form.budgetType,
        interests: form.interests,
      });

      alert("Trip created successfully");
      navigate(`/trip/${res.data.trip._id}`);
    } catch (err) {
      alert(err?.response?.data?.message || "Trip creation failed");
    }

    setLoading(false);
  };

  return (
    <div style={page}>
      <form style={card} onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: "5px" }}>Create AI Trip</h1>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>
          Generate itinerary, budget, hotels and packing list.
        </p>

        <div style={grid}>
          <div>
            <label>Destination</label>
            <input
              style={input}
              placeholder="Tokyo"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
            />
          </div>

          <div>
            <label>Days</label>
            <input
              style={input}
              type="number"
              placeholder="5"
              value={form.days}
              onChange={(e) => setForm({ ...form, days: e.target.value })}
            />
          </div>
        </div>

        <label>Budget</label>
        <div style={row}>
          {["Low", "Medium", "High"].map((b) => (
            <button
              type="button"
              key={b}
              onClick={() => setForm({ ...form, budgetType: b })}
              style={form.budgetType === b ? activeChip : chip}
            >
              {b}
            </button>
          ))}
        </div>

        <label>Interests</label>
        <div style={row}>
          {interests.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => toggleInterest(item)}
              style={form.interests.includes(item) ? activeChip : chip}
            >
              {item}
            </button>
          ))}
        </div>

        <button style={submitBtn} disabled={loading}>
          {loading ? "Generating..." : "Generate AI Trip"}
        </button>
      </form>
    </div>
  );
}

const page = {
  background: "#f8fafc",
  minHeight: "90vh",
  padding: "25px",
};

const card = {
  maxWidth: "760px",
  margin: "0 auto",
  background: "white",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "15px",
};

const input = {
  width: "100%",
  padding: "11px",
  marginTop: "6px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
};

const row = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  margin: "10px 0 18px",
};

const chip = {
  padding: "9px 14px",
  border: "none",
  borderRadius: "20px",
  background: "#e2e8f0",
  cursor: "pointer",
};

const activeChip = {
  ...chip,
  background: "#2563eb",
  color: "white",
};

const submitBtn = {
  width: "100%",
  padding: "13px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
};
