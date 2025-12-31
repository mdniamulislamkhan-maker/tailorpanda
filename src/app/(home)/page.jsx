"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      {/* <header style={styles.navbar}>
        <div style={styles.logo}>🧵 TailorBD</div>
        <div style={styles.navActions}>
          <button style={{ ...styles.button, ...styles.ghostBtn }}>Login</button>
          <button style={{ ...styles.button, ...styles.primaryBtn }}>
            Get Started
          </button>
        </div>
      </header> */}

      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <h1 style={styles.heroTitle}>
            Perfect Fit.<br />Without Leaving Home.
          </h1>
          <p style={styles.heroText}>
            Book trusted nearby tailors, get home measurements, track progress,
            and receive beautifully stitched dresses at your doorstep.
          </p>

          <div style={styles.searchBox}>
            <input style={styles.input} placeholder="📍 Your location" />
            <input
              style={styles.input}
              placeholder="👗 Dress type (Kurti, Gown...)"
            />
            <button
              onClick={() => router.push("/gigs")}
              style={{ ...styles.button, ...styles.primaryBtn }}
            >
              Find Tailors
            </button>
          </div>

          <div style={styles.trustBar}>
            <div>⭐ 4.8 Avg Rating</div>
            <div>👩‍🦰 15k+ Women Served</div>
            <div>🧵 1,200+ Verified Tailors</div>
          </div>
        </div>

        <Image
          src="/tailor.jpg"
          alt="Tailoring Service"
          width={520}
          height={420}
          style={styles.heroImage}
        />
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Popular Stitching Categories</h2>
        <p style={styles.sectionSub}>
          Choose from a wide range of women’s wear
        </p>

        <div style={styles.grid}>
          {[
            "Kurti",
            "Saree Blouse",
            "Gown",
            "Lehenga",
            "Salwar Suit",
            "Kids Wear",
          ].map((item) => (
            <div key={item} style={styles.card}>
              <div style={styles.icon}>👗</div>
              <h3 style={styles.cardTitle}>{item}</h3>
              <p style={styles.cardText}>Custom stitching with perfect fit</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...styles.section, background: "#fff7fb" }}>
        <h2 style={styles.sectionTitle}>How TailorBD Works</h2>

        <div style={styles.grid}>
          {[
            ["🔍", "Browse Tailors", "View ratings, portfolios & prices"],
            ["📏", "Home Measurement", "Tailor visits your home safely"],
            ["🧵", "Stitching Progress", "Track real-time order status"],
            ["🚚", "Delivery", "Get dress delivered & rate service"],
          ].map(([icon, title, text]) => (
            <div key={title} style={styles.card}>
              <div style={styles.icon}>{icon}</div>
              <h3 style={styles.cardTitle}>{title}</h3>
              <p style={styles.cardText}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Designed for Women</h2>

        <div style={styles.grid}>
          {[
            ["🏠", "Home Comfort", "No need to visit crowded shops"],
            ["🔒", "Verified Tailors", "Background-checked professionals"],
            ["📍", "Live Tracking", "See tailor location in real-time"],
            ["💬", "Support & Reviews", "Rate and review every order"],
          ].map(([icon, title, text]) => (
            <div key={title} style={styles.card}>
              <div style={styles.icon}>{icon}</div>
              <h3 style={styles.cardTitle}>{title}</h3>
              <p style={styles.cardText}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.cta}>
        <h2 style={{ fontSize: 36, fontWeight: 800 }}>
          Are You a Tailor?
        </h2>
        <p style={{ fontSize: 18, marginTop: 10 }}>
          Get more orders, earn more, and grow your tailoring business.
        </p>

        <button
          onClick={() => router.push("/register?role=tailor")}
          style={{
            ...styles.button,
            background: "white",
            color: "#ec4899",
            marginTop: 24,
          }}
        >
          Register as Tailor
        </button>
      </section>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} TailorBD</p>
        <p>Privacy • Terms • Contact</p>
      </footer>
    </div>
  );
}


const styles = {
  container: {
    // fontFamily: "Inter, sans-serif",
    color: "#1f2937",
    background: "linear-gradient(180deg, #fff7fb 0%, #ffffff 50%)",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    alignItems: "center",
  },
  logo: {
    fontSize: 26,
    fontWeight: 900,
    color: "#ec4899",
  },
  navActions: { display: "flex", gap: 14 },
  button: {
    padding: "10px 18px",
    borderRadius: 999,
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  },
  primaryBtn: {
    background: "linear-gradient(135deg, #ec4899, #f97316)",
    color: "white",
  },
  ghostBtn: { background: "transparent", color: "#ec4899" },

  hero: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 40,
    padding: "80px 40px",
    alignItems: "center",
  },
  heroTitle: { fontSize: 50, fontWeight: 900, lineHeight: 1.1 },
  heroText: { marginTop: 18, fontSize: 18, color: "#4b5563" },
  heroImage: { borderRadius: 24 },

  searchBox: { display: "flex", gap: 12, marginTop: 30 },
  input: {
    padding: 14,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    flex: 1,
  },
  trustBar: {
    display: "flex",
    gap: 20,
    marginTop: 20,
    fontSize: 14,
    color: "#6b7280",
  },

  section: { padding: "70px 40px" },
  sectionTitle: { fontSize: 34, fontWeight: 800, textAlign: "center" },
  sectionSub: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 10,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: 26,
    marginTop: 40,
  },
  card: {
    background: "white",
    padding: 26,
    borderRadius: 22,
    boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
    textAlign: "center",
  },
  icon: { fontSize: 36, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 700 },
  cardText: { fontSize: 14, color: "#6b7280", marginTop: 6 },

  cta: {
    margin: "80px 40px",
    padding: "70px 40px",
    borderRadius: 30,
    textAlign: "center",
    color: "white",
    background: "linear-gradient(135deg, #ec4899, #f97316)",
  },
  footer: {
    padding: 40,
    textAlign: "center",
    fontSize: 14,
    color: "#9ca3af",
  },
};
