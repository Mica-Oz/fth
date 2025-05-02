import Link from "next/link";
import React from "react";
import Image from "next/image";
import inflation from "@/public/inflation.jpeg";
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
          How Inflation Helps You Save On Taxes And Makes You Pay More On Your
          Tax Debt
        </p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          22 October 2022
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
            style={{ backgroundImage: `url(${inflation.src})` }}
          ></div>
          <div className="box-front blog-post">
            <div className="cont post-bubble">
              <p style={{ marginTop: "0" }}>
                Inflation is the hot subject now. It’s not only impacting your
                credit cards and bank accounts and your groceries and your
                gasoline, but it’s also impacting your taxes.
              </p>
            </div>
          </div>
          <div className="box-back"></div>
        </div>

        <p className="p1 body-p">
          For many taxpayers, the impact of inflation is actually helping lower
          their taxes, but for some taxpayers it is making the task of paying
          down their tax debt harder.
        </p>

        <p className="body-h">HOW INFLATION LOWERS YOUR TAXES</p>

        <p className="body-p">
          Let’s start this report by looking at how inflation lowers your taxes.
          Under the tax law, many of your deductions are indexed to inflation
          which means as inflation increases the value of their deductions can
          also increase.
        </p>
        <p className="body-p">
          The IRS recently announced that the limits on contributions to many
          retirement accounts were increased. As a result of these higher
          contribution limits, the deductions for certain IRA and retirement
          plan contributions will be going up in 2023.
        </p>
        <p className="body-p">
          The IRS also recently announced that the standard deductions for
          taxpayers who don’t itemize their deductions have also been increased
          and that means more of their income will be tax free starting in 2023.
        </p>
        <p className="body-p">
          If the IRS is exceptionally slow in sending you a refund, you are
          entitled to collect interest that will be added to your refund amount.
          Currently the IRS is paying a 6% interest rate on overpayments — which
          is the money it can’t refund because of a processing logjam.
        </p>
        <p className="body-h">HOW INFLATION RAISES YOUR TAXES</p>
        <p className="body-p">
          But let’s not forget that inflation also works against you when you
          are dealing with the IRS. When you owe money to the IRS, the IRS adds
          interest as well as penalties to your unpaid tax debt. Those interest
          charges go up and down depending on other interest rates in the
          economy. And with the Federal Reserve raising interest rates, the
          interest rates charged by the IRS on tax debt have been going up too.
        </p>
        <p className="body-h">
          Currently the IRS is charging a 6% interest rate on underpayments.
        </p>
        <p className="body-p">
          You can also make the argument that inflation and higher interest
          rates are raising costs for government, so that means the government
          needs more money from tax revenue to pay for its operations. So yes,
          inflation and higher rates make the IRS hungrier for tax revenue.
        </p>

        <p className="body-h">INFLATION AND THE IRS FRESH START INITIATIVE</p>

        <p className="body-p">
          Because of inflation and higher interest rates you should pay down and
          pay off your IRS tax debt as soon as possible. If you need help, the
          IRS offers payment plans — but they contain interest charges — and the
          IRS also offers the Fresh Start Initiative and the Offer In Compromise
          Program which might have lower interest or no interest at all.
        </p>

        <p className="body-h">
          THE IRS FRESH START INITIATIVE AND OFFER IN COMPROMISE PROGRAMS HAVE
          INDIVIDUAL SETTINGS
        </p>

        <p className="body-p">
          Both the IRS Fresh Start Initiative and the IRS Offer In Compromise
          Program have individual settings for each taxpayer who is enrolled in
          these programs. It’s not a “one size fits all” deal. This is why it is
          important that you talk with a tax professional about these programs
          and why using a tax professional might help you get the best possible
          IRS Fresh Start or Offer In Compromise solution.
        </p>

        <p className="body-p">
          In the meantime, understand that the tax debt meter on your account is
          running at the IRS and your tax debt is growing. Inflation and higher
          interest rates are making it more expensive for you to pay off your
          tax debt every day that you put off starting the IRS Offer In
          Compromise or Fresh Start Programs.
        </p>

        <p className="body-h">TALK TO A TAX PROFESSIONAL NOW AND DON’T DELAY</p>

        <p className="body-p">
          Because the interest rate meter is running and it’s not stopping you
          need to talk to a tax professional now and this is something you
          shouldn’t delay. Time is really money when the interest rate meter is
          running.
        </p>

        <p className="body-p">
          Call your tax professional now and ask them if you can qualify for the
          IRS Fresh Start and the Offer In Compromise Programs. We offer a free
          consultation with one of our tax resolution experts about the IRS
          Fresh Start and the Offer In Compromise. And if you don’t qualify our
          tax resolution experts can discuss other ways to pay down your debt
          and to save you money.
        </p>

        <p className="body-h">BUT THE IRS ISN’T BOTHERING ME?</p>

        <p className="body-p">
          When I talk to taxpayers about their overdue tax debt, the taxpayers
          sometimes say to me that they don’t care because the IRS isn’t
          bothering them for any money. Well, that doesn’t mean you’re not being
          charged interest and penalties. In fact, I can promise you that you
          are being charged interest and penalties on your tax debt even if the
          IRS is not bothering you for money.{" "}
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
