import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const downloadPDF = async () => {
    const input = document.getElementById("trip-pdf");

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `${trip.destination}-Travel-Plan.pdf`
    );
  };

  if (loading)
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Loading Trip...
      </div>
    );

  if (!trip)
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Trip Not Found
      </div>
    );

  return (
    <div style={page}>
      <button
        onClick={downloadPDF}
        style={downloadBtn}
      >
        📄 Download PDF
      </button>

      <div id="trip-pdf" style={card}>
        <h1>{trip.destination} ✈️</h1>

        <p>📅 {trip.days} Days</p>
        <p>💰 {trip.budgetType} Budget</p>
        <p>🎯 {trip.interests?.join(", ")}</p>

        <hr />

        <h2>Budget Breakdown</h2>

        <div style={budgetGrid}>
          <BudgetCard
            title="Transport"
            value={trip.estimatedBudget?.transport}
          />
          <BudgetCard
            title="Accommodation"
            value={trip.estimatedBudget?.accommodation}
          />
          <BudgetCard
            title="Food"
            value={trip.estimatedBudget?.food}
          />
          <BudgetCard
            title="Activities"
            value={trip.estimatedBudget?.activities}
          />
          <BudgetCard
            title="Total"
            value={trip.estimatedBudget?.total}
          />
        </div>

        <h2>Hotels</h2>

        <div style={grid}>
          {trip.hotels?.map((hotel, index) => (
            <div key={index} style={smallCard}>
              <h3>{hotel.name}</h3>
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
              ✅ {item.item}
            </div>
          ))}
        </div>

        <h2>Day Wise Plan</h2>

        {trip.itinerary?.map((day) => (
          <div
            key={day.dayNumber}
            style={dayCard}
          >
            <h3>Day {day.dayNumber}</h3>

            {day.activities?.map(
              (activity, index) => (
                <div
                  key={index}
                  style={activityCard}
                >
                  <h4>
                    {activity.timeOfDay} -
                    {" "}
                    {activity.title}
                  </h4>

                  <p>
                    {activity.description}
                  </p>

                  <p>
                    Cost :
                    ₹{activity.estimatedCost}
                  </p>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetCard({
  title,
  value,
}) {
  return (
    <div style={budgetCard}>
      <h4>{title}</h4>
      <h2>₹{value || 0}</h2>
    </div>
  );
}

const page = {
  padding: "30px",
  background: "#f8fafc",
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "20px",
};

const downloadBtn = {
  padding: "14px 22px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  marginBottom: "20px",
  cursor: "pointer",
  fontSize: "16px",
};

const budgetGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(180px,1fr))",
  gap: "15px",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "15px",
};

const budgetCard = {
  background: "#eff6ff",
  padding: "15px",
  borderRadius: "12px",
};

const smallCard = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "12px",
};

const packingItem = {
  background: "#f1f5f9",
  padding: "12px",
  borderRadius: "10px",
};

const dayCard = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "15px",
};

const activityCard = {
  background: "#f8fafc",
  padding: "12px",
  borderRadius: "10px",
  marginTop: "10px",
};
