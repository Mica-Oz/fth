import React from "react";
import blur2 from "@/public/blurbg2.jpg";

const Blog = () => {
  return (
    <div className="blog-head" style={{ backgroundImage: `url(${blur2.src})` }}>
      <div className="diag"></div>
    </div>
  );
};

export default Blog;
