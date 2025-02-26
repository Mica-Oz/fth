import Link from "next/link";
import React from "react";
import Image from "next/image";
import forsale from "@/public/forsale.jpeg";

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
        <p className="title">Tax Issues When You Sell Your Real Estate</p>
        <p className="date">
          {/* <strong>Published on </strong> */}
          04 September 2022
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
            style={{ backgroundImage: `url(${forsale.src})` }}
          ></div>
          <div className="box-front blog-post">
            <div className="cont post-bubble">
              <p style={{ marginTop: "0" }}>
                This is a rough time of year to be selling your home or other
                real estate. Not only are we facing a possible recession, but
                the real estate market is facing higher mortgage rates, hesitant
                buyers, and by the latest count about 20% of home sellers are
                lowering their asking prices.
              </p>
            </div>
          </div>
          <div className="box-back"></div>
        </div>

        <p className="p1 body-p">
          There are also tax questions and tax issues to face when you sell. And
          buyers should be aware of these issues as well because someday they
          might be selling.
        </p>

        <p className="body-h">THE BIG TAX ISSUES</p>

        <p className="body-p">
          How long you live in your home can impact your taxes when you sell it.
          If you live in the home long enough, some or all of your profit can be
          tax free.
        </p>
        <p className="body-p">
          It’s important that you discuss your real estate activities with a tax
          professional. Some Realtors take special courses on tax laws but many
          Realtors do not.
        </p>
        <p className="body-p">Here are some basics you should keep in mind:</p>
        <p className="body-h">DEALING WITH GAINS WHEN YOU SELL</p>

        <p className="body-p">
          Taxpayers who sell their main home and have a gain (profit) from the
          sale may be able to exclude up to $250,000 of that gain from their
          income. Taxpayers who file a joint return with their spouse may be
          able to exclude up to $500,000. Homeowners excluding all the gain do
          not need to report the sale on their tax return unless a Form 1099-S
          was issued.
        </p>
        <p className="body-p">
          To claim the exclusion, the taxpayer must meet ownership and use
          tests. During a five-year period ending on the date of the sale, the
          homeowner must have owned the home and lived in it as their main home
          for at least two years. So, if you lived in the home for at least two
          of the previous five years you could be pocketing a big windfall that
          you don’t have to pay taxes on.
        </p>

        <p className="body-h">WHAT IF YOU LOST MONEY WHEN YOU SELL?</p>
        <p className="body-p">
          Unfortunately the real estate market is turning now. While it is still
          possible that most sellers will be selling at a profit at least in the
          next few months, if the recession drags on home prices could drop to
          the point that some sellers might be taking a loss.
        </p>
        <p className="body-p">
          And this is really unfortunate: taxpayers who experience a loss when
          their main home sells will find that this loss is not deductible.
          Unlike stocks or gold your main home is not considered an investment.
          So if you sell it at a loss, you have to eat the loss. Keep this in
          mind when you’re told that your home is the biggest investment you’ll
          make in your life. As far as the tax law goes, your main home isn’t an
          investment. And as far as the IRS is concerned, you might have to pay
          taxes when you sell it for a profit, but you can’t deduct any loss if
          you are forced to sell it at a loss.
        </p>
        <p className="body-h">MULTIPLE HOMES AND YOUR TAXES</p>

        <p className="body-p">
          If you own more than one home then the home that does not qualify as
          your main home is considered to be an investment property. You can
          only exclude the gain on the sale of the main home. You must pay taxes
          on the gain from selling any other home.
        </p>
        <p className="body-p">
          So, simply put, any secondary home you have is an investment property
          and the profit is taxable starting with the first dollar of profit
          when you sell it.
        </p>
        <p className="body-p">
          Again, here’s where you need to discuss your tax situation with a tax
          professional. Whether you can deduct the loss on a second home may
          depend on your other investments and if it was rented out for income.
          Those conditions may impact your tax situation.
        </p>
        <p className="body-p">Remember, check with a tax professional.</p>
        <p className="body-h">SELLING YOUR HOME TO COVER YOUR TAX DEBT</p>

        <p className="body-p">
          In a bad tax scenario you might be thinking about selling your home or
          selling an investment property in order to pay off your tax debt.
          Before you do that, talk to a trusted tax professional. Our tax
          professionals can discuss with you alternatives including the IRS
          Fresh Start Initiative and the IRS Offer In Compromise Program to pay
          off your tax debt or to reduce your tax debt.
        </p>
        <p className="body-p">
          Keep in mind that the IRS Fresh Start Initiative is not open to
          everyone, but in just a few minutes during a free consulation, you can
          find out from our tax professionals if you might qualify for the IRS
          Fresh Start Initiative and if you are eligible for an Offer In
          Compromise Program.
        </p>
        <p className="body-p">
          If you are not eligible for the IRS Fresh Start Initiative and the IRS
          Offer In Compromise Program, there are other ways you might be able to
          pay down your tax debt in a way that will ease some of the burden.
          There are payment plans available, for example.
        </p>
        <p className="body-p">
          Call us for a free consultation and it really is a free consultation.
          Our tax experts will tell you what the IRS Fresh Start Initiative
          might be able to do for you, and in a few minutes you’ll find out if
          your eligible for the Fresh Start Initiative or if another payment
          program will help you.
        </p>

        <p className="body-p">
          In the meantime, best of luck to those of you who are now active in
          the real estate market. While Labor Day Weekend marks the end of the
          traditional peak season for real estate buying and selling, there is
          still an opportunity for buyers and sellers to make a deal.
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
