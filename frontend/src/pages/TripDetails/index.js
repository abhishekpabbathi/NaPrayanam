import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import api from "../../api/api";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setTrip(res.data);
      } catch (err) {
        alert(err?.response?.data?.message || "Failed to fetch trip");
      }
      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  const downloadPDF = () => {
    if (!trip) return;

    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(20);
    doc.text(`${trip.destination} Trip Plan`, 10, y);

    y += 15;
    doc.setFontSize(12);
    doc.text(`Days: ${trip.days}`, 10, y);
    y += 8;
    doc.text(`Budget Type: ${trip.budgetType}`, 10, y);
    y += 8;
    doc.text(`Interests: ${trip.interests?.join(", ") || "General Travel"}`, 10, y);

    y += 15;
    doc.setFontSize(16);
    doc.text("Budget Breakdown", 10, y);

    y += 10;
    doc.setFontSize(12);
    doc.text(`Transport: Rs.${trip.estimatedBudget?.transport || 0}`, 10, y);
    y += 8;
    doc.text(`Accommodation: Rs.${trip.estimatedBudget?.accommodation || 0}`, 10, y);
    y += 8;
    doc.text(`Food: Rs.${trip.estimatedBudget?.food || 0}`, 10, y);
    y += 8;
    doc.text(`Activities: Rs.${trip.estimatedBudget?.activities || 0}`, 10, y);
    y += 8;
    doc.text(`Total: Rs.${trip.estimatedBudget?.total || 0}`, 10, y);

    y += 15;
    doc.setFontSize(16);
    doc.text("Hotel Suggestions", 10, y);

    y += 10;
    doc.setFontSize(12);
    trip.hotels?.forEach((hotel, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.text(
        `${index + 1}. ${hotel.name} - ${hotel.tier} - Rs.${hotel.pricePerNight} - ${hotel.rating}`,
        10,
        y
      );
      y += 8;
    });

    y += 10;
    doc.setFontSize(16);
    doc.text("Packing List", 10, y);

    y += 10;
    doc.setFontSize(12);
    trip.packingList?.forEach((item, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.text(`${index + 1}. ${item.item} (${item.category})`, 10, y);
      y += 8;
    });

    y += 10;
    doc.setFontSize(16);
    doc.text("Day-wise Itinerary", 10, y);

    y += 10;
    doc.setFontSize(12);

    trip.itinerary?.forEach((day) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text(`Day ${day.dayNumber}`, 10, y);
      y += 8;

      doc.setFontSize(11);
      day.activities?.forEach((activity) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        doc.text(`${activity.timeOfDay} - ${activity.title}`, 15, y);
        y += 7;

        const descriptionLines = doc.splitTextToSize(
          activity.description || "",
          180
        );

        doc.text(descriptionLines, 20, y);
        y += descriptionLines.length * 6;

        doc.text(`Estimated Cost: Rs.${activity.estimatedCost || 0}`, 20, y);
        y += 10;
      });

      y += 5;
    });

    doc.save(`${trip.destination}-trip-plan.pdf`);
  };

  if (loading) return <h2 style={{ padding: "30px" }}>Loading trip...</h2>;
  if (!trip) return <h2 style={{ padding: "30px" }}>Trip not found</h2>;

  return (
    <div style={page}>
      <div style={card}>
        <div style={header}>
          <div>
            <h1>{trip.destination} Trip ✈️</h1>
            <p>📅 {trip.days} Days</p>
            <p>💰 {trip.budgetType} Budget</p>
            <p>🎯 {trip.interests?.join(", ")}</p>
          </div>

          <button onClick={downloadPDF} style={downloadBtn}>
            📄 Download PDF
          </button>
        </div>

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

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  flexWrap: "wrap",
};

const downloadBtn = {
  padding: "12px 18px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
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
