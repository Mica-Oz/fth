import React from "react";
import blur3 from "@/public/blurbg3.jpg";
// import Link from "next/link";

const SplitWith2 = () => {
  return (
    <>
      <div
        className="split-bubble-with-title contact-bubble"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Mission & Culture</div>
        <div
          className="box-pic"
          id="contactBub"
          style={{
            backgroundImage: `url(${blur3.src})`,
          }}
        ></div>
        <div className="square">
          <div className="cont">
            <h3>Who Are We?</h3>
            <p>
              <strong>
                Thousands of people and businesses have trusted us
              </strong>{" "}
              to solve very simple to very complex tax issues, saving them fees,
              time and sanity. With FreeTaxHistory.com negotiating on their
              behalf, we’ve helped more than 10,000 clients save money and get
              back on track with their taxes.
            </p>
            <p>
              Our mission remains clear: helping people resolve their tax issues
              honestly, efficiently and transparently.
            </p>
            {/* <p>
              <strong>Send Us A Message:</strong>
            </p>
            <form action="submit" className="contact-form">
              <input type="text" name="Subject" id="contact-subject" />
              <input type="text" name="Message" id="contact-message" />
            </form> */}
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default SplitWith2;
