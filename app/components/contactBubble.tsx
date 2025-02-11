import React from "react";
import blur3 from "@/public/blurbg3.jpg";

const SplitWith2 = () => {
  return (
    <>
      <div
        className="split-bubble-with-title contact-bubble"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Contact</div>
        <div
          className="box-pic"
          id="contactBub"
          style={{
            backgroundImage: `url(${blur3.src})`,
          }}
        ></div>
        <div className="square">
          <div className="cont">
            <h3>Get in touch!</h3>
            <p>
              <strong>Our support team</strong> is available M-F 8:00a-4:00p.
              Please reach out if you have any questions. We are happy to help!
            </p>

            <div className="row" style={{ display: "flex" }}>
              <p style={{ marginRight: "15px" }}>
                <strong>Give Us a Call:</strong>
              </p>
              <p style={{ color: "#5dacad" }}>
                <strong>(555)555-555</strong>
              </p>
            </div>
            <p>
              <strong>Send Us A Message:</strong>
            </p>
            <form action="submit" className="contact-form">
              <input type="text" name="Subject" id="contact-subject" />
              <input type="text" name="Message" id="contact-message" />
            </form>
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default SplitWith2;
