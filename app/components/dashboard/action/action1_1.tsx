import React from "react";
import Link from "next/link";

const Action1_1 = () => {
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
            We just need a few more details before we can submit your request!
          </p>
          <form className="form-cont">
            <div className="form-cat">
              <p className="cat-title">General:</p>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
              <input
                type="text"
                name="middleInit"
                id="middleInit"
                placeholder="Middle Initial"
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
              <input
                type="text"
                name="dob"
                id="dob"
                placeholder="Date of Birth"
              />
              <input type="text" name="ssn" id="ssn" placeholder="SSN" />
              <input
                type="text"
                name="maritalStatus"
                id="maritalStatus"
                placeholder="Marital Status"
              />
            </div>
            <div className="form-cat">
              <p className="cat-title">Address:</p>
              <input
                type="text"
                name="streetAddress1"
                id="streetAddress1"
                placeholder="Street Address"
              />
              <input
                type="text"
                name="streetAddress1"
                id="streetAddress1"
                placeholder="Street Address"
              />
              <input type="text" name="city" id="city" placeholder="City" />
              <input type="text" name="state" id="state" placeholder="State" />
              <input type="text" name="zip" id="zip" placeholder="Zip Code" />
            </div>
            <div className="form-cat">
              <p className="cat-title">Employment:</p>
              <input
                type="text"
                name="employmentType"
                id="employmentType"
                placeholder="Employment Type"
              />
              <input
                type="text"
                name="occupation"
                id="occupation"
                placeholder="Occupation"
              />
            </div>
          </form>
          <Link href="/dashboard/action1/2" className="next-btn">
            NEXT
          </Link>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default Action1_1;
