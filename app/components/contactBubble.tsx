import React from "react";
import blur3 from "@/public/blurbg3.jpg";
import Link from "next/link";

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
                <strong>(800)-805-3310</strong>
              </p>
            </div>
            <div className="row" style={{ display: "flex" }}>
              <p style={{ marginRight: "15px" }}>
                <strong>Send Us An Email:</strong>
              </p>
              <p style={{ color: "#5dacad" }}>
                <strong>
                  <Link
                    style={{ cursor: "pointer" }}
                    href="mailto:info@freetaxhistory.com"
                  >
                    {" "}
                    info@freetaxhistory.com
                  </Link>
                </strong>
              </p>
            </div>
            <div
              className="row"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <p style={{ marginRight: "15px" }}>
                <strong>Address:</strong>
              </p>
              <div className="address-block">
                <p style={{ textAlign: "left", marginLeft: "30px" }}>
                  1810 E Sahara Ave. Suite 334
                </p>

                <p style={{ textAlign: "left", marginLeft: "30px" }}>
                  Las Vegas, NV 89104
                </p>
              </div>
            </div>

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
