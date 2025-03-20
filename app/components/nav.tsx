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
  // const [modalToggled, setmodalToggled] = useState<boolean>(false);
  const modalToggleHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    const modal = document.querySelector(".modal") as HTMLElement;
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };
  // Close modal function
  const closeModal = () => {
    const modal = document.querySelector(".modal") as HTMLElement;
    if (modal && modal.style.display === "block") {
      modal.style.display = "none";
    }
  };

  // Add event listeners for clicks outside the modal and scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if modal is open and click is outside both modal content and button
      const modal = document.querySelector(".modal") as HTMLElement;
      const userMenu = document.querySelector(".user-menu") as HTMLElement;
      const userMenuBtn = document.querySelector(
        ".user-menu-btn"
      ) as HTMLElement;

      if (
        modal &&
        modal.style.display === "block" &&
        !userMenu.contains(event.target as Node) &&
        !userMenuBtn.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    // Handle scroll events
    const handleScroll = () => {
      closeModal();
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
          <div className="user-menu-btn" onClick={modalToggleHandler}>
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
      </div>
    );
  } else {
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
  }
};

export default Nav;
