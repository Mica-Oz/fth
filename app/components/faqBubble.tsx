import React, { useEffect, useState } from "react";
import Link from "next/link";

const SplitWith2 = () => {
  const [squareHeight, setSquareHeight] = useState<number>(0);
  // First useEffect: Observe changes in .square height
  useEffect(() => {
    const square = document.querySelector(".square") as HTMLDivElement;

    // Create a ResizeObserver to observe changes in the height of the .square element
    const resizeObserver = new ResizeObserver(() => {
      setSquareHeight(square.offsetHeight); // Update state with new height
    });

    // Start observing the .square element
    if (square) {
      resizeObserver.observe(square);
    }

    // Clean up the observer when the component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array means it runs only once after the component mounts

  // Effect to update the height of the backSquare when squareHeight changes
  useEffect(() => {
    const backSquare = document.querySelector(".back-square") as HTMLDivElement;
    if (backSquare) {
      backSquare.style.height = `${squareHeight}px`;
    }
  }, [squareHeight]);
  const toggleAnswer: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const qCont = event.currentTarget;

    // Check if any animation is in progress - return early if so
    if (document.querySelector(".animation-in-progress")) {
      return;
    }

    const slideCont = qCont.querySelector(".a-slide-cont") as HTMLDivElement;
    const aCont = qCont.querySelector(".a-cont") as HTMLDivElement;

    // Mark animation as in progress
    document.querySelectorAll(".q-cont").forEach((el) => {
      el.classList.add("animation-in-progress");
    });

    // Check if this question is already open
    const isActive = qCont.classList.contains("active");

    // First, close all currently active questions
    const openQs = document.querySelectorAll(".q-cont.active");
    openQs.forEach((el) => {
      const slideToClose = el.querySelector(".a-slide-cont") as HTMLDivElement;
      if (slideToClose) {
        // For smooth closing animation, first set height to actual current height
        slideToClose.style.height = `${slideToClose.scrollHeight}px`;

        // Force a repaint before changing the height
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        slideToClose.offsetHeight;

        // Now set the height to zero to trigger the transition
        slideToClose.style.transition = "height .3s ease-in-out";
        slideToClose.style.height = "0px";

        slideToClose.addEventListener("transitionend", function removeOpen() {
          slideToClose.classList.remove("open");
          slideToClose.removeEventListener("transitionend", removeOpen);
        });
      }
      el.classList.remove("active");
    });

    if (!isActive) {
      // If this question is not already open, open it
      slideCont.classList.add("open");
      slideCont.style.height = `${aCont.offsetHeight}px`; // Set the height to content's height

      // When transition ends, set height to auto to handle content changes
      slideCont.addEventListener("transitionend", function setAutoHeight() {
        slideCont.style.height = "auto";
        slideCont.removeEventListener("transitionend", setAutoHeight);

        // Re-enable clicks when animation completes
        document.querySelectorAll(".q-cont").forEach((el) => {
          el.classList.remove("animation-in-progress");
        });
      });

      qCont.classList.add("active");
    } else {
      // If closing all items without opening a new one, we need to re-enable clicks
      // after the last animation completes
      const lastSlide = openQs[openQs.length - 1]?.querySelector(
        ".a-slide-cont"
      ) as HTMLDivElement;
      if (lastSlide) {
        lastSlide.addEventListener("transitionend", function enableClicks() {
          document.querySelectorAll(".q-cont").forEach((el) => {
            el.classList.remove("animation-in-progress");
          });
          lastSlide.removeEventListener("transitionend", enableClicks);
        });
      } else {
        // No animations to wait for, re-enable immediately
        document.querySelectorAll(".q-cont").forEach((el) => {
          el.classList.remove("animation-in-progress");
        });
      }
    }
  };

  return (
    <>
      <div
        className="split-bubble-with-title faq
        "
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble">FAQ</div>

        <div className="square">
          <div className="cont">
            <h3 style={{ marginBottom: "15px" }}>
              Frequently Asked Questions:
            </h3>
            <div className="q-cont " onClick={toggleAnswer}>
              <div className="q-line">
                <p className="q">
                  <strong>Is a Free Tax Report really *free*?</strong>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#0a1763"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
              <div className="a-slide-cont">
                <div className="a-cont">
                  <p>
                    Yes! Getting your Tax History Report through us is
                    completely, 100% free. We do not require a credit card to
                    sign up or receive your Tax History Report.{" "}
                  </p>
                  <p>
                    If you choose to use our resolution services, then you will
                    get a clear breakdown of pricing and payment options before
                    you move forward.
                  </p>
                </div>
              </div>
            </div>
            <div className="q-cont" onClick={toggleAnswer}>
              <div className="q-line">
                <p className="q">
                  <strong>How long does it take?</strong>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#0a1763"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
              <div className="a-slide-cont">
                <div className="a-cont">
                  {/* style={{ display: "none" }} */}
                  <p>
                    Submitting your Tax Report Request takes only a few minutes!
                    After we recive your request it can take 1-6 business days
                    to receive your completely free, comprehensive Tax History
                    Report.
                  </p>
                  <p>
                    We will notify you as soon as your report is ready for
                    review, and it will be available to your within your
                    dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="q-cont " onClick={toggleAnswer}>
              <div className="q-line">
                <p className="q">
                  <strong>Is my information safe?</strong>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#0a1763"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
              <div className="a-slide-cont">
                <div className="a-cont">
                  <p>Yes! Your information is completely safe.</p>
                  <p>
                    We use the highest standards of security to ensure your
                    information is safe and secure from bad actors.
                  </p>
                </div>
              </div>
            </div>
            <div className="q-cont" onClick={toggleAnswer}>
              <div className="q-line">
                <p className="q">
                  <strong>
                    I started a resolution with another company, but...
                  </strong>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#0a1763"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
              <div className="a-slide-cont">
                <div className="a-cont">
                  <p>
                    Even if you have already started a resolution with another
                    company, but are not satisfied with your progress, we can
                    step in to help.
                  </p>
                  <p>
                    We understand other tax resolution services often fall short
                    on their promises. We are happy to be here for you when
                    other companies might fall short on your expectations. We
                    will ensure your total satisfaction!
                  </p>
                </div>
              </div>
            </div>
            <div className="q-cont" onClick={toggleAnswer}>
              <div className="q-line">
                <p className="q">
                  <strong>Can I talk to a human?</strong>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#0a1763"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
              <div className="a-slide-cont">
                <div className="a-cont">
                  <p>
                    Absolutely! This process is designed to be as smooth as
                    possible and allow you to easily and quickly sumbit a
                    request for your Tax History Report in an automated,
                    discreet fashion.{" "}
                  </p>
                  <p>
                    However, if you have any questions, need support, or have
                    any interest in chatting with a human about this process, we
                    have a full support team ready to assist you whenever you
                    need it. Please visit our{" "}
                    <Link
                      href={"/contact"}
                      style={{ color: "#5dacad", fontWeight: "500" }}
                    >
                      contact
                    </Link>{" "}
                    page to get in touch!
                  </p>
                </div>
              </div>
            </div>
            <div className="q-cont" onClick={toggleAnswer}>
              <div className="q-line">
                <p className="q">
                  <strong>What&apos;s the catch?</strong>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#0a1763"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>
              <div className="a-slide-cont">
                <div className="a-cont">
                  <p>
                    There is no catch! We offer this service for free, without
                    any need to place a credit card on file.{" "}
                  </p>
                  <p>
                    Our only hope is that if you receive your Tax History Report
                    and you need additional guidance or need to seek a Tax
                    Resolution with the IRS, you will consider using us!{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bubble-back"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
};

export default SplitWith2;
