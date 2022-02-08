import React, { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom';
import Layout from "../containers/Layout"
import BlogWidget from "../components/BlogWidget"
import SEO from "../components/SEO"
import Spinner from "../components/Spinner"
import { butterCMS } from "../utils/buttercmssdk";
import placeholder from "../assets/images/placeholder.png"

const ArticlePage = () => {
  const [loader, setLoader] = useState(true);
  const [article, setArticle] = useState();
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const menuItems = await butterCMS.content.retrieve(["navigation_menu"]);
      setMenuItems(menuItems.data.data.navigation_menu[0].menu_items)

      const article = await butterCMS.post.retrieve(slug)
      console.log(article.data.data);
      setArticle(article.data.data)

      const categories = await butterCMS.category.list()
      setCategories(categories.data.data)
    }

    loadData()
    setLoader(false);
  }, [slug]);

  if (loader || !article) return (<Spinner />)

  return (
    <Layout menuItems={menuItems}>
      <SEO title={article.title} description={article.meta_description} image={article.featured_image} />

      <section id="blog-header" className="single-post-nav">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>{article.title}</h2>
                <ul className="breadcrumb-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li>{article.title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-post">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12 col-12">
              <div className="single-post">
                <div className="single-post-meta">
                  <h2 className="single-post-header">{article.title}</h2>
                  <ul className="single-post-meta-info">
                    <li>
                      <a href="#"><img src={article.author.profile_image || placeholder} alt="#" /> {article.author.first_name} {article.author.last_name}</a>
                    </li>
                    <li>
                      <a href="#"><i className="lni lni-calendar"></i> {article.published}
                      </a>
                    </li>
                    <li>
                      {article.tags.map(tag => {
                        return <Link key={tag.slug} to={`/blog/tag/${tag.slug}`}><i className="lni lni-tag"></i> {tag.name} </Link>
                      })}
                    </li>
                  </ul>
                </div>

                {article.featured_image && <div className="single-post-thumbnail">
                  <img src={article.featured_image} alt={article.featured_image_alt} />
                </div>}

                <div className="single-post-body" dangerouslySetInnerHTML={{ __html: article.body }}></div>
              </div>
            </div>

            {/* <!-- Searchbox --> */}
            <aside className="col-lg-4 col-md-12 col-12">
              <BlogWidget categories={categories} />
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ArticlePage
