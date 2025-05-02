import Link from "next/link";
import React from "react";
import Image from "next/image";
import damage from "@/public/damage.jpeg";

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
          Is Your Storm Damage Tax Deductible? It Depends.
        </p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          30 September 2022
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
            style={{ backgroundImage: `url(${damage.src})` }}
          ></div>
          <div className="box-front blog-post">
            <div className="cont post-bubble">
              <p style={{ marginTop: "0" }}>
                Is your storm damage tax deductible? It depends on how much
                damage you had, how much coverage you had from insurance, and
                more...
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

        <p className="body-h">
          THE FEDERAL DISASTER DECLARATION IS <br />
          SOMETHING NEW
        </p>

        <p className="body-p">
          The tax law changed a few years ago. In order for storm damage to be
          tax deductible you must be in a federally declared disaster area. This
          rule is supposed to stay in effect until 2025. It might be extended or
          it’s possible that Congress might change the law sometime in the
          future. But right now, if you’re not in a federal disaster area your
          storm losses are not tax deductible.
        </p>
        <p className="body-p">
          What’s difficult to realize is that the same storm might create a
          federal disaster in one state, but not in another state. Meanwhile,
          the state without the federal disaster declaration might have flooding
          and severe damage and those losses will not be tax deductible.
        </p>

        <p className="body-h">THE IRS CHECK LIST FOR STORM DEDUCTIONS</p>
        <p className="body-p">
          The IRS says that for storm losses to be tax deductible you must live
          in a federally declared disaster area. And if you are in the federal
          disaster area you experienced a loss of personal property such as
          furniture, your car, your home. You will need a list of that property
          that was damaged or lost — and the best list to have is an inventory
          of your property.
        </p>
        <p className="body-h">CREATING AN INVENTORY</p>
        <p className="body-p">
          After a major disaster such as what Hurricane Ian caused to parts of
          Florida, you can see why a home inventory is needed. When a home is
          wiped away by storm surge or high winds it can be impossible to
          remember everything you had. You can create an inventory by taking
          photos with your cell phone, or creating lists of your possessions by
          going room to room. Don’t keep the inventory at home — put it in a
          bank safe deposit box or send it to a trusted friend or relative in
          another state where it might survive even if your home doesn’t.
        </p>
        <p className="body-h">KNOW THE FAIR MARKET VALUE</p>
        <p className="body-p">
          Part of the process of knowing if you have tax deductible losses and
          filing a claim with your insurance, is knowing the fair market value
          of your property. It helps if you kept receipts of major items such as
          appliances and furniture and electronics.
        </p>
        <p className="body-h">KNOW YOUR COSTS TO MAKE REPAIRS AND CLEAN UP</p>
        <p className="body-p">
          You’ll also need to know what the costs are for cleaning up and
          repairing the damage. You’ll need this information for your insurance
          claim and for any tax deduction you might claim.
          <Image alt={"icon"} src={Icon} className="icon-punct"></Image>
        </p>
        <p className="body-h">INSURANCE COMES FIRST, THEN THE IRS DEDUCTION</p>
        <p className="body-p">
          Before you can claim an IRS tax deduction for your storm loss, you’ll
          have to deal with your insurance company first. If the insurance
          company covers your losses, you have nothing to deduct on your taxes.
        </p>
        <p className="body-h">STANDARD DEDUCTION OR ITEMIZED DEDUCTION</p>
        <p className="body-p">
          If there is a loss that is not covered by insurance, then you have to
          determine if the loss is more than the value of your standard
          deduction when you file your taxes. If the losses exceed the value of
          your standard deduction, you will have to itemize your deductions to
          use the losses from the storm.
        </p>
        <p className="body-p">
          But this is very important. You might be able to deduct losses when
          using the standard deduction and without itemizing. Here’s what the
          IRS says:
        </p>
        <p className="body-p">
          “In certain federally declared disasters the law allows for a casualty
          loss to be taken without having to exceed your standard deduction. In
          this situation, the net casualty loss can be added to your standard
          deduction.”
        </p>
        <p className="body-p">
          This is why you should consult with a tax professional and be sure you
          are up to date with what federal disaster orders were issued.
        </p>
        <p className="body-h">
          ARE YOUR LOSSES IN EXCESS OF 10% OF YOUR ADJUSTED GROSS INCOME?
        </p>
        <p className="body-p">
          There is another condition that must be met in most cases: are your
          storm losses in excess of 10% of your adjusted gross income? Again,
          consult with your tax professional because this condition might also
          change depending on the disaster and the political climate.
        </p>
        <p className="body-h">THERE ARE OTHER FORMS OF GOVERNMENT HELP</p>
        <p className="body-p">
          Don’t forget there may be other forms of government help if you are a
          storm victim, and even if you are not in a federal disaster area.
          Follow the news. Watch for announcements. Ask questions.
        </p>
        <p className="body-h">GET A FREE CONSULTATION ABOUT YOUR TAX ISSUES</p>
        <p className="body-p">
          Remember that we offer a free telephone consultation about your tax
          issues including questions about your tax debt, missing tax refunds,
          filing overdue returns, and tax deductions for storm damage. Storm
          damage might add to your tax debt and financial problems in which case
          the IRS Fresh Start and the IRS Offer In Compromise Programs might be
          able to help you. Our free consultation will help you know if you
          qualify for the IRS Fresh Start Program and the IRS Offer In
          Compromise Program. If you don’t qualify, there are other programs
          including payment plans that you could use to resolve your tax debt.
          We’ll give you information at no charge about how to use these various
          self-help programs.
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
