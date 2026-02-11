import React from "react";
import Link from "next/link";

export default function Header({ rightBadge }: { rightBadge?: React.ReactNode }) {
  return (
    <header className="site-header">
      <div className="container">
        <div className="logo" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.jpg" alt="丸印モーター" style={{ height: 32, width: "auto" }} />
          <span style={{ fontSize: 16, fontWeight: 800 }}>丸印モーター</span>
        </div>
        <nav className="header-nav">
          <div className="nav-links">
            <Link href="/company" style={{ color: "#1e3a8a", textDecoration: "none" }}>会社概要</Link>
            <Link href="/privacy" style={{ color: "#1e3a8a", textDecoration: "none" }}>プライバシー</Link>
            <Link href="/price" style={{ color: "#1e3a8a", textDecoration: "none" }}>手数料</Link>
            <Link href="/faq" style={{ color: "#1e3a8a", textDecoration: "none" }}>FAQ</Link>
            <Link href="/testimonials" style={{ color: "#1e3a8a", textDecoration: "none" }}>お客様の声</Link>
          </div>
          {rightBadge ? <div className="badge">{rightBadge}</div> : null}
        </nav>
      </div>
    </header>
  );
}
