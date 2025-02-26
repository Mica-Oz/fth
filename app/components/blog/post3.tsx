import Link from "next/link";
import React from "react";
import Image from "next/image";
import fresh from "@/public/fresh.jpeg";

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
        <p className="title">
          The IRS Fresh Start Program Can Wipe Out Your Tax Debt
        </p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          22 June 2022
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
            style={{ backgroundImage: `url(${fresh.src})` }}
          ></div>
          <div className="box-front blog-post">
            <div className="cont post-bubble">
              <p style={{ marginTop: "0" }}>
                You might be reading this because you’ve heard that the IRS can
                wipe out some or perhaps all of your tax debt. <br />
                It’s true...
              </p>
            </div>
          </div>
          <div className="box-back"></div>
        </div>

        <p className="p1 body-p">
          It can happen under the Fresh Start Program, also known as the Fresh
          Start Initiative. We are here to help you find out if you can qualify
          for this Fresh Start Program or other programs sometimes referred to
          as the Offer In Compromise.
        </p>

        <p className="body-h">IT CAN TAKE AS LITTLE AS 15 MINUTES</p>

        <p className="body-p">
          It can take as little as 15 minutes to find out if you can qualify for
          a Fresh Start Program. We’ll be honest with you. Not everyone
          qualifies, and the IRS judges each taxpayer’s application
          independently — on a case-by-case basis. But we have years of
          experience and we can tell you if we think you will qualify for a
          Fresh Start or for other assistance to help you deal with your tax
          debt and other IRS issues.
        </p>
        <p className="body-p">
          When taxpayers request their <strong>Free Tax History Report</strong>
          Survey, they are able to see if they qualify for the IRS Fresh Start
          Program and begin their journey toward tax resolution in minutes.
        </p>

        <p className="body-h">WHAT THE FRESH START PROGRAM CAN DO</p>
        <p className="body-p">
          The Fresh Start Program can offer natural relief to taxpayers who owe
          thousands of dollars in back taxes. If you don’t owe a lot of money,
          we can tell you about other tax relief options that are easier to
          qualify for and can help you resolve your tax issues faster. But if
          you do owe thousands of dollars, you should know that in some cases,
          the IRS has wiped out all back taxes owed — that’s 100% of pending tax
          bills.
        </p>
        <p className="body-p">
          There are a lot of tax relief companies that will tell you this, but
          you must be careful. In some cases, it’s nothing more than “bait and
          switch” advertising with unscrupulous tax relief companies trying to
          sell you other, more expensive services. When you speak with us, you
          know that our reputation is based on years of honestly representing
          our client taxpayers.{" "}
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

      <div className="row-1">
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
      </div>
    </div>
  );
};

export default Post;
