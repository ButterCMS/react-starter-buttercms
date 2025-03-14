import React, { useEffect } from "react"
import Testimonial from "./Testimonial"
import { tns } from "tiny-slider"

const TestimonialSection = (props) => {

  useEffect(() => {
    if (typeof window !== "undefined" && typeof tns === 'function') {
      try {
        tns({
          container: '.testimonial-active',
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
        });
      } catch (err) {
        console.error("Error initializing slider:", err);
      }
    }
  }, []);

  return (
    <section id={props.fields.scroll_anchor_id} className="testimonial-section mt-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div className="testimonial-active-wrapper">

              <div className="section-title text-center">
                <h2 className="mb-20">{props.fields.headline}</h2>
              </div>

              <div className="testimonial-active">
                {props.fields.testimonial.map(testimonial => <Testimonial key={testimonial.title} {...testimonial} />)}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection;
