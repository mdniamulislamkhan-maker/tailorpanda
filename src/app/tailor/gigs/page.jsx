"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TailorGigsPage() {
  const [gigs, setGigs] = useState([]);
  const [editingGig, setEditingGig] = useState(null);
  const router = useRouter();

  const fetchGigs = async () => {
    const res = await fetch("/api/tailor-gigs");
    const data = await res.json();
    setGigs(data);
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const deleteGig = async (id) => {
    if (!confirm("Are you sure you want to delete this gig?")) return;
    await fetch(`/api/tailor-gigs/${id}`, { method: "DELETE" });
    fetchGigs();
  };

  const updateGig = async () => {
    await fetch(`/api/tailor-gigs/${editingGig._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingGig),
    });

    setEditingGig(null);
    fetchGigs();
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🎨 Your Tailor Gigs</h1>
          <p style={styles.subtitle}>
            Manage your services, pricing, and delivery details
          </p>
        </div>
        <button
          style={styles.createBtn}
          onClick={() => router.push("/tailor/tailorGigForm")}
        >
          + Create New Gig
        </button>
      </div>

      {/* EMPTY STATE */}
      {gigs.length === 0 && (
        <div style={styles.emptyState}>
          <h2>No gigs created yet</h2>
          <p>Start earning by creating your first tailoring gig.</p>
          <button
            style={styles.createBtn}
            onClick={() => router.push("/tailor/tailorGigForm")}
          >
            Create Your First Gig
          </button>
        </div>
      )}

      {/* GIG LIST */}
      <div style={styles.grid}>
        {gigs.map((gig) => (
          <div key={gig._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3>{gig.title}</h3>
              <span style={styles.badge}>Active</span>
            </div>

            <p style={styles.desc}>{gig.description}</p>

            <div style={styles.meta}>
              <span>💰 ৳ {gig.price}</span>
              <span>🚚 {gig.deliveryTime} days</span>
              <span>🔁 {gig.revisions} revisions</span>
            </div>

            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => setEditingGig(gig)}
              >
                ✏️ Edit
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteGig(gig._id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingGig && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Edit Gig</h2>

            <input
              style={styles.input}
              value={editingGig.title}
              onChange={(e) =>
                setEditingGig({ ...editingGig, title: e.target.value })
              }
              placeholder="Gig title"
            />

            <textarea
              style={styles.textarea}
              value={editingGig.description}
              onChange={(e) =>
                setEditingGig({
                  ...editingGig,
                  description: e.target.value,
                })
              }
              placeholder="Gig description"
            />

            <div style={styles.row}>
              <input
                style={styles.input}
                type="number"
                value={editingGig.price}
                placeholder="Price"
                onChange={(e) =>
                  setEditingGig({
                    ...editingGig,
                    price: Number(e.target.value),
                  })
                }
              />

              <input
                style={styles.input}
                type="number"
                value={editingGig.deliveryTime}
                placeholder="Delivery days"
                onChange={(e) =>
                  setEditingGig({
                    ...editingGig,
                    deliveryTime: Number(e.target.value),
                  })
                }
              />

              <input
                style={styles.input}
                type="number"
                value={editingGig.revisions}
                placeholder="Revisions"
                onChange={(e) =>
                  setEditingGig({
                    ...editingGig,
                    revisions: Number(e.target.value),
                  })
                }
              />
            </div>

            <div style={styles.actions}>
              <button style={styles.saveBtn} onClick={updateGig}>
                💾 Save Changes
              </button>
              <button
                style={styles.cancelBtn}
                onClick={() => setEditingGig(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "40px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f9fafb, #eef2ff)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
  },

  subtitle: {
    color: "#6b7280",
    marginTop: "4px",
  },

  createBtn: {
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    transition: "transform 0.2s",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  badge: {
    background: "#dcfce7",
    color: "#166534",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "999px",
  },

  desc: {
    margin: "12px 0",
    color: "#374151",
    fontSize: "14px",
  },

  meta: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "14px",
    color: "#4b5563",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "16px",
  },

  editBtn: {
    flex: 1,
    background: "#eef2ff",
    border: "none",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  deleteBtn: {
    flex: 1,
    background: "#fee2e2",
    border: "none",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#991b1b",
  },

  emptyState: {
    textAlign: "center",
    background: "#fff",
    padding: "60px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "16px",
    width: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    minHeight: "80px",
  },

  row: {
    display: "flex",
    gap: "10px",
  },

  saveBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    flex: 1,
  },

  cancelBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    flex: 1,
  },
};
