import React, { useEffect, useState } from "react"
import Layout from "../containers/Layout"
import Spinner from "../components/Spinner"
import BlogPostsSection from "../components/BlogPostsSection"
import BlogPostsList from "../components/BlogPostsList"
import SEO from "../components/SEO"
import { butterCMS } from "../utils/buttercmssdk";

const BlogPage = ({ location }) => {
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlQuery = urlParams.get("q");

    const loadData = async () => {
      const menuItems = await butterCMS.content.retrieve(["navigation_menu"]);
      setMenuItems(menuItems.data.data.navigation_menu[0].menu_items)

      const locRegex = new RegExp(/\/blog\/search/, "mi")
      if (location.pathname.match(locRegex)) {
        // TODO: add search
      } else {
        /* This code is fetching the first two posts from the ButterCMS API. */
        const posts = await butterCMS.post.list()
        setBlogPosts(posts.data.data)
      }
    }

    loadData()


    setQuery(urlQuery);
    setLoader(false);
  }, []);

  if (loader) return (<Spinner />)

  return (
    <Layout menuItems={menuItems}>
      <SEO title={mainEntityName || (query && `Search results for ${query}`) || "Blog"} description={mainEntityName ? `All posts for ${mainEntityName || query}` : "All ButterCMS blog posts"} />

      <BlogPostsSection type={pageType} text={mainEntityName || query} />
      <BlogPostsList blogPosts={blogPosts} categories={categories} />
    </Layout>
  )
}

export default BlogPage
