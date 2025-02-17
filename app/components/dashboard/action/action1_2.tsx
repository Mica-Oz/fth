import React from "react";
import Link from "next/link";

const Action1_2 = () => {
  return (
    <>
      <div
        className="split-bubble-with-title action-bubble action-1-1"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Tax Report Request Form</div>

        <div className="square">
          <p className="sub-heading">
            You&apos;re almost done!
            <br />
            Just E-sign below and we will begin generating your Free Tax History
            Report!
          </p>
          <form className="form-cont">
            <div className="form-cat">
              <p className="cat-title">E-sign:</p>
              <div className="sig-pad"></div>
            </div>
          </form>
          <Link href="/dashboard/action1/2" className="next-btn">
            SUBMIT
          </Link>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action1_2;
