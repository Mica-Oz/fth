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
        <p className="title">
          There Are Time Limits When Dealing With The IRS That Can Help You And
          Others That Hurt You
        </p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          21 September 2022
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
                No one enjoys dealing with the IRS over audits or even criminal
                investigations. But the IRS has some time limits that it must
                follow.
              </p>
            </div>
          </div>
          <div className="box-back"></div>
        </div>

        <p className="p1 body-p">
          These time limits might help you or your tax specialist or your
          attorney. So here are some specific rights you have when dealing with
          the IRS. These rights have time limits for the IRS to act, but as
          you’ll see there are exceptions that can stop the clock for the IRS
          and let their actions continue.
        </p>

        <p className="body-h">THE THREE YEAR LIMIT</p>

        <p className="body-p">
          The IRS generally has three years from the date that you file your tax
          return to assess any additional tax for that tax year. But there are
          some limited exceptions to this three year rule. One of the exceptions
          is that you failed to file, or you filed a fraudulent return. In those
          cases, the IRS has an unlimited amount of time to assess tax for that
          year. So if your return is not fraudulent and you filed, the three
          year clock is ticking — and that’s good for you. But if there is
          evidence of fraud, or if you failed to file a tax return, the IRS can
          keep looking and adding to your tax bill.
        </p>
        <p className="body-h">THE TEN YEAR LIMIT</p>

        <p className="body-p">
          There is also a ten-year clock for the IRS. The IRS generally has 10
          years from an assessment date to collect any unpaid taxes. This ten
          year deadline for the IRS cannot be extended except if you entered
          into an installment agreement or if the IRS obtained a court judgment
          against you. In reality, that gives the IRS a lot of leeway to collect
          what you owe, and this is why you need to discuss your options with a
          tax professional including your options for an Offer In Compromise or
          using the Fresh Start Initiative.
        </p>
        <p className="body-p">
          There are also circumstances when the 10-year collection deadline may
          be suspended. These circumstances include when the IRS cannot collect
          money due to the bankruptcy of the taxpayer, or there’s an ongoing
          collection “due process proceeding” involving the taxpayer. Again,
          talk to your tax professional about other options to settle your IRS
          debt.
        </p>

        <p className="body-h">THE LIMIT ON AUDITS</p>
        <p className="body-p">
          You also have a right about the number of audits that can be brought
          against you. Generally a taxpayer will only be subject to one audit
          per tax year. However, the IRS has the right to reopen an audit for a
          previous tax year if the IRS finds it necessary. It could be necessary
          to reopen an audit if the IRS believes you filed a fraudulent claim.
          If this happens, discuss your options with your tax professional and
          if needed a tax lawyer.
        </p>
        <p className="body-h">TIME LIMITS THAT WORK AGAINST YOU</p>
        <p className="body-p">
          There are other time limits that can work against you. For example
          there’s a time limit for claiming a refund on tax money. This is
          generally three years from the time a tax return is supposed to be
          filed. If you don’t file a tax return that calls for your refund the
          IRS can keep the money. This money can include excess money that was
          withheld from employers, or money that was withheld by casinos when
          you won jackpots.
        </p>
        <p className="body-h">TALK TO A TAX PROFESSIONAL</p>
        <p className="body-p">
          It’s always best to ask a tax professional about any tax issues you
          might have. If you have a question about your taxes you can start with
          us because we offer a{" "}
          <Link
            href={"/contact"}
            style={{
              color: "#5dacad",
              textDecoration: "underline 2px #5dacad",
              fontWeight: "500",
            }}
          >
            free telephone consultation.
          </Link>
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
