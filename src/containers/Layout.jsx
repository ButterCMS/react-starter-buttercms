import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import ScrollToTop from "../containers/ScrollToTop"

const Layout = ({ children, menuItems }) => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('.page-scroll');
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      for (let i = 0; i < sections.length; i++) {
        const currLink = sections[i];
        const currLinkHref = currLink.getAttribute('href');
        const val = currLinkHref.replace("/", "");
        const refElement = document.querySelector(val);
        const scrollTopMinus = scrollPos + 73;

        if (refElement && refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
          setActiveLink(currLinkHref)
        }
      }
    };

    window.document.addEventListener('scroll', onScroll, { passive: true });

    return () => window.document.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Function to scroll to an element by ID with multiple attempts
    const scrollToElement = (elementId) => {
      if (!elementId) return false;
      
      // Try up to 5 times with increasing delays
      let attempts = 0;
      const maxAttempts = 5;
      
      const attemptScroll = () => {
        attempts++;
        const element = document.getElementById(elementId);
        
        if (element) {
          // Calculate position with offset for header
          const yOffset = -70;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          // Scroll to the element
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
          
          // Update active link
          setActiveLink(`#${elementId}`);

          return true;
        } else if (attempts < maxAttempts) {
          // Try again with increasing delay
          setTimeout(attemptScroll, attempts * 200);

          return false;
        }
        
        return false;
      };
      
      return attemptScroll();
    };
    
    // Handle scrolling with a timeout to ensure elements are loaded
    setTimeout(() => {
      // Priority 1: Check for window.__scrollToTarget (from blog navigation)
      if (window.__scrollToTarget) {
        const targetId = window.__scrollToTarget;
        // Clear the flag
        window.__scrollToTarget = null;
        scrollToElement(targetId);
      }
      // Priority 2: Check for hash in URL
      else if (location.hash) {
        const targetId = location.hash.slice(1);
        scrollToElement(targetId);
      } 
      // Default: Scroll to top
      else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, 500);
    // Bootstrap supports smooth scrolling to element
    // It is only necessary to provide for possible scrolling when user enter the page from a link
  }, [])

  return (
    <>
      <Header menuItems={menuItems} activeLink={activeLink} />

      {children}

      <ScrollToTop />

      <Footer menuItems={menuItems} activeLink={activeLink} />
    </>
  )
}

export default Layout;
