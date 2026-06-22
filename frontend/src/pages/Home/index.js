import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      <section style={hero}>
        <div style={overlay}></div>

        <div style={heroContent}>
          <div style={badge}>
            🌍 AI Powered Travel Planning Platform
          </div>

          <h1 style={title}>
            Plan Smarter.
            <br />
            Travel Better.
          </h1>

          <p style={sub}>
            Create complete travel plans with intelligent itineraries,
            budget forecasting, hotel recommendations, packing checklists,
            activity tracking and PDF travel guides.
          </p>

          <div style={btnRow}>
            <Link to="/create-trip">
              <button style={primaryBtn}>
                ✈️ Start Planning
              </button>
            </Link>

            <Link to="/my-trips">
              <button style={secondaryBtn}>
                📋 View Trips
              </button>
            </Link>
          </div>

          <div style={stats}>
            <Stat number="100+" text="Destinations" />
            <Stat number="24/7" text="AI Planning" />
            <Stat number="PDF" text="Travel Guides" />
            <Stat number="100%" text="Cloud Based" />
          </div>
        </div>
      </section>

      <section style={section}>
        <h2 style={sectionTitle}>
          Everything You Need For Travel Planning
        </h2>

        <div className="grid">
          <Feature
            icon="🤖"
            title="Smart Itinerary"
            text="Generate day-wise travel plans in seconds."
          />

          <Feature
            icon="💰"
            title="Budget Intelligence"
            text="Estimate transport, stay, food and activity costs."
          />

          <Feature
            icon="🏨"
            title="Hotel Suggestions"
            text="Budget, Mid-Range and Luxury hotel recommendations."
          />

          <Feature
            icon="📄"
            title="PDF Export"
            text="Download complete travel plans for offline use."
          />

          <Feature
            icon="✅"
            title="Activity Tracking"
            text="Track completed travel activities and progress."
          />

          <Feature
            icon="🔐"
            title="Secure Accounts"
            text="JWT authentication with user-specific trip isolation."
          />
        </div>
      </section>

      <section style={sectionGray}>
        <h2 style={sectionTitle}>
          Why Choose NaPrayanam?
        </h2>

        <div className="grid">
          <Reason text="Personalized Travel Planning" />
          <Reason text="AI Generated Itineraries" />
          <Reason text="Budget Forecasting" />
          <Reason text="Hotel Discovery" />
          <Reason text="Packing Checklist" />
          <Reason text="PDF Travel Guide Export" />
        </div>
      </section>

      <section style={footerHero}>
        <h2 style={{ fontSize: "42px", marginBottom: "15px" }}>
          Ready For Your Next Journey?
        </h2>

        <p style={{ color: "#cbd5e1", maxWidth: "700px" }}>
          Build travel plans faster, manage budgets smarter and
          organize every journey in one place.
        </p>

        <Link to="/create-trip">
          <button style={footerBtn}>
            🚀 Create Your First Trip
          </button>
        </Link>
      </section>

    </div>
  );
}

function Stat({ number, text }) {
  return (
    <div style={statCard}>
      <h2>{number}</h2>
      <p>{text}</p>
    </div>
  );
}

function Reason({ text }) {
  return (
    <div style={reasonCard}>
      ✔ {text}
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div style={feature}>
      <div style={iconStyle}>{icon}</div>
      <h3>{title}</h3>
      <p style={{ color: "#64748b" }}>{text}</p>
    </div>
  );
}

const hero = {
  minHeight: "90vh",
  position: "relative",
  background:
    "linear-gradient(135deg,#020617,#0f172a,#1e293b,#2563eb)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  overflow: "hidden",
};

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background:
    "radial-gradient(circle at top right,rgba(59,130,246,.3),transparent 35%)",
};

const heroContent = {
  position: "relative",
  zIndex: 2,
  padding: "20px",
  color: "white",
};

const badge = {
  display: "inline-block",
  background: "rgba(255,255,255,.1)",
  padding: "12px 20px",
  borderRadius: "999px",
  marginBottom: "25px",
  fontWeight: "700",
};

const title = {
  fontSize: "clamp(55px,8vw,95px)",
  lineHeight: 1,
  marginBottom: "25px",
  letterSpacing: "-3px",
};

const sub = {
  maxWidth: "850px",
  margin: "0 auto",
  fontSize: "22px",
  color: "#cbd5e1",
  lineHeight: 1.7,
};

const btnRow = {
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginTop: "35px",
};

const primaryBtn = {
  padding: "15px 28px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "14px",
  fontWeight: "700",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "15px 28px",
  background: "white",
  color: "#111827",
  border: "none",
  borderRadius: "14px",
  fontWeight: "700",
  cursor: "pointer",
};

const stats = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
  gap: "20px",
  maxWidth: "900px",
  margin: "60px auto 0",
};

const statCard = {
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.1)",
  padding: "20px",
  borderRadius: "18px",
};

const section = {
  padding: "80px 6%",
};

const sectionGray = {
  padding: "80px 6%",
  background: "#f8fafc",
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "42px",
  marginBottom: "50px",
};

const feature = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
};

const iconStyle = {
  fontSize: "48px",
  marginBottom: "12px",
};

const reasonCard = {
  background: "white",
  padding: "22px",
  borderRadius: "14px",
  fontWeight: "700",
  boxShadow: "0 6px 20px rgba(0,0,0,.06)",
};

const footerHero = {
  padding: "100px 20px",
  background: "#0f172a",
  color: "white",
  textAlign: "center",
};

const footerBtn = {
  marginTop: "25px",
  padding: "16px 28px",
  borderRadius: "14px",
  border: "none",
  background: "#22c55e",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
};
