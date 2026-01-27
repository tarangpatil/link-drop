"use client";

import { logout } from "@/lib/actions/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navlinks = [
    {
      text: "Drops",
      url: "/",
    },
    {
      text: "People",
      url: "/people",
    },
    {
      text: "Invites",
      url: "/invites",
    },
  ];

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-semibold"
          href="/"
        >
          <span className="d-inline-flex align-items-center gap-2">
            <i className="bi bi-send-check fs-5"></i>
            <span>LinkDrop</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#linkdropNavbar"
          aria-controls="linkdropNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="linkdropNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navlinks.map((link, idx) => (
              <li className="nav-item" key={idx}>
                <Link
                  className={`nav-link ${pathname === link.url && "active"}`}
                  href={link.url}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2">
            <form action={logout}>
              <button className="btn btn-outline-danger" type="submit">
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
