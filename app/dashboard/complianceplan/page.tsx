import React from "react";
import FooterDiag from "@/app/components/footerDiag";
import Nav from "@/app/components/nav";
const THRSuccess = () => {
  let submit;

  return (
    <>
      <Nav />
      <div className="await-auth-main">
        <div className="main-cont">
          <div
            className="bubble-cont login"
            data-aos="fade-right"
            data-aos-delay="150"
          >
            <div className="bubble-header login">YOUR CART</div>
            <div className="bubble-header-back login"></div>
            <div className="bubble-front login">
              <form className="create-form" onSubmit={submit}>
                <div className="form-row-1">
                  <p>Compliance Plan ........ Qty. 1 ........ $50.00</p>
                </div>
                <div className="form-row-2 input-row">
                  <input
                    // {...register("email")}
                    name="email"
                    className="text-input"
                    type="text"
                    placeholder="Name on Card"
                  />
                  {/* {errors.email && (
                    <p className="form-error">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-exclamation-triangle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>
                      {errors.email.message}
                    </p>
                  )} */}
                </div>

                <div className="form-row-2 input-row">
                  <input
                    // {...register("email")}
                    name="email"
                    className="text-input"
                    type="text"
                    placeholder="Card Number"
                  />
                  {/* {errors.email && (
                    <p className="form-error">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-exclamation-triangle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>
                      {errors.email.message}
                    </p>
                  )} */}
                </div>
                <div className="form-row-2 input-row">
                  <input
                    // {...register("email")}
                    name="email"
                    className="text-input"
                    type="text"
                    placeholder="Expiration Date (MM/YY)"
                  />
                  {/* {errors.email && (
                    <p className="form-error">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-exclamation-triangle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>
                      {errors.email.message}
                    </p>
                  )} */}
                </div>
                <div className="form-row-2 input-row">
                  <input
                    // {...register("email")}
                    name="email"
                    className="text-input"
                    type="text"
                    placeholder="Security Code (CVV)"
                  />
                  {/* {errors.email && (
                    <p className="form-error">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-exclamation-triangle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>
                      {errors.email.message}
                    </p>
                  )} */}
                </div>

                <button type="submit" className="form-row-8">
                  CHECKOUT
                </button>
                <div className="form-row-9"></div>
              </form>
            </div>

            <div className="bubble-back login"></div>
          </div>
        </div>
        <FooterDiag page={"awaitauth"} />
      </div>
    </>
  );
};

export default THRSuccess;
