import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import CSS
import './assets/css/bootstrap.min.css';
import './assets/css/lineicons.css';
import './assets/css/tiny-slider.css';
import './assets/css/main.css';

// Import template components
import NotFoundPage from './templates/404';
import NoApiKeyPage from './templates/noApiKey';
import HomePage from './templates/index';
import BlogPage from './templates/blog';
import ArticlePage from './templates/article';

// Create wrapper components to provide proper context for hooks
const CategoryBlogPage = () => <BlogPage pageType="category" />;
const TagBlogPage = () => <BlogPage pageType="tag" />;
const SearchBlogPage = () => <BlogPage pageType="search" />;
const DefaultBlogPage = () => <BlogPage pageType="blog" />;

// Main App Component
function App() {
  // If no API token is provided, show the NoApiKeyPage
  if (!import.meta.env.VITE_BUTTER_CMS_API_KEY) {

    return (
      <Router>
        <NoApiKeyPage />
      </Router>
    );
  }

  // Fix for navigation on blog pages
  React.useEffect(() => {
    // This handler runs in the capture phase, before React's handlers
    const fixBlogNavigation = (e) => {
      // Only handle actual link elements
      if (e.target.tagName !== 'A') return;

      // Skip if the default has already been prevented
      if (e.defaultPrevented) return;
      
      // Get the link's href
      const href = e.target.getAttribute('href');
      if (!href) return;
      
      // Fix navigation only if:
      // 1. We're on a blog page
      // 2. This is a menu navigation link (has nav-link class)
      // 3. The link is not to another blog page
      if (window.location.pathname.startsWith('/blog') && 
          e.target.classList.contains('nav-link') &&
          !href.startsWith('/blog')) {
        
        // Stop event propagation to prevent other handlers
        e.stopPropagation();
        
        // Prevent default browser navigation
        e.preventDefault();
        
        // Navigation is being fixed
        
        // Check if there's a hash in the URL
        const hasHash = href.includes('#');
        
        if (hasHash) {
          // Create a flag in window object that will survive page navigation
          window.__scrollToTarget = href.split('#')[1];
          
          // Navigate to the homepage
          window.location.href = '/';
        } else {
          // Regular navigation with no hash
          window.location.href = href;
        }
      }
    };
    
    // Use capture phase to intercept before React
    document.addEventListener('click', fixBlogNavigation, true);
    
    return () => document.removeEventListener('click', fixBlogNavigation, true);
  }, []);

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing-page/:slug/" element={<HomePage />} />
        <Route path="/landing-page/:slug" element={<HomePage />} />
        <Route path="/blog/" element={<DefaultBlogPage />} />
        
        {/* Category and tag routes with trailing slashes */}
        <Route path="/blog/category/:slug/" element={<CategoryBlogPage />} />
        <Route path="/blog/tag/:slug/" element={<TagBlogPage />} />
        <Route path="/blog/search/" element={<SearchBlogPage />} />
        
        {/* Also add non-trailing slash routes for compatibility */}
        <Route path="/blog/category/:slug" element={<CategoryBlogPage />} />
        <Route path="/blog/tag/:slug" element={<TagBlogPage />} />
        <Route path="/blog/search" element={<SearchBlogPage />} />
        
        {/* This route must come after all other /blog/... routes */}
        <Route path="/blog/:slug/" element={<ArticlePage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

