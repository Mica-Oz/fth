"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/fth-logo-new.png";
import { useStytchSession, useStytch } from "@stytch/nextjs";
import { useAppContext } from "@/app/context";
import statusDict from "@/app/utilities/statusData/statusDict";

const Nav = () => {
  const { session } = useStytchSession();
  const { userData } = useAppContext();
  const stytch = useStytch();

  // Use React state to control modal visibility instead of DOM manipulation
  const [wideModalOpen, setWideModalOpen] = useState(false);
  const [narrowModalOpen, setNarrowModalOpen] = useState(false);

  // Add a state to track whether we're mounted on client side
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only render client-specific elements after mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleWideModal = () => {
    setWideModalOpen((prev) => !prev);
    // Close the other modal if it's open
    if (narrowModalOpen) setNarrowModalOpen(false);
  };

  const toggleNarrowModal = () => {
    setNarrowModalOpen((prev) => !prev);
    // Close the other modal if it's open
    if (wideModalOpen) setWideModalOpen(false);
  };

  // Close all modals
  const closeAllModals = useCallback(() => {
    setWideModalOpen(false);
    setNarrowModalOpen(false);
  }, []);

  // Add event listeners for clicks outside the modal and scroll
  useEffect(() => {
    if (!isMounted) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const wideModalContent = document.querySelector("#wide-modal .user-menu");
      const narrowModalContent = document.querySelector(
        "#narrow-modal .user-menu"
      );
      const wideModalBtn = document.querySelector(".wide-modal-btn");
      const narrowModalBtn = document.querySelector(".narrow-modal-btn");

      if (
        wideModalOpen &&
        wideModalContent &&
        !wideModalContent.contains(target) &&
        wideModalBtn &&
        !wideModalBtn.contains(target)
      ) {
        setWideModalOpen(false);
      }

      if (
        narrowModalOpen &&
        narrowModalContent &&
        !narrowModalContent.contains(target) &&
        narrowModalBtn &&
        !narrowModalBtn.contains(target)
      ) {
        setNarrowModalOpen(false);
      }
    };

    // Handle scroll events
    const handleScroll = () => {
      closeAllModals();
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMounted, wideModalOpen, narrowModalOpen, closeAllModals]);

  const handleLogOut = useCallback(async () => {
    // console.log("logout clicked");
    await stytch.session.revoke();
    alert("logged out");
    closeAllModals();
  }, [stytch, closeAllModals]);

  const id = userData?.data?.StatusID || undefined;
  let route = statusDict[id as keyof typeof statusDict];
  const maritalStatus = userData?.data?.MartialStatus;
  const type = userData?.data?.TAX_RELIEF_TAX_TYPE;
  if (id == 184 && maritalStatus === "Married Filing Jointly") {
    route = "status2-2";
  } else if (
    (type === "BUSINESS" || type === "PERSONAL AND BUSINESS") &&
    id == 184
  ) {
    route = "status2-3";
  }
  // console.log(
  //   "nav bar stuff, route:",
  //   route,
  //   "id:",
  //   id,
  //   "marital:",
  //   maritalStatus,
  //   "type:",
  //   type
  // );

  // Common navigation menu items used in both authenticated and non-authenticated views
  const navMenuItems = (
    <>
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
      {/* <div className="nav-menu-item">
        <Link href="/fin101">FIN101</Link>
      </div> */}
    </>
  );

  // Common dropdown menu items used in both authenticated and non-authenticated mobile views
  const commonDropdownItems = (
    <>
      <Link
        href="/about"
        className="about-li user-menu-li"
        onClick={closeAllModals}
      >
        ABOUT
      </Link>
      <Link
        href="/resolution"
        className="resolution-li user-menu-li"
        onClick={closeAllModals}
      >
        TAX RESOLUTION
      </Link>
      <Link
        href="/blog"
        className="blog-li user-menu-li"
        onClick={closeAllModals}
      >
        BLOG
      </Link>
      <Link
        href="/faq"
        className="faq-li user-menu-li"
        onClick={closeAllModals}
      >
        FAQ
      </Link>
      <Link
        href="/contact"
        className="contact-li user-menu-li"
        onClick={closeAllModals}
      >
        CONTACT
      </Link>
      {/* <Link
        href="/fin101"
        className="fin101-li user-menu-li"
        onClick={closeAllModals}
      >
        FIN101
      </Link> */}
    </>
  );

  // For server-side rendering or before client hydration
  if (!isMounted) {
    return (
      <div className="nav">
        <Link href="/" className="logo-cont">
          {/* Empty placeholder with same structure */}
          <div style={{ height: 50 }} />
        </Link>
        <div className="nav-menu">
          {/* Empty placeholders with same structure */}
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="nav-menu-item"></div>
            ))}
        </div>
        <div className="nav-btn-cont"></div>
        <div className="nav-btn-cont dropdown-cont auth"></div>
      </div>
    );
  }

  // For authenticated users
  if (session && session?.authentication_factors.length >= 2) {
    return (
      <div className="nav">
        <Link href="/" className="logo-cont">
          <Image src={logo} alt="Logo" height={50} />
        </Link>

        <div className="nav-menu">{navMenuItems}</div>

        <div className="nav-btn-cont auth">
          <div
            className="user-menu-btn wide-modal-btn"
            onClick={toggleWideModal}
          >
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
          <div
            className="modal"
            id="wide-modal"
            style={{ display: wideModalOpen ? "block" : "none" }}
          >
            <div className="modal-content">
              <div className="triangle"></div>
              <div className="triangle2"></div>
              <div className="triangle3"></div>
              <div className="user-menu">
                <Link
                  href={"/dashboard/" + route}
                  className="dash-li user-menu-li"
                  onClick={closeAllModals}
                >
                  DASHBOARD
                </Link>
                <div onClick={handleLogOut} className="logout-li user-menu-li">
                  LOG OUT
                </div>
              </div>
              <div className="user-menu-back"></div>
            </div>
          </div>
        </div>

        <div className="nav-btn-cont dropdown-cont auth">
          <div
            className="user-menu-btn narrow-modal-btn"
            onClick={toggleNarrowModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#0a1763"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </div>
          <div
            className="modal"
            id="narrow-modal"
            style={{ display: narrowModalOpen ? "block" : "none" }}
          >
            <div className="modal-content">
              <div className="triangle"></div>
              <div className="triangle2"></div>
              <div className="triangle3"></div>
              <div className="user-menu narrow auth">
                {commonDropdownItems}
                <Link
                  href={"/dashboard/" + route}
                  className="dash-li user-menu-li"
                  onClick={closeAllModals}
                >
                  DASHBOARD
                </Link>
                <div onClick={handleLogOut} className="logout-li user-menu-li">
                  LOG OUT
                </div>
              </div>
              <div className="user-menu-back auth narrow"></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // For non-authenticated users
    return (
      <div className="nav">
        <Link href="/" className="logo-cont">
          <Image src={logo} alt="Logo" height={50} />
        </Link>

        <div className="nav-menu">{navMenuItems}</div>

        <div className="nav-btn-cont">
          <Link href="/signup">
            <div className="sign-up-btn btn">FREE SIGN UP</div>
          </Link>
          <Link href="/login">
            <div className="log-in-btn btn">LOG IN</div>
          </Link>
        </div>

        <div className="nav-btn-cont dropdown-cont auth">
          <div
            className="user-menu-btn narrow-modal-btn"
            onClick={toggleNarrowModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#0a1763"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </div>
          <div
            className="modal"
            id="narrow-modal"
            style={{ display: narrowModalOpen ? "block" : "none" }}
          >
            <div className="modal-content">
              <div className="triangle"></div>
              <div className="triangle2"></div>
              <div className="triangle3"></div>
              <div className="user-menu narrow auth">
                {commonDropdownItems}
                <Link
                  href="/signup"
                  className="signup-li user-menu-li"
                  onClick={closeAllModals}
                >
                  SIGN UP
                </Link>
                <Link
                  href="/login"
                  className="login-li user-menu-li"
                  onClick={closeAllModals}
                >
                  LOG IN
                </Link>
              </div>
              <div className="user-menu-back auth narrow"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Nav;
