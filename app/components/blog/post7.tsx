import Link from "next/link";
import React from "react";
import Image from "next/image";
import tip from "@/public/tipping.jpeg";

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
        <p className="title">Tipping And The IRS</p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          16 September 2022
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
            style={{ backgroundImage: `url(${tip.src})` }}
          ></div>
          <div className="box-front blog-post">
            <div className="cont post-bubble">
              <p style={{ marginTop: "0" }}>
                Yes, the IRS has its hand in the tip jar.
              </p>
            </div>
          </div>
          <div className="box-back"></div>
        </div>

        <p className="p1 body-p">
          As the old joke goes, tipping is not a city in China. And not only
          does the IRS have its hand in the tipping jar, but the IRS is serious
          about getting its share of income from tips and gratuities even if the
          tips aren’t in cash.
        </p>

        <p className="body-p">
          If you have a job where tips are part of your income or even much of
          your income it’s no surprise that tip income from jobs is taxable. We
          all know that workers such as waiters and waitresses and valets and
          casino dealers and hotel room cleaners pay taxes on their tip income.
          But what might surprise us is all the details that the IRS has about
          tips and how they are supposed to be reported and taxed.
        </p>
        <p className="body-h">THE IRS RULES ON TIPS AND TIPPING</p>

        <p className="body-p">
          Here are some of those surprising details on tips and tipping from the
          IRS. First of all, the IRS says all tips that workers receive must be
          reported in their gross income. This tip income includes:
          <br /> <br />
          • Tips directly from customers.
          <br /> <br />
          • Tips added using credit, debit, or gift cards.
          <br /> <br />• Tips from a tip-splitting arrangement with other
          employees.
        </p>
        <p className="body-h">YOUR TIP MONEY MAY BE SPLIT WITH MANY</p>

        <p className="body-p">
          In case you don’t know, when you tip a cocktail waitress that waitress
          may have to split the tip with a bartender. The waiter or waitress
          serving your food may be sharing the tip with a busboy or cleaner or
          kitchen workers. When you tip your hairstylist the stylist might be
          sharing the tip with others in the hair salon. And when you tip a
          casino dealer, that dealer may have to split that tip with other
          dealers and with other casino employees including chip runners and
          other employees who normally aren’t tipped. Car valets may share their
          tips with other valets.
        </p>

        <p className="body-h">WHAT ABOUT NON-CASH TIPS?</p>
        <p className="body-p">
          The IRS says even non-cash tips are taxable. The value of non-cash
          tips, such as tickets, passes or other items of value is also income
          and subject to tax.
        </p>
        <p className="body-h">WHAT TO DO WHEN YOU RECEIVE A TIP</p>
        <p className="body-p">
          The IRS says if you get tips on your job there are three things to
          follow to correctly report tip income:
          <br /> <br />
          • Keep a daily tip record. <br /> <br />
          • Report tips to the employer.
          <br /> <br />• Report all tips on your income tax return.
        </p>
        <p className="body-h">IRS RULES FOR EMPLOYERS</p>
        <p className="body-p">
          The IRS also has rules for employers. The IRS says if an employee
          receives $20 or more in any month, the employee must report their tips
          for that month to their employer by the 10th day of the next month.
          The employer must withhold federal income, Social Security, and
          Medicare taxes on the reported tips.
        </p>
        <p className="body-h">YES, THE IRS HAS ITS HAND IN THE TIP JAR</p>
        <p className="body-p">
          Putting spare change from your latte, or leaving 18% as a gratuity on
          your dinner may not seem significant to you, but think about all these
          rules the next time you tip. Not only is the tip taxed but the
          employee might be sharing that tip with others and might be only left
          with a fraction of that spare change or that 18%.
        </p>

        <p className="body-h">
          THINK ABOUT YOUR TAX DEBT AND WHAT HELP YOU NEED
        </p>
        <p className="body-p">
          Here’s a tip that you don’t report to the IRS. If you have tax debt
          and need help to pay your tax debt, you might want to consider the IRS
          Fresh Start Program and the IRS Offer In Compromise Program, among
          other options. We offer a{" "}
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
          to discuss these options with you.
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
