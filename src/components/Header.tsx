import React from "react";
import Link from "next/link";

export default function Header({ rightBadge }: { rightBadge?: React.ReactNode }) {
  return (
    <header className="site-header">
      <div className="container" style={{ gap: 10 }}>
        <div className="logo">中古車オークション直販代行サイト</div>
        <nav style={{ display: "flex", gap: 14, alignItems: "center", marginLeft: "auto" }}>
          <Link href="/company" style={{ color: "#93c5fd", textDecoration: "none" }}>会社概要</Link>
          <Link href="/privacy" style={{ color: "#93c5fd", textDecoration: "none" }}>プライバシーポリシー</Link>
          <Link href="/price" style={{ color: "#93c5fd", textDecoration: "none" }}>手数料</Link>
          <Link href="/faq" style={{ color: "#93c5fd", textDecoration: "none" }}>FAQ</Link>
          <Link href="/testimonials" style={{ color: "#93c5fd", textDecoration: "none" }}>お客様の声</Link>
          {rightBadge ? <div className="badge">{rightBadge}</div> : null}
        </nav>

      </div>
    </header>
  );
}
