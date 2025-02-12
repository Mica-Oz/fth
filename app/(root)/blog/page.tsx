import React from "react";
import blur2 from "@/public/blurbg2.jpg";
// import FooterDiag from "@/app/components/footerDiag";
const Blog = () => {
  return (
    <>
      <div
        className="blog-head"
        style={{ backgroundImage: `url(${blur2.src})` }}
      >
        <p className="blog-header">Read Our Blog:</p>

        <div className="diag"></div>
      </div>
      {/* <FooterDiag /> */}
    </>
  );
};

export default Blog;
