import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import IndexPage from './templates/index';
import BlogPage from './templates/blog';
import ArticlePage from './templates/article';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/blog" element={<BlogPage pageType="blog" />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/blog/category" element={<BlogPage pageType="blog" />} />
        <Route path="/blog/search" element={<BlogPage pageType="search" />} />
        <Route path="/blog/category/:slug" element={<BlogPage pageType="category" />} />
        <Route path="/blog/tag/:slug" element={<BlogPage pageType="tag" />} />
        
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
