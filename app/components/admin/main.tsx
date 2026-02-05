// import Link from "next/link";
import React, { useState } from "react";
// Placeholder for AdminHomeView
import AdminHomeView from "./view";
import AdminUsersView from "./users";
import AdminLogicsView from "./logics";
import AdminClientsView from "./clients";
// Placeholder for AdminPhoneView
const AdminPhoneView = () => (
  <div className="p-8 text-xl ">Phone view coming soon...</div>
);

// import Image from "next/image";
// import inflation from "@/public/inflation.jpeg";
// import Icon from "@/public/fth-logo-icon-new.png";

const AdminMain = () => {
  const [selected, setSelected] = useState<
    "home" | "users" | "logics" | "clients" | "phone"
  >("clients");

  return (
    <div className="body">
      {/* row 1 */}
      <div className="row row-1">
        <div
          className={`nav-icon home${selected === "home" ? " selected" : ""}`}
          onClick={() => setSelected("home")}
          style={{ cursor: "pointer" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill={selected === "home" ? "#5cacad" : "#20634f"}
            className="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg>
        </div>
        <div
          className={`nav-icon users${selected === "users" ? " selected" : ""}`}
          onClick={() => setSelected("users")}
          style={{ cursor: "pointer" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill={selected === "users" ? "#5cacad" : "#20634f"}
            className="bi bi-people"
            viewBox="0 0 16 16"
          >
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
          </svg>
        </div>
        <div
          className={`nav-icon users${
            selected === "logics" ? " selected" : ""
          }`}
          onClick={() => setSelected("logics")}
          style={{ cursor: "pointer" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill={selected === "logics" ? "#5cacad" : "#20634f"}
            className="bi bi-people"
            viewBox="0 0 16 16"
          >
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
          </svg>
        </div>
        <div
          className={`nav-icon${selected === "clients" ? " selected" : ""}`}
          onClick={() => setSelected("clients")}
          style={{ cursor: "pointer" }}
          title="AWS Clients"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill={selected === "clients" ? "#5cacad" : "#20634f"}
            viewBox="0 0 16 16"
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
          </svg>
        </div>
        <div
          className={`nav-icon phone${selected === "phone" ? " selected" : ""}`}
          onClick={() => setSelected("phone")}
          style={{ cursor: "pointer" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill={selected === "phone" ? "#5cacad" : "#20634f"}
            className="bi bi-phone"
            viewBox="0 0 16 16"
          >
            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
        </div>
      </div>
      {/* Render the selected view */}
      {selected === "home" && <AdminHomeView />}
      {selected === "users" && <AdminUsersView />}
      {selected === "logics" && <AdminLogicsView />}
      {selected === "clients" && <AdminClientsView />}
      {selected === "phone" && <AdminPhoneView />}
    </div>
  );
};

export default AdminMain;
