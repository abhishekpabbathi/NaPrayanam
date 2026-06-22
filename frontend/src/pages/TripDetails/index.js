import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setTrip(res.data);

        const saved = localStorage.getItem(`checklist-${id}`);
        if (saved) {
          setCompleted(JSON.parse(saved));
        }
      } catch (err) {
        alert(err?.response?.data?.message || "Failed to fetch trip");
      }
      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`checklist-${id}`, JSON.stringify(completed));
  }, [completed, id]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-day]");
      let current = 1;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 260) {
          current = Number(section.getAttribute("data-day"));
        }
      });

      setActiveDay(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [trip]);

  const scrollToDay = (dayNumber) => {
    setActiveDay(dayNumber);
    const element = document.getElementById(`day-${dayNumber}`);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
  };

  const toggleActivity = (dayNumber, index) => {
    const key = `${dayNumber}-${index}`;
    setCompleted((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const totalActivities =
    trip?.itinerary?.reduce(
      (sum, day) => sum + (day.activities?.length || 0),
      0
    ) || 0;

  const completedActivities =
    Object.values(completed).filter(Boolean).length || 0;

  const activityProgress =
    totalActivities === 0
      ? 0
      : Math.round((completedActivities / totalActivities) * 100);

  const downloadPDF = async () => {
    const input = document.getElementById("trip-pdf");

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${trip.destination}-Travel-Plan.pdf`);
  };

  if (loading) {
    return (
      <div style={loadingBox}>
        <div style={spinner}></div>
        <h2>Loading premium trip plan...</h2>
      </div>
    );
  }

  if (!trip) {
    return <div style={loadingBox}>Trip Not Found</div>;
  }

  const totalDays = trip.itinerary?.length || 1;
  const progressWidth =
    totalDays <= 1
      ? "100%"
      : `${((activeDay - 1) / (totalDays - 1)) * 100}%`;

  return (
    <div style={page}>
      <div style={topBar}>
        <div>
          <p style={eyebrow}>SMART JOURNEY PLAN</p>
          <h1 style={title}>
            {trip.destination} <span>✈️</span>
          </h1>

          <div style={metaRow}>
            <span>📅 {trip.days} Days</span>
            <span>💰 {trip.budgetType} Budget</span>
            <span>🎯 {trip.interests?.join(", ") || "General Travel"}</span>
          </div>
        </div>

        <button onClick={downloadPDF} style={downloadBtn}>
          📄 Download PDF
        </button>
      </div>

      <div style={progressWrapper}>
        <div style={progressHeader}>
          <span>Journey Scroll Progress</span>
          <strong>{Math.round((activeDay / totalDays) * 100)}%</strong>
        </div>

        <div style={progressTrack}>
          <div style={{ ...progressFill, width: progressWidth }}></div>

          {trip.itinerary?.map((day, index) => (
            <button
              key={day.dayNumber}
              onClick={() => scrollToDay(day.dayNumber)}
              style={{
                ...dayDot,
                left: `${totalDays === 1 ? 0 : (index / (totalDays - 1)) * 100}%`,
                ...(activeDay > day.dayNumber ? completedDot : {}),
                ...(activeDay === day.dayNumber ? activeDot : {}),
              }}
            >
              {day.dayNumber}
            </button>
          ))}
        </div>

        <div style={dayNav}>
          {trip.itinerary?.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => scrollToDay(day.dayNumber)}
              style={{
                ...dayPill,
                ...(activeDay === day.dayNumber ? activePill : {}),
              }}
            >
              {activeDay > day.dayNumber
                ? "✅ "
                : activeDay === day.dayNumber
                ? "🟢 "
                : "⚪ "}
              Day {day.dayNumber}
            </button>
          ))}
        </div>

        <div style={taskProgressBox}>
          <div style={progressHeader}>
            <span>Activity Checklist Progress</span>
            <strong>
              {completedActivities}/{totalActivities} Done · {activityProgress}%
            </strong>
          </div>
          <div style={greenBar}>
            <div style={{ ...greenBarFill, width: `${activityProgress}%` }}></div>
          </div>
        </div>
      </div>

      <div id="trip-pdf" style={contentCard}>
        <section style={heroCard}>
          <div>
            <p style={eyebrowDark}>TRIP OVERVIEW</p>
            <h2 style={sectionTitle}>
              Your complete {trip.destination} travel plan
            </h2>
            <p style={description}>
              Day-wise journey, smart budget, hotels, packing checklist,
              activity tracker and PDF export in one premium travel dashboard.
            </p>
          </div>

          <div style={scoreCard}>
            <span style={{ fontSize: "34px" }}>⚡</span>
            <h3>AI Travel Score</h3>
            <h1>92%</h1>
            <p>Optimized for budget, duration and interests.</p>
          </div>
        </section>

        <h2 style={sectionTitle}>Budget Breakdown</h2>
        <div style={budgetGrid}>
          <BudgetCard title="Transport" value={trip.estimatedBudget?.transport} icon="🚕" />
          <BudgetCard title="Stay" value={trip.estimatedBudget?.accommodation} icon="🏨" />
          <BudgetCard title="Food" value={trip.estimatedBudget?.food} icon="🍽️" />
          <BudgetCard title="Activities" value={trip.estimatedBudget?.activities} icon="🎟️" />
          <BudgetCard title="Total" value={trip.estimatedBudget?.total} icon="💰" highlight />
        </div>

        <h2 style={sectionTitle}>Hotel Suggestions</h2>
        <div style={grid}>
          {trip.hotels?.map((hotel, index) => (
            <div key={index} style={hotelCard}>
              <div style={hotelIcon}>🏨</div>
              <h3>{hotel.name}</h3>
              <p style={tag}>{hotel.tier}</p>
              <h2>₹{hotel.pricePerNight}</h2>
              <p>⭐ {hotel.rating}</p>
            </div>
          ))}
        </div>

        <h2 style={sectionTitle}>Packing Checklist</h2>
        <div style={grid}>
          {trip.packingList?.map((item, index) => (
            <div key={index} style={packingItem}>
              <span>✅</span>
              <strong>{item.item}</strong>
            </div>
          ))}
        </div>

        <h2 style={sectionTitle}>Day-wise Journey Checklist</h2>

        <div style={timeline}>
          {trip.itinerary?.map((day) => (
            <section
              id={`day-${day.dayNumber}`}
              data-day={day.dayNumber}
              key={day.dayNumber}
              style={{
                ...dayCard,
                ...(activeDay === day.dayNumber ? activeDayCard : {}),
              }}
            >
              <div style={dayHead}>
                <div>
                  <p style={eyebrowDark}>JOURNEY STEP</p>
                  <h2>Day {day.dayNumber}</h2>
                </div>

                <div
                  style={{
                    ...dayBadge,
                    ...(activeDay > day.dayNumber ? completedBadge : {}),
                    ...(activeDay === day.dayNumber ? activeBadge : {}),
                  }}
                >
                  {activeDay > day.dayNumber
                    ? "Completed"
                    : activeDay === day.dayNumber
                    ? "Active"
                    : "Upcoming"}
                </div>
              </div>

              <div style={activityGrid}>
                {day.activities?.map((activity, index) => {
                  const key = `${day.dayNumber}-${index}`;
                  const isDone = completed[key];

                  return (
                    <div
                      key={index}
                      style={{
                        ...activityCard,
                        ...(isDone ? completedActivity : {}),
                      }}
                    >
                      <label style={checkRow}>
                        <input
                          type="checkbox"
                          checked={!!isDone}
                          onChange={() =>
                            toggleActivity(day.dayNumber, index)
                          }
                          style={checkbox}
                        />
                        <span style={activityIcon}>
                          {activity.timeOfDay === "Morning" ? "🌅" : "🌆"}
                        </span>
                        <div>
                          <h3
                            style={{
                              margin: "0 0 8px",
                              textDecoration: isDone ? "line-through" : "none",
                            }}
                          >
                            {activity.timeOfDay} - {activity.title}
                          </h3>
                          <p style={{ marginTop: 0 }}>{activity.description}</p>
                          <strong>Cost: ₹{activity.estimatedCost}</strong>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function BudgetCard({ title, value, icon, highlight }) {
  return (
    <div style={{ ...budgetCard, ...(highlight ? highlightBudget : {}) }}>
      <span style={{ fontSize: "28px" }}>{icon}</span>
      <h4>{title}</h4>
      <h2>₹{value || 0}</h2>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, #e0f2fe, transparent 35%), linear-gradient(180deg,#f8fafc,#eef2f7)",
  padding: "34px 6%",
};

const loadingBox = {
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  fontWeight: "900",
  gap: "18px",
};

const spinner = {
  width: "54px",
  height: "54px",
  border: "6px solid #e5e7eb",
  borderTop: "6px solid #16a34a",
  borderRadius: "50%",
};

const topBar = {
  maxWidth: "1240px",
  margin: "0 auto 22px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const eyebrow = {
  color: "#16a34a",
  fontWeight: "900",
  letterSpacing: "2px",
  marginBottom: "6px",
};

const eyebrowDark = {
  color: "#64748b",
  fontWeight: "900",
  letterSpacing: "2px",
  marginBottom: "6px",
};

const title = {
  fontSize: "clamp(42px, 7vw, 74px)",
  margin: "0",
  letterSpacing: "-3px",
  color: "#070b14",
};

const metaRow = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
  marginTop: "18px",
  fontSize: "16px",
  fontWeight: "800",
};

const downloadBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "18px",
  padding: "16px 24px",
  fontSize: "16px",
  fontWeight: "900",
  cursor: "pointer",
  boxShadow: "0 18px 35px rgba(22,163,74,.28)",
};

const progressWrapper = {
  maxWidth: "1240px",
  margin: "0 auto 28px",
  background: "rgba(255,255,255,.88)",
  border: "1px solid rgba(226,232,240,.9)",
  borderRadius: "24px",
  padding: "22px",
  boxShadow: "0 24px 70px rgba(15,23,42,.10)",
  position: "sticky",
  top: "90px",
  zIndex: 20,
  backdropFilter: "blur(18px)",
};

const progressHeader = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "900",
  marginBottom: "14px",
};

const progressTrack = {
  height: "8px",
  background: "#e5e7eb",
  borderRadius: "999px",
  position: "relative",
  margin: "28px 28px 32px",
};

const progressFill = {
  height: "100%",
  background: "linear-gradient(90deg,#22c55e,#16a34a)",
  borderRadius: "999px",
  transition: ".35s ease",
};

const dayDot = {
  position: "absolute",
  top: "-16px",
  transform: "translateX(-50%)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "4px solid white",
  background: "#cbd5e1",
  color: "#111827",
  fontWeight: "900",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(15,23,42,.15)",
};

const activeDot = {
  background: "#2563eb",
  color: "white",
};

const completedDot = {
  background: "#16a34a",
  color: "white",
};

const dayNav = {
  display: "flex",
  gap: "12px",
  overflowX: "auto",
  paddingBottom: "4px",
};

const dayPill = {
  minWidth: "110px",
  padding: "12px 16px",
  borderRadius: "999px",
  border: "none",
  background: "#f1f5f9",
  color: "#111827",
  fontWeight: "900",
  cursor: "pointer",
};

const activePill = {
  background: "#111827",
  color: "white",
};

const taskProgressBox = {
  marginTop: "18px",
};

const greenBar = {
  height: "12px",
  background: "#e5e7eb",
  borderRadius: "999px",
};

const greenBarFill = {
  height: "100%",
  background: "linear-gradient(90deg,#22c55e,#16a34a)",
  borderRadius: "999px",
  transition: ".3s ease",
};

const contentCard = {
  maxWidth: "1240px",
  margin: "0 auto",
  background: "rgba(255,255,255,.95)",
  borderRadius: "34px",
  padding: "34px",
  boxShadow: "0 30px 100px rgba(15,23,42,.12)",
};

const heroCard = {
  display: "grid",
  gridTemplateColumns: "2fr 330px",
  gap: "22px",
  alignItems: "stretch",
  marginBottom: "34px",
};

const sectionTitle = {
  fontSize: "32px",
  margin: "22px 0",
  color: "#070b14",
};

const description = {
  color: "#64748b",
  fontSize: "18px",
  lineHeight: 1.7,
};

const scoreCard = {
  background: "linear-gradient(135deg,#111827,#2563eb)",
  color: "white",
  borderRadius: "28px",
  padding: "28px",
  boxShadow: "0 24px 60px rgba(37,99,235,.25)",
};

const budgetGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
  gap: "18px",
};

const budgetCard = {
  background: "#eef6ff",
  padding: "22px",
  borderRadius: "22px",
  border: "1px solid #dbeafe",
};

const highlightBudget = {
  background: "#111827",
  color: "white",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "18px",
};

const hotelCard = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "24px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 16px 38px rgba(15,23,42,.08)",
};

const hotelIcon = {
  width: "52px",
  height: "52px",
  borderRadius: "16px",
  background: "#f1f5f9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "26px",
};

const tag = {
  display: "inline-block",
  background: "#dcfce7",
  color: "#166534",
  padding: "7px 12px",
  borderRadius: "999px",
  fontWeight: "900",
};

const packingItem = {
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  padding: "18px",
  borderRadius: "18px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const timeline = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))",
  gap: "24px",
  alignItems: "start",
};

const dayCard = {
  scrollMarginTop: "240px",
  border: "1px solid #e5e7eb",
  borderRadius: "28px",
  padding: "24px",
  background: "#ffffff",
  boxShadow: "0 18px 45px rgba(15,23,42,.08)",
  transition: ".3s ease",
};

const activeDayCard = {
  border: "2px solid #2563eb",
  transform: "translateY(-4px)",
  boxShadow: "0 28px 70px rgba(37,99,235,.18)",
};

const dayHead = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const dayBadge = {
  background: "#f1f5f9",
  color: "#475569",
  padding: "10px 14px",
  borderRadius: "999px",
  fontWeight: "900",
};

const completedBadge = {
  background: "#dcfce7",
  color: "#166534",
};

const activeBadge = {
  background: "#dbeafe",
  color: "#1d4ed8",
};

const activityGrid = {
  display: "grid",
  gap: "16px",
  marginTop: "18px",
};

const activityCard = {
  background: "#f8fafc",
  borderRadius: "22px",
  padding: "20px",
  border: "1px solid #e5e7eb",
};

const completedActivity = {
  background: "#ecfdf5",
  border: "1px solid #bbf7d0",
};

const checkRow = {
  display: "grid",
  gridTemplateColumns: "28px 50px 1fr",
  gap: "14px",
  alignItems: "flex-start",
  cursor: "pointer",
};

const checkbox = {
  width: "22px",
  height: "22px",
  marginTop: "12px",
  accentColor: "#16a34a",
};

const activityIcon = {
  width: "44px",
  height: "44px",
  borderRadius: "14px",
  background: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
};
