import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import IndexPage from './templates/index';
import BlogPage from './templates/blog';
import ArticlePage from './templates/article';
import NoApiKeyPage from './templates/noApiKey';

const renderPage = (page) => {
  if (!process.env.REACT_APP_BUTTER_CMS_API_KEY) {
    /* This is a placeholder for when the API key is not set. */
    return <NoApiKeyPage />
  }
  return page;
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={renderPage(<IndexPage />)} />
        <Route path="/landing-page/:slug" element={renderPage(<IndexPage />)} />
        <Route path="/blog" element={renderPage(<BlogPage pageType="blog" />)} />
        <Route path="/blog/:slug" element={renderPage(<ArticlePage />)} />
        <Route path="/blog/category" element={renderPage(<BlogPage pageType="blog" />)} />
        <Route path="/blog/search" element={renderPage(<BlogPage pageType="search" />)} />
        <Route path="/blog/category/:slug" element={renderPage(<BlogPage pageType="category" />)} />
        <Route path="/blog/tag/:slug" element={renderPage(<BlogPage pageType="tag" />)} />
        
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
