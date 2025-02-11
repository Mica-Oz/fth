import React from "react";

const SplitWith3 = () => {
  return (
    <>
      <div
        className="split-bubble-with-title"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">Why?</div>
        <div className="box-pic"></div>
        <div className="square">
          <div className="cont">
            <h3>Why get your Free Tax History Report?</h3>
            <p>
              <strong>
                Anyone can benefit from getting their Free Tax History Report.{" "}
              </strong>
              Some reasons that a Free Tax History Report can benefit you:
            </p>
            <div className="bullets">
              •You have an open IRS audit
              <br />
              •You have outstanding balances with the IRS
              <br />
              •You have unfiled tax years
              <br />
              •You started a tax resolution but you were unsatisfied with your
              last resolution team
              <br />
              •You are unsure about your standing with the IRS
              <br />
              •You have been contacted by the IRS
            </div>
            <p>
              Whatever your reason may be, we can help you get a clear picture
              of where you stand with the IRS, and get your balances to $0!
            </p>
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default SplitWith3;
