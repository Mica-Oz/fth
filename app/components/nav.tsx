"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/fth-logo-new.png";
import { useStytchSession, useStytch } from "@stytch/nextjs";
import { useCallback, useEffect } from "react";
import { useAppContext } from "@/app/context";
import statusDict from "@/app/utilities/statusData/statusDict";
const Nav = () => {
  const { session } = useStytchSession();
  const { userData } = useAppContext();

  const stytch = useStytch();
  const modalToggleHandler =
    (modalId: string): React.MouseEventHandler<HTMLDivElement> =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event) => {
      console.log("clicked", modalId);
      const modal = document.getElementById(modalId) as HTMLElement;
      if (modal.style.display === "block") {
        modal.style.display = "none";
      } else {
        modal.style.display = "block";
      }
    };

  // Or  close all modals
  const closeAllModals = () => {
    const modals = document.querySelectorAll(
      ".modal"
    ) as NodeListOf<HTMLElement>;
    modals.forEach((modal) => {
      if (modal.style.display === "block") {
        modal.style.display = "none";
      }
    });
  };

  // Add event listeners for clicks outside the modal and scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Get all modals and their associated buttons
      const modals = document.querySelectorAll(
        ".modal"
      ) as NodeListOf<HTMLElement>;
      const userMenuBtns = document.querySelectorAll(
        ".user-menu-btn"
      ) as NodeListOf<HTMLElement>;

      modals.forEach((modal, index) => {
        if (modal.style.display === "block") {
          const userMenu = modal.querySelector(".user-menu") as HTMLElement;
          const userMenuBtn = userMenuBtns[index];

          if (
            !userMenu.contains(event.target as Node) &&
            !userMenuBtn.contains(event.target as Node)
          ) {
            modal.style.display = "none";
          }
        }
      });
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
  }, []);

  console.log("nav component - ", session);

  const handleLogOut = useCallback(async () => {
    console.log("logout clicked");
    await stytch.session.revoke();
    alert("logged out");
  }, [stytch]);
  const id = userData?.data.StatusID || undefined;
  const route = statusDict[id as keyof typeof statusDict];
  console.log("id:", id, "route:", route);
  if (session) {
    return (
      <div className="nav">
        <Link href="/" className="logo-cont">
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
          <div
            className="user-menu-btn"
            onClick={modalToggleHandler("wide-modal")}
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
          <div className="modal" id="wide-modal">
            <div className="modal-content">
              <div className="triangle"></div>
              <div className="triangle2"></div>
              <div className="triangle3"></div>
              <div className="user-menu">
                <Link
                  href={"/dashboard/" + route}
                  className="dash-li user-menu-li"
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
            className="user-menu-btn"
            onClick={modalToggleHandler("narrow-modal")}
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
          <div className="modal" id="narrow-modal">
            <div className="modal-content">
              <div className="triangle"></div>
              <div className="triangle2"></div>
              <div className="triangle3"></div>
              <div className="user-menu narrow auth">
                <Link href={"/about"} className="about-li user-menu-li">
                  ABOUT
                </Link>
                <Link
                  href={"/resolution"}
                  className="resolution-li user-menu-li"
                >
                  TAX RESOLUTION
                </Link>
                <Link href={"/blog"} className="blog-li user-menu-li">
                  BLOG
                </Link>
                <Link href={"/faq"} className="faq-li user-menu-li">
                  FAQ
                </Link>
                <Link href={"/contact"} className="contact-li user-menu-li">
                  CONTACT
                </Link>
                <Link href={"/fin101"} className="fin101-li user-menu-li">
                  FIN101
                </Link>
                <Link
                  href={"/dashboard/" + route}
                  className="dash-li user-menu-li"
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
        {/* <div className="dropdown-cont">
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
        </div> */}
      </div>
    );
  } else {
    return (
      <div className="nav">
        <Link href="/" className="logo-cont">
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
        <div className="dropdown-cont">
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
      </div>
    );
  }
};

export default Nav;
