"use client";

import { useState } from "react";

export default function TailorGigForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    deliveryTime: "",
    revisions: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/tailor-gigs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        deliveryTime: Number(form.deliveryTime),
        revisions: Number(form.revisions),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Something went wrong ❌");
    } else {
      setMessage("Gig created successfully 🎉");
      setForm({
        title: "",
        description: "",
        price: "",
        deliveryTime: "",
        revisions: "",
      });
    }

    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}> Create Tailor Gig</h2>
        <p style={styles.subheading}>
          Showcase your service and start earning
        </p>

        <Input
          name="title"
          placeholder="Gig Title"
          value={form.title}
          onChange={handleChange}
        />

        <Textarea
          name="description"
          placeholder="Gig Description"
          value={form.description}
          onChange={handleChange}
        />

        <Input
          name="price"
          type="number"
          placeholder="Price (৳)"
          value={form.price}
          onChange={handleChange}
        />

        <Input
          name="deliveryTime"
          type="number"
          placeholder="Delivery Time (days)"
          value={form.deliveryTime}
          onChange={handleChange}
        />

        <Input
          name="revisions"
          type="number"
          placeholder="Number of Revisions"
          value={form.revisions}
          onChange={handleChange}
        />

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Gig "}
        </button>

        {message && (
          <p
            style={{
              ...styles.message,
              color: message.includes("successfully") ? "#16a34a" : "#dc2626",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}


function Input(props) {
  return <input {...props} required style={styles.input} />;
}

function Textarea(props) {
  return <textarea {...props} required style={styles.textarea} />;
}


const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #ff8fab, #ffc2d1, #ffe5ec)",
    padding: "20px",
  },

  form: {
    width: "100%",
    maxWidth: "520px",
    background: "rgba(255,255,255,0.95)",
    padding: "32px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    backdropFilter: "blur(8px)",
  },

  heading: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#111827",
  },

  subheading: {
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "10px",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
  },

  textarea: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    minHeight: "100px",
    resize: "vertical",
    outline: "none",
  },

  button: {
    marginTop: "8px",
    padding: "14px",
    background:
      "linear-gradient(135deg, #ff4d6d, #ff758f)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(255,77,109,0.4)",
    transition: "transform 0.15s ease",
  },

  message: {
    marginTop: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
};
