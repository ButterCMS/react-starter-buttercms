/**
 * Utility file to initialize sliders with ES modules (for Vite)
 */

// Import tiny-slider properly for ES modules
import { tns } from 'tiny-slider';

export const initializeTestimonialSlider = () => {
  if (typeof window !== 'undefined') {
    try {
      // Look for testimonial sliders on the page
      const testimonialSliders = document.querySelectorAll('.testimonial-active');
      
      // Initialize each slider found
      testimonialSliders.forEach((slider) => {
        // Check if slider already has a tiny-slider instance
        if (slider && !slider.classList.contains('tns-slider')) {
          try {
            // Verify we have testimonials
            const testimonials = slider.querySelectorAll('.single-testimonial');
            if (testimonials.length > 0) {
              // Initialize the slider
              tns({
                container: slider,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayButtonOutput: false,
                mouseDrag: true,
                gutter: 0,
                nav: false,
                navPosition: "bottom",
                controls: true,
                controlsText: [
                  '<i class="lni lni-chevron-left"></i>',
                  '<i class="lni lni-chevron-right"></i>',
                ],
                items: 1,
                slideBy: 'page',
                mode: 'carousel',
                arrowKeys: true,
              });
            }
          } catch (sliderError) {
            console.error('Error initializing slider:', sliderError);
          }
        }
      });
    } catch (error) {
      console.error('Error initializing testimonial slider:', error);
    }
  }
};
