import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import Layout from "../containers/Layout"
import Spinner from "../components/Spinner"
import BlogPostsSection from "../components/BlogPostsSection"
import BlogPostsList from "../components/BlogPostsList"
import SEO from "../components/SEO"
import { butterCMS } from "../utils/buttercmssdk";

const BlogPage = ({ pageType }) => {
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [mainEntityName, setMainEntityName] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get("q");

    const loadData = async () => {
      const menuItems = await butterCMS.content.retrieve(["navigation_menu"]);
      setMenuItems(menuItems.data.data.navigation_menu[0].menu_items)

      const categories = await butterCMS.category.list()
      setCategories(categories.data.data)

      if (pageType === "search") {
        // search posts by query
        const posts = await butterCMS.post.search(urlQuery)
        setBlogPosts(posts.data.data)
      } else {
        let filterBy = {}

        if (pageType === "category") { 
          // if category detail, filter posts by category and load detail
          filterBy = { category_slug: slug } 
          setMainEntityName((await butterCMS.category.retrieve(slug)).data.data.name)
        } else if (pageType === "tag") {
          // if tag detail, filter posts by tag and load detail
          filterBy = { tag_slug: slug }
          setMainEntityName((await butterCMS.tag.retrieve(slug)).data.data.name)
        }

        // load all or filtered posts
        const posts = await butterCMS.post.list(filterBy)
        setBlogPosts(posts.data.data)
      }
    }

    loadData()


    setQuery(urlQuery);
    setLoader(false);
  }, [pageType, slug]);

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
