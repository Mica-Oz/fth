"use client";
import React, { useEffect } from "react";
import blur2 from "@/public/blurbg2.jpg";
import inflation from "@/public/inflation.jpeg";
import fresh from "@/public/fresh.jpeg";
import damage from "@/public/damage.jpeg";
import time from "@/public/time.jpeg";
import irs from "@/public/irs.jpeg";
import tip from "@/public/tipping.jpeg";
import compromise from "@/public/compromise.jpeg";
import innocent from "@/public/innocent.jpeg";
import home from "@/public/home.jpeg";
import forsale from "@/public/forsale.jpeg";

import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import FooterDiagBlog from "@/app/components/footerDiagBlog";
const Blog = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div
        className="blog-head"
        style={{ backgroundImage: `url(${blur2.src})` }}
      >
        <p className="blog-header" data-aos="fade-right" data-aos-delay="150">
          Read Our Blog:{" "}
        </p>

        <div className="diag"></div>
        <div className="blog cont">
          <div className="post post1">
            <div
              className="box-pic"
              id="inflation-img"
              style={{ backgroundImage: `url(${inflation.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>
                  How Inflation Helps You Save On Taxes And Makes You Pay More
                  On Your Tax Debt
                </h3>
                <p>
                  Inflation is the hot subject now. It’s not only impacting your
                  credit cards and bank accounts and your groceries and your
                  gasoline, but it’s also impacting your taxes....
                </p>
                <Link href={"/blog/post/1"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
          <div className="post post2">
            <div
              className="box-pic"
              id="fresh-img"
              style={{ backgroundImage: `url(${fresh.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>The IRS Fresh Start Program Can Wipe Out Your Tax Debt</h3>
                <p>
                  You might be reading this because you’ve heard that the IRS
                  can wipe out some or perhaps all of your tax debt. It’s
                  true...
                </p>
                <Link href={"/blog/post/2"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
          <div className="post post1">
            <div
              className="box-pic"
              id="damage-img"
              style={{ backgroundImage: `url(${damage.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>Is Your Storm Damage Tax Deductible? It Depends.</h3>
                <p>
                  It depends on how much damage you had, how much coverage you
                  had from insurance, and more...
                </p>
                <Link href={"/blog/post/3"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
          <div className="post post2">
            <div
              className="box-pic"
              id="time-img"
              style={{ backgroundImage: `url(${time.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>
                  There Are Time Limits When Dealing With The IRS That Can Help
                  You Or Hurt You
                </h3>
                <p>
                  No one enjoys dealing with the IRS over audits or even
                  criminal investigations. But the IRS has some time limits that
                  it must follow....
                </p>
                <Link href={"/blog/post/4"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
          <div className="post post1">
            <div
              className="box-pic"
              id="irs-img"
              style={{ backgroundImage: `url(${irs.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>You Don’t Have To Face The IRS Alone</h3>
                <p>In fact, you may not have to face the IRS at all...</p>
                <Link href={"/blog/post/5"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
          <div className="post post2">
            <div
              className="box-pic"
              id="innocent-img"
              style={{ backgroundImage: `url(${innocent.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>
                  Are You An Innocent Spouse? It Could Help Resolve Your Taxes
                </h3>
                <p>
                  One of the worst parts about getting divorced — ranking right
                  up there with custody of the kids and child support — is
                  dealing with money owed to the IRS....
                </p>
                <Link href={"/blog/post/6"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
          <div className="post post1">
            <div
              className="box-pic"
              id="tip-img"
              style={{ backgroundImage: `url(${tip.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>Tipping And The IRS </h3>
                <p>Yes, the IRS has its hand in the tip jar...</p>
                <Link href={"/blog/post/7"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
          <div className="post post2">
            <div
              className="box-pic"
              id="tip-img"
              style={{ backgroundImage: `url(${compromise.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>
                  Can You Get An IRS Fresh Start Or Offer In Compromise On Your
                  Own?{" "}
                </h3>
                <p>
                  If you ask the IRS they’ll tell you that you can file a
                  request for an Offer In Compromise, which is part of the IRS
                  Fresh Start Program, on your own...
                </p>
                <Link href={"/blog/post/8"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
          <div className="post post1">
            <div
              className="box-pic"
              id="home-img"
              style={{ backgroundImage: `url(${home.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>What’s Not Tax Deductible When You Buy A Home</h3>
                <p>
                  This is a tough time for the real estate market and it’s a
                  tough time for Realtors. One of the great sales pitches to
                  home buyers is that Uncle Sam will subsidize your home
                  purchase with certain expenses being tax deductible. But be
                  careful ...
                </p>
                <Link href={"/blog/post/9"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
          <div className="post post2">
            <div
              className="box-pic"
              id="forsale-img"
              style={{ backgroundImage: `url(${forsale.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>Tax Issues When You Sell Your Real Estate</h3>
                <p>
                  This is a rough time of year to be selling your home or other
                  real estate. Not only are we facing...
                </p>
                <Link href={"/blog/post/10"} className="blog-post-link">
                  <h5>Read Post</h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="box-back"></div>
          </div>
        </div>
      </div>
      <div className="blogBG"></div>
      <FooterDiagBlog />
    </>
  );
};

export default Blog;
