// import Link from "next/link";
import React from "react";
// import Image from "next/image";
// import inflation from "@/public/inflation.jpeg";
// import Icon from "@/public/fth-logo-icon-new.png";

const AdminHomeView = () => {
  return (
    <>
      <div className="home-view">
        {/* row 2  */}
        <div className="row row-2">
          <div className="date-selector">
            Date: 10-29-2025
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-calendar-event"
              viewBox="0 0 16 16"
            >
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
          </div>
          <div className="expander-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrows-fullscreen"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"
              />
            </svg>
          </div>
        </div>
        {/* row 3 */}
        <div className="row row-3">
          <div className="data-block">
            <div className="data-icon light">
              <p className="num">500</p>
              <p className="title">New Users</p>
            </div>
            <div className="data-icon med">
              {" "}
              <p className="num">498</p>
              <p className="title">Email Verified</p>
            </div>
            <div className="data-icon mid">
              {" "}
              <p className="num">497</p>
              <p className="title">SMS Sent</p>
            </div>
            <div className="data-icon dark">
              {" "}
              <p className="num">496</p>
              <p className="title">Phone Verified</p>
            </div>
            <div className="data-icon darkest">
              {" "}
              <p className="num">495</p>
              <p className="title">8821 Filed</p>
            </div>
          </div>
        </div>
        {/* row 2  */}
        <div className="row row-4">
          <div className="date-selector">
            Date Range: 10-01-2025 - 10-31-2025
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-calendar-week"
              viewBox="0 0 16 16"
            >
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
          </div>
          <div className="expander-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-arrows-fullscreen"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"
              />
            </svg>
          </div>
        </div>
        {/* row 3 */}
        <div className="row row-3">
          <div className="data-block">
            <div className="data-icon light">
              <p className="num">500</p>
              <p className="title">New Users</p>
            </div>
            <div className="data-icon med">
              {" "}
              <p className="num">498</p>
              <p className="title">Email Verified</p>
            </div>
            <div className="data-icon mid">
              {" "}
              <p className="num">497</p>
              <p className="title">SMS Sent</p>
            </div>
            <div className="data-icon dark">
              {" "}
              <p className="num">496</p>
              <p className="title">Phone Verified</p>
            </div>
            <div className="data-icon darkest">
              {" "}
              <p className="num">495</p>
              <p className="title">8821 Filed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHomeView;
