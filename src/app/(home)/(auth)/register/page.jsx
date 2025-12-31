"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password1 !== form.password2) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password1,
        role: form.role,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Registration failed");
      return;
    }

    router.push("/login");
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join us and get started</p>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password1"
            value={form.password1}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={form.password2}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Account Type</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="customer">Customer</option>
            <option value="tailor">Tailor</option>
          </select>
        </div>

        <button style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;



const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#fff",
    padding: "32px",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  title: {
    marginBottom: "6px",
    textAlign: "center",
  },
  subtitle: {
    marginBottom: "24px",
    textAlign: "center",
    color: "#666",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "14px",
    fontSize: "14px",
  },
  input: {
    padding: "12px",
    marginTop: "6px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    marginTop: "16px",
    fontSize: "13px",
    textAlign: "center",
    color: "#666",
  },
  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
