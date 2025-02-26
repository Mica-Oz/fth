import Link from "next/link";
import React from "react";
import Image from "next/image";
import home from "@/public/home.jpeg";

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
        <p className="title">What’s Not Tax Deductible When You Buy A Home</p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          09 September 2022
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
            style={{ backgroundImage: `url(${home.src})` }}
          ></div>
          <div className="box-front blog-post">
            <div className="cont post-bubble">
              <p style={{ marginTop: "0" }}>
                This is a tough time for the real estate market and it’s a tough
                time for Realtors. One of the great sales pitches to home buyers
                is that Uncle Sam will subsidize your home purchase with certain
                expenses being tax deductible. But be careful...
              </p>
            </div>
          </div>
          <div className="box-back"></div>
        </div>

        <p className="p1 body-p">
          ...because a lot of what you spend to have your own home is not tax
          deductible. Here are some points you need to remember.
        </p>

        <p className="body-h">FIRST, WHAT IS A HOUSE?</p>

        <p className="body-p">
          First, understand what the IRS considers to be a home that offers some
          tax deductible expenses. The IRS says a home can be an actual
          free-standing house, or a condominium, or a cooperative apartment
          which may also be called a “coop” or a mobile home, houseboat or even
          a house trailer. Each “home” must contain a sleeping space, a toilet
          and cooking facilities. So while an RV can be a home, a “toy hauler”
          would not be a home because it lacks a toilet and more.
        </p>
        <p className="body-h">WHAT IS DEDUCTIBLE</p>

        <p className="body-p">
          The IRS says the costs that are tax deductible include state and local
          real estate taxes on your home subject to a $10,000 limit, any home
          mortgage interest you pay that fall within the limits, and mortgage
          insurance premium payments. You should talk to a tax professional to
          be sure you know how much you can deduct on your taxes.
        </p>

        <p className="body-h">YOUR EXPENSES THAT ARE NOT DEDUCTIBLE</p>
        <p className="body-p">
          Unfortunately there are a lot of expenses connected with home
          ownership that are not tax deductible. Here’s a list of non-deductible
          expenses:
          <br /> <br />
          • Insurance, other than mortgage insurance, including fire and
          comprehensive coverage, and title insurance
          <br /> <br />
          • The amount you paid that was applied to reduce the principal of the
          mortgage
          <br /> <br />
          • The amount you paid that was applied to reduce the principal of the
          mortgage
          <br /> <br />
          • Depreciation
          <br /> <br />
          • The cost of utilities, such as gas, electricity, or water
          <br /> <br />
          • Most settlement or closing costs when you buy
          <br /> <br />
          • Forfeited deposits, down payments, or earnest money
          <br /> <br />
          • Internet or Wi-Fi system or service
          <br /> <br />
          • Homeowners’ association fees, condominium association fees, or
          common charges
          <br /> <br />
          • Home repairs
          <br /> <br />
        </p>
        <p className="body-p">
          After looking over that list you can start to understand why so many
          people decide to only rent. And you can also understand why many
          buyers steer clear of homes that are part of a home owners’
          association where you might have to pay for facilities they’d never
          use. And, you can also understand why fixer-uppers are shunned by many
          buyers.
        </p>
        <p className="body-h">CAN YOU HANDLE THE COMMITMENT?</p>

        <p className="body-p">
          It’s not a joke that buying a house is the biggest purchase most
          families will ever make, so be sure you can handle the commitment.
          Have a budget that includes maintenance and repairs and be aware of
          the cost of utilities.
        </p>
        <p className="body-h">THE LESSON CARRIES OVER TO YOUR TAXES</p>

        <p className="body-p">
          These lessons about money and budget management also carry over to
          your taxes. You need to put aside money to pay your taxes each year.
          But if you have trouble with your tax debt there are some options
          including the IRS Fresh Start Initiative and the IRS Offer In
          Compromise Program.
        </p>

        <p className="body-p">
          While we can’t help you with your house budget we can help you with
          your tax debt. Start by calling us for a{" "}
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
          with one of our tax resolution experts. In 15 minutes or less, and at
          no charge, we’ll tell you if you can qualify for the IRS Fresh Start
          Initiative or the IRS Offer In Compromise Program.
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
