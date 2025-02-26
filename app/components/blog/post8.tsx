import Link from "next/link";
import React from "react";
import Image from "next/image";
import compromise from "@/public/compromise.jpeg";

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
          Can You Get An IRS Fresh Start Or Offer In Compromise On Your Own?
        </p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          15 September 2022
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
            style={{ backgroundImage: `url(${compromise.src})` }}
          ></div>
          <div className="box-front blog-post">
            <div className="cont post-bubble">
              <p style={{ marginTop: "0" }}>
                If you ask the IRS they’ll tell you that you can file a request
                for an Offer In Compromise, which is part of the IRS Fresh Start
                Program, on your own and you don’t need to pay any professional
                for help.
              </p>
            </div>
          </div>
          <div className="box-back"></div>
        </div>

        <p className="p1 body-p">The IRS says this right on its website.</p>

        <p className="body-p">
          The IRS will also warn you that there are unscrupulous people who will
          call themselves “tax pros” and they will make unrealistic promises
          about an Offer In Compromise and The IRS Fresh Start Program just to
          grab your money.
        </p>

        <p className="body-h">
          WE&apos;D LIKE TO TAKE A FEW MINUTES TO DISCUSS THIS
        </p>

        <p className="body-p">
          First of all, our organization has true seasoned tax professionals
          including attorneys, IRS Enrolled Agents, and accountants and tax
          resolution specialists who deal with taxpayers and their cases with
          the IRS as regular, full-time professionals. We are not here to cheat
          you, and we’re really here to help. We have a solid reputation built
          up over the years and we’re not going to blow it now.
        </p>
        <p className="body-p">
          And you don’t want to blow your chance for an Offer In Compromise, and
          the IRS Fresh Start Program, so do you really want to deal with the
          IRS on your own?
        </p>
        <p className="body-p">
          Just look at what the IRS says are the three reasons it uses to grant
          an Offer In Compromise and ask yourself can you prove this information
          to the IRS without help?
        </p>

        <p className="body-p">
          Here are the three reasons that the IRS will grant an Offer In
          Compromise as stated by the IRS:
          <br /> <br />
          • First, the IRS can accept a compromise if there is doubt as to
          liability. A compromise meets this criterion only when there’s a
          genuine dispute as to the existence or amount of the correct tax debt
          under the law.
          <br /> <br />
          • Second, the IRS can accept a compromise if there is doubt that the
          amount owed is fully collectible. Doubt as to collectibility exists in
          any case where the taxpayer’s assets and income are less than the full
          amount of the tax liability.
          <br /> <br />• Third, the IRS can accept a compromise based on
          effective tax administration. An offer may be accepted based on
          effective tax administration when there is no doubt that the tax is
          legally owed and that the full amount owed can be collected, but
          requiring payment in full would either create an economic hardship or
          would be unfair and inequitable because of exceptional circumstances.
        </p>

        <p className="body-p">
          Now you know what the IRS says. Do you understand it? You might have
          to read and then read those three conditions again and again before
          you fully understand them. And if you do fully understand them can you
          adequately present your case so the IRS will accept your Offer In
          Compromise request?
        </p>
        <p className="body-h">LET&apos;S GO OVER THE THREE POINTS AGAIN</p>
        <p className="body-p">
          <br /> <br />
          Can you argue a doubt of tax liability?
          <br /> <br />
          Can you argue a doubt that you can pay?
          <br /> <br />
          Can you argue what’s unfair and inequitable?
          <br /> <br />
        </p>

        <p className="body-p">
          Now you’ll see why our professional help is vital. We know what
          conditions the IRS wants met. We know how to state your case. And most
          importantly, we know who is really eligible for the IRS Fresh Start
          Program including the Offer In Compromise Program and we can tell you
          if you’re eligible or not so you don’t waste your time or your money.
          And if you are not eligible for the Offer In Compromise and the IRS
          Fresh Start Program, we can help you with other ways to resolve your
          IRS tax debt.
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
