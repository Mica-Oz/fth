import Link from "next/link";
import React from "react";
import Image from "next/image";
import innocent from "@/public/innocent.jpeg";

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
          Are You An Innocent Spouse? It Could Help Resolve Your Taxes
        </p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          18 September 2022
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
            style={{ backgroundImage: `url(${innocent.src})` }}
          ></div>
          <div className="box-front blog-post">
            <div className="cont post-bubble">
              <p style={{ marginTop: "0" }}>
                One of the worst parts about getting divorced — ranking right up
                there with custody of the kids and child support — is dealing
                with money owed to the IRS.
              </p>
            </div>
          </div>
          <div className="box-back"></div>
        </div>

        <p className="p1 body-p">
          Let’s face it — a lot of couples split because of money issues and
          paying taxes is sometimes right at the top of the list of money
          issues.
        </p>

        <p className="body-p">
          Your tax problems could have been caused by your ex — and if they were
          — there’s a chance that the IRS will take that into consideration to
          help you resolve your tax problems.
        </p>

        <p className="body-p">
          Fortunately, for many ex-spouses, the IRS understands that one spouse
          may be victimized by another when it comes to their tax filing and tax
          obligations, so the IRS has an “Innocent Spouse Rule” that might help
          you.
        </p>

        <p className="body-p">
          I know what you’re thinking: if that creep could cheat on me, the
          creep would cheat on their taxes, too.
        </p>
        <p className="body-h">YOUR TAX OBLIGATIONS WHEN MARRIED</p>

        <p className="body-p">
          Under the tax law, when a married couple files a joint return, both
          spouses are legally responsible for that return including the
          deductions claimed and the tax money that is owed. When you both sign
          that joint tax return, you’re both saying “this is our taxes.”
          Luckily, for “innocent spouses.” the IRS understands that there are
          situations where one spouse cannot be liable for errors — or false
          claims — made by the other spouse.
        </p>

        <p className="body-h">ALL KINDS OF FALSE CLAIMS</p>
        <p className="body-p">
          There are all kinds of false claims that one spouse might make on a
          joint tax return. There can be false claims about hiding income, and
          false claims about increasing business deductions. Yes, there are
          false claims made on taxes so one spouse can keep an extra-marital
          affair going.
        </p>
        <p className="body-h">
          HOW A TAX PROFESSIONAL HELPS THE INNOCENT SPOUSE
        </p>
        <p className="body-p">
          A tax professional can present your “innocent spouse case” to the IRS
          to help you resolve your own tax debt. While the IRS does recognize
          there are “innocent spouses” relief is granted to that innocent spouse
          on a case-by-case basis. This is why you need to consult with a tax
          professional. The examination by the IRS can be tough, and
          professional guidance including legal guidance is recommended. The IRS
          will want to know what the “innocent spouse” knew or didn’t know and
          why. You don’t want to go through this alone. It can be a tough line
          of questioning — almost like going through a second divorce. But it
          can be very worthwhile, especially when one spouse is cheating on
          business deductions and even on unpaid taxes withheld from employees.
        </p>
        <p className="body-h">WORRY ABOUT THE KIDS, NOT YOUR TAXES</p>
        <p className="body-p">
          A tax professional and a legal representative can properly represent
          you, and negotiate if necessary if you are an innocent spouse. With
          all the worry about the kids and your own future and getting back on
          your feet, you don’t need the headaches of an additional battle with
          the IRS for something you had no idea was going on.
        </p>
        <p className="body-h">
          INNOCENT SPOUSE RULE AND THE IRS FRESH START PROGRAM
        </p>
        <p className="body-p">
          Using the innocent spouse rule usually is part of using the IRS Fresh
          Start Program. Yes, you can try this on your own by talking to the IRS
          directly, but do you really want to? We offer a free consultation with
          a tax resolution specialist who can discuss with you the innocent
          spouse rule as well as the IRS Fresh Start Program and the IRS Offer
          In Compromise Program. It all starts with a{" "}
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
