"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Login to your account</p>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.footer}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => router.push("/register")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;



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
    maxWidth: "420px",
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
    marginBottom: "16px",
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
    marginTop: "10px",
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
