"use client";
import React, { useEffect } from "react";
import blur2 from "@/public/blurbg2.jpg";
import inflation from "@/public/inflation.jpeg";
import fresh from "@/public/fresh.jpeg";
import damage from "@/public/damage.jpeg";
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
                <div className="blog-post-link">
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
                </div>
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
                  can wipe out some or perhaps all of your tax debt. It’s true.
                  It can happen under the Fresh Start Program, also known as the
                  Fresh Start Initiative...
                </p>
                <div className="blog-post-link">
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
                </div>
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
                  Is your storm damage tax deductible? It depends on how much
                  damage you had, how much coverage you had from insurance, and
                  more...
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
              id="damage-img"
              style={{ backgroundImage: `url(${damage.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>Is Your Storm Damage Tax Deductible? It Depends.</h3>
                <p>
                  Is your storm damage tax deductible? It depends on how much
                  damage you had, how much coverage you had from insurance, and
                  more...
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
                <div className="blog-post-link">
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
                </div>
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
                  can wipe out some or perhaps all of your tax debt. It’s true.
                  It can happen under the Fresh Start Program, also known as the
                  Fresh Start Initiative...
                </p>
                <div className="blog-post-link">
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
                </div>
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
                  Is your storm damage tax deductible? It depends on how much
                  damage you had, how much coverage you had from insurance, and
                  more...
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
              id="fresh-img"
              style={{ backgroundImage: `url(${fresh.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>The IRS Fresh Start Program Can Wipe Out Your Tax Debt</h3>
                <p>
                  You might be reading this because you’ve heard that the IRS
                  can wipe out some or perhaps all of your tax debt. It’s true.
                  It can happen under the Fresh Start Program, also known as the
                  Fresh Start Initiative...
                </p>
                <div className="blog-post-link">
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
                </div>
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
                  Is your storm damage tax deductible? It depends on how much
                  damage you had, how much coverage you had from insurance, and
                  more...
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
              id="fresh-img"
              style={{ backgroundImage: `url(${fresh.src})` }}
            ></div>
            <div className="box-front">
              <div className="cont">
                <h3>The IRS Fresh Start Program Can Wipe Out Your Tax Debt</h3>
                <p>
                  You might be reading this because you’ve heard that the IRS
                  can wipe out some or perhaps all of your tax debt. It’s true.
                  It can happen under the Fresh Start Program, also known as the
                  Fresh Start Initiative...
                </p>
                <div className="blog-post-link">
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
                </div>
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
