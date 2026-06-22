import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrip = async () => {
    try {
      const res = await api.get(`/trips/${id}`);
      setTrip(res.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to fetch trip");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrip();
  }, [id]);

  if (loading) return <h2 style={{ padding: "30px" }}>Loading trip...</h2>;
  if (!trip) return <h2 style={{ padding: "30px" }}>Trip not found</h2>;

  return (
    <div style={page}>
      <div style={card}>
        <h1>{trip.destination} Trip ✈️</h1>
        <p>📅 {trip.days} Days</p>
        <p>💰 {trip.budgetType} Budget</p>
        <p>🎯 {trip.interests?.join(", ")}</p>

        <hr />

        <h2>Budget Breakdown</h2>
        <div style={budgetGrid}>
          <BudgetCard title="Transport" value={trip.estimatedBudget?.transport} />
          <BudgetCard title="Accommodation" value={trip.estimatedBudget?.accommodation} />
          <BudgetCard title="Food" value={trip.estimatedBudget?.food} />
          <BudgetCard title="Activities" value={trip.estimatedBudget?.activities} />
          <BudgetCard title="Total" value={trip.estimatedBudget?.total} />
        </div>

        <h2>Hotel Suggestions</h2>
        <div style={grid}>
          {trip.hotels?.map((hotel, index) => (
            <div key={index} style={smallCard}>
              <h3>🏨 {hotel.name}</h3>
              <p>{hotel.tier}</p>
              <p>₹{hotel.pricePerNight}</p>
              <p>{hotel.rating}</p>
            </div>
          ))}
        </div>

        <h2>Packing List</h2>
        <div style={grid}>
          {trip.packingList?.map((item, index) => (
            <div key={index} style={packingItem}>
              ✅ {item.item} <small>({item.category})</small>
            </div>
          ))}
        </div>

        <h2>Day-wise Itinerary</h2>
        {trip.itinerary?.map((day) => (
          <div key={day.dayNumber} style={dayCard}>
            <h3>Day {day.dayNumber}</h3>
            {day.activities?.map((activity, index) => (
              <div key={index} style={activityCard}>
                <h4>{activity.timeOfDay} - {activity.title}</h4>
                <p>{activity.description}</p>
                <p>Estimated Cost: ₹{activity.estimatedCost}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetCard({ title, value }) {
  return (
    <div style={budgetCard}>
      <h4>{title}</h4>
      <h2>₹{value || 0}</h2>
    </div>
  );
}

const page = {
  background: "#f8fafc",
  minHeight: "100vh",
  padding: "25px",
};

const card = {
  background: "white",
  borderRadius: "20px",
  padding: "25px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
};

const budgetGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
  gap: "15px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "15px",
};

const budgetCard = {
  background: "#eff6ff",
  padding: "15px",
  borderRadius: "12px",
};

const smallCard = {
  border: "1px solid #e2e8f0",
  padding: "15px",
  borderRadius: "12px",
};

const packingItem = {
  background: "#f1f5f9",
  padding: "12px",
  borderRadius: "10px",
};

const dayCard = {
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "15px",
  marginBottom: "15px",
};

const activityCard = {
  background: "#f8fafc",
  padding: "12px",
  borderRadius: "10px",
  marginTop: "10px",
};
