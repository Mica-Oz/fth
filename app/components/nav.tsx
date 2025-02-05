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
      <div className="nav-btn-cont">
        <Link href={"/signup"}>
          <div className="sign-up-btn btn">FREE SIGN UP</div>
        </Link>
        <Link href={"/login"}>
          <div className="log-in-btn btn">LOG IN</div>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
