import React from "react"
import { Link } from 'react-router-dom';

const BlogPostsSection = ({ type, text }) => {

  const sections = {
    "blog": (
      <div className="section-title text-center">
        <h2>All Blog Posts</h2>
        <ul className="breadcrumb-nav">
          <li><Link to="/">Home</Link></li>
          <li>All blog posts</li>
        </ul>
      </div>
    ),
    "category": (
      <div className="section-title text-center">
        <h2>Blog Posts by Category</h2>
        <ul className="breadcrumb-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog/">Blog</Link></li>
          <li>Category: {text}</li>
        </ul>
      </div>
    ),
    "tag": (
      <div className="section-title text-center">
        <h2>Blog Posts by Tag</h2>
        <ul className="breadcrumb-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog/">Blog</Link></li>
          <li>Tag: {text}</li>
        </ul>
      </div>
    ),
    "search": (
      <div className="section-title text-center">
        <h2>Search Results</h2>
        <ul className="breadcrumb-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog/">Blog</Link></li>
          <li>Search: {text}</li>
        </ul>
      </div>
    )
  }

  const renderSection = sections[type]

  if (!renderSection) {
    console.error("Invalid type for blog post section:", type);
    return (
      <section style={{border: "2px solid red", padding: "20px", margin: "20px"}}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Error: Invalid Section Type</h2>
              <p>Received type: "{type || "undefined"}"</p>
              <p>Expected one of: {Object.keys(sections).join(", ")}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog-roll" className="blog-roll-nav">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            {renderSection}
          </div>
        </div>
      </div>
    </section>)
}

export default BlogPostsSection;