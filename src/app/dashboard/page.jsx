"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <div style={styles.loading}>Loading dashboard...</div>;
    }

    if (!session) {
        router.push("/login");
        return null;
    }

    const role = session.user.role || "customer";

    return (
        <div style={styles.wrapper}>
            <aside style={styles.sidebar}>
                <h2 style={styles.logo}>TailorPanda</h2>

                <nav style={styles.nav}>
                    <NavItem label="Dashboard" url={'/dashboard'}/>
                    {role === "customer" && <NavItem label="My Orders" url={'myOrders'}/>}
                    {role === "tailor" && <NavItem label="Assigned Orders" url={'tailorOrders'}/>}
                    {role === "admin" && <NavItem label="Manage Users" />}
                    {role !== "customer" && <NavItem label="Reports" />}
                    {role === 'tailor' && <NavItem label="Tailor Gig" url={"tailor/gigs"} />}
                    {role === 'customer' && <NavItem label="My Orders" url={"myOrders"} />}
                </nav>

                <button onClick={() => signOut()} style={styles.logout}>
                    Logout
                </button>
            </aside>

            <main style={styles.main}>
                <h1 style={styles.title}>
                    Welcome, {session.user.name}
                </h1>
                <p style={styles.role}>
                    Role: <strong>{role.toUpperCase()}</strong>
                </p>

                {/* ROLE CONTENT */}
                {role === "customer" && <CustomerDashboard />}
                {role === "tailor" && <TailorDashboard />}
                {role === "admin" && <AdminDashboard />}
            </main>
        </div>
    );
}


const NavItem = ({ label, url }) => {
    const router = useRouter();
    
    return (
        <div onClick={() => router.push(`${url}`)} style={styles.navItem}>{label}</div>
    );
};

const Card = ({ title, value }) => (
    <div style={styles.card}>
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
);


const CustomerDashboard = () => (
    <>
        <SectionTitle title="Customer Overview" />
        <div style={styles.grid}>
            <Card title="Total Orders" value="5" />
            <Card title="Pending Orders" value="2" />
            <Card title="Completed Orders" value="3" />
        </div>
    </>
);

const TailorDashboard = () => (
    <>
        <SectionTitle title="Tailor Overview" />
        <div style={styles.grid}>
            <Card title="Assigned Orders" value="8" />
            <Card title="In Progress" value="4" />
            <Card title="Completed" value="12" />
        </div>
    </>
);

const AdminDashboard = () => (
    <>
        <SectionTitle title="Admin Overview" />
        <div style={styles.grid}>
            <Card title="Total Users" value="320" />
            <Card title="Total Tailors" value="48" />
            <Card title="Total Orders" value="1,250" />
        </div>
    </>
);

const SectionTitle = ({ title }) => (
    <h2 style={styles.sectionTitle}>{title}</h2>
);


const styles = {
    wrapper: {
        display: "flex",
        minHeight: "100vh",
        background: "#f4f6f8",
        // fontFamily: "Arial, sans-serif",
    },

    sidebar: {
        width: "240px",
        background: "#111827",
        color: "#fff",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    logo: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "30px",
    },

    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },

    navItem: {
        padding: "10px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        background: "#1f2937",
    },

    logout: {
        marginTop: "20px",
        padding: "10px",
        border: "none",
        borderRadius: "6px",
        background: "#ef4444",
        color: "#fff",
        cursor: "pointer",
    },

    main: {
        flex: 1,
        padding: "32px",
    },

    title: {
        fontSize: "26px",
        marginBottom: "6px",
    },

    role: {
        color: "#6b7280",
        marginBottom: "28px",
    },

    sectionTitle: {
        fontSize: "20px",
        marginBottom: "16px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
    },

    card: {
        background: "#ffffff",
        borderRadius: "12px",
        padding: "22px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    },

    loading: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
    },
};
