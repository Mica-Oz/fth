import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/fth-logo-new.png";

const Nav = () => {
  return (
    <div className="nav">
      <Link href="/">
        <Image src={logo} alt="Logo" height={50} />
      </Link>

      <div className="nav-menu">
        <div className="nav-menu-item">
          <Link href="/about">ABOUT</Link>
        </div>
        <div className="nav-menu-item">
          <Link href="/resolution">TAX RESOLUTION</Link>
        </div>
        <div className="nav-menu-item">
          <Link href="/blog">BLOG</Link>
        </div>
        <div className="nav-menu-item">
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="nav-menu-item">
          <Link href="/contact">CONTACT</Link>
        </div>
        <div className="nav-menu-item">
          <Link href="/fin101">FIN101</Link>
        </div>
      </div>
      <div className="nav-btn-cont auth">
        <div className="user-menu-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="#0a1763"
            className="auth-nav-icon bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </div>
        <div className="modal">
          <div className="modal-content">
            <div className="triangle"></div>
            <div className="triangle2"></div>
            <div className="triangle3"></div>
            <div className="user-menu">
              <Link
                href={"/dashboard/status1"}
                className="dash-li user-menu-li"
              >
                DASHBOARD
              </Link>
              <Link
                href={"/dashboard/status1"}
                className="logout-li user-menu-li"
              >
                LOG OUT
              </Link>
            </div>
            <div className="user-menu-back"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
