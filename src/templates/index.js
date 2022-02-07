import React, { useState, useEffect } from "react"
import Layout from "../containers/Layout"
import FeaturesSection from "../components/FeaturesSection"
import HeroSection from "../components/HeroSection"
import TestimonialsSection from "../components/TestimonialsSection"
import BlogSection from "../components/BlogSection"
import TwoColumnWithImageSection from "../components/TwoColumnWithImageSection"
import SEO from "../components/SEO";
import Spinner from "../components/Spinner";
import { butterCMS } from "../utils/buttercmssdk";

const IndexPage = () => {
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(null);
  const [menuItems, setMenuItems] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => { 
      const menuItems = await butterCMS.content.retrieve(["navigation_menu"]);
      setMenuItems(menuItems.data.data.navigation_menu[0].menu_items)

      const page = await butterCMS.page.retrieve("landing-page", "landing-page-with-components")
      setPage(page.data.data)

      const posts = await butterCMS.post.list({ page: 1, page_size: 2 })
      setBlogPosts(posts.data.data)
      setLoader(false);
    }

    loadData()
  }, []);

  if (loader) return (<Spinner />)

  return (
    <Layout menuItems={menuItems}>
      <SEO { ...page.fields.seo } />

      {page.fields.body.map((bodyElement, i) => {
        switch (bodyElement.type) {
          case "hero":
            return <HeroSection fields={bodyElement.fields} key={i}/>
          case "two_column_with_image":
            return <TwoColumnWithImageSection fields={bodyElement.fields} key={i}/>
          case "features":
            return <FeaturesSection fields={bodyElement.fields} key={i}/>
          case "testimonials":
            return <TestimonialsSection fields={bodyElement.fields} key={i}/>
          default:
            return null
        }
      })}

      {/* <BlogSection blogPosts={blogPosts} /> */}
    </Layout>
  )
}

export default IndexPage
