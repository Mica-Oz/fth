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
        <div className="header-bubble">Careers</div>
        <div
          className="box-pic"
          id="contactBub"
          style={{
            backgroundImage: `url(${blur3.src})`,
          }}
        ></div>
        <div className="square">
          <div className="cont">
            <h3>Work With Us!</h3>
            <p>
              <strong>Tax Professionals, Tax Lawyers, and mediators</strong> are
              always welcome to apply to FreeTaxHistory,com. We are rapidly
              growing and always have our eyes open for top talent.
            </p>

            <div className="row" style={{ display: "flex" }}>
              <p style={{ marginRight: "15px" }}>
                <strong>Send us an email with your resume at:</strong>
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
