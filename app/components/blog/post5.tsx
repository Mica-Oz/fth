import Link from "next/link";
import React from "react";
import Image from "next/image";
import time from "@/public/time.jpeg";

import Icon from "@/public/fth-logo-icon-new.png";

const Post = () => {
  return (
    <div className="blog-post">
      <div className="row-1">
        <div className="back top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#59c8ea"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <Link href={"/blog"}>BACK TO BLOG</Link>
        </div>
      </div>
      <div className="row-2">
        <p className="title">You Don’t Have To Face The IRS Alone</p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          20 September 2022
        </p>
        <p className="author">
          By{" "}
          <Link href="https://www.youtube.com/watch?v=WlfsBamc4fo">
            Alan Mendelson
          </Link>
        </p>

        <div className="post post1 bubble">
          <div
            className="box-pic"
            id="inflation-img"
            style={{ backgroundImage: `url(${time.src})` }}
          ></div>
          <div className="box-front blog-post">
            <div className="cont post-bubble">
              <p style={{ marginTop: "0" }}>
                In Fact, You May Not Have To Face The IRS At All.
              </p>
            </div>
          </div>
          <div className="box-back"></div>
        </div>

        <p className="p1 body-p">
          What are the greatest fears? Some say public speaking is the greatest
          fear. Others say proposing marriage is the greatest fear. But all of
          us say facing the IRS in an audit or when we need help with our tax
          debt is a fear — and a big one if not the greatest of all fears.
          Luckily, you don’t have to face the IRS alone. Even in an audit, you
          don’t have to face the IRS alone. In fact, you don’t have to face the
          IRS at all because IRS regulations allow you to have someone deal with
          the IRS on your behalf.
        </p>

        <p className="body-h">
          WHAT THE IRS SAYS ABOUT HAVING A REPRESENTATIVE
        </p>

        <p className="body-p">
          The IRS says “taxpayers have the right to retain an authorized
          representative of their choice to represent them when they are dealing
          with the IRS.” Yep, there it is straight from the IRS. You can have a
          representative to do the talking for you.
        </p>

        <p className="body-p">
          If you can’t pay for a representative the IRS says you have the right
          to seek assistance from a low income taxpayer clinic. This is not a
          new right. This is one of the fundamental rights that taxpayers have
          as outlined in the Taxpayer Bill of Rights.
        </p>
        <p className="body-h">
          A CLOSER LOOK AT THE RIGHT TO HAVE A REPRESENTATIVE
        </p>

        <p className="body-p">
          Here’s what the IRS says about your right to have a representative:{" "}
          <br />
          <br />
          • “Taxpayers have the right to retain an authorized representative of
          their choice to represent them in their dealings with the IRS.” This
          is your basic right. You don’t have to do it alone.
          <br />
          <br />
          • “Taxpayers who are heading to an interview with the IRS may select
          someone to represent them.” Yes, someone else can do the talking for
          you, and to present your case to the IRS such as for a Fresh Start
          application or Offer In Compromise application, or Innocent Spouse
          relief.
          <br />
          <br />• “Taxpayers who retain representation don’t have to attend with
          their representative unless the IRS formally summons them to appear.”
          This is very important so let’s repeat it. You don’t even have to show
          up at the IRS unless you have been formally summoned. If you have not
          been formally summoned, your representative can handle everything.{" "}
          <br />
          <br />
          • “In most situations, the IRS must suspend an interview if the
          taxpayer requests to consult with a representative, such as an
          attorney, certified public accountant or enrolled agent.” Remember
          this. Just in case you think you can go it alone, if you have any
          doubts you can suspend the interview or appointment and tell the IRS
          representative that you want to consult with a representative.
          <br />
          <br />
          • “Any attorney, CPA, enrolled agent, enrolled actuary or other person
          permitted to represent a taxpayer before the IRS, who’s not disbarred
          or suspended from practice before the IRS, may submit a written power
          of attorney to represent a taxpayer before the IRS.” This makes it
          clear who your legal representative can be and tells you that you’ll
          have to give them a “power of attorney” to represent you.
          <br />
          <br />• “Taxpayers have the right to seek assistance from an LITC (Low
          Income Taxpayer Clinic) if they can’t afford representation. They can
          find a LITC near them by visiting the Low Income Taxpayer Clinics page
          or by calling the IRS toll-free at 800-829-3676.” You don’t have to be
          wealthy to have representation.
        </p>

        <p className="body-h">ABOUT THE LOW INCOME TAXPAYER CLINICS</p>
        <p className="body-p">
          LITCs are independent from the IRS and the Taxpayer Advocate Service
          These clinics represent individuals whose income is below a certain
          level and who need to resolve tax problems with the IRS. LITCs can
          represent taxpayers in audits, appeals and tax collection disputes
          before the IRS and in court. In addition, LITCs can provide
          information about taxpayer rights and responsibilities in different
          languages for individuals who speak English as a second language.
          Services are offered for free or a small fee.
        </p>
        <p className="body-h">WE OFFER A FREE CONSULTATION</p>
        <p className="body-p">
          We also offer a{" "}
          <Link
            href={"/contact"}
            style={{
              color: "#5dacad",
              textDecoration: "underline 2px #5dacad",
              fontWeight: "500",
            }}
          >
            free telephone consultation.
          </Link>{" "}
          and our free consultation is designed to tell you in 15 minutes or
          less if you need our services, or if there is other help for you, or
          if you can fix your tax debt problem yourself. Most taxpayers call us
          because they want to know more about the IRS Fresh Start Program and
          the Offer In Compromise Program. In our 15 minute free consultation we
          can tell you if you could be eligible for the IRS Fresh Start or the
          Offer In Compromise or the Innocent Spouse Relief. The phone call does
          not require any advanced planning and we’ll just be asking for general
          numbers about your finances and your tax debt.
          <Image alt={"icon"} src={Icon} className="icon-punct"></Image>
        </p>

        <div className="line"></div>
        <p className="author bottom">
          By{" "}
          <Link href="https://www.youtube.com/watch?v=WlfsBamc4fo">
            Alan Mendelson
          </Link>
        </p>
      </div>

      <div className="row-1 bottom">
        <div className="back bottom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#59c8ea"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <Link href={"/blog"}>BACK TO BLOG</Link>
        </div>
        <Link href="/signup" className="signup-li user-menu-li">
          GET FREE TAX REPORT
        </Link>
      </div>
    </div>
  );
};

export default Post;
