'use client';

import React, { useRef, forwardRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Container from '@/components/Container/Container';
import ProjectSlide from '../ProjectSlide/ProjectSlide';

import './ProjectsSlider.scss';

function ProjectsSlider({ projects }) {
  gsap.registerPlugin(ScrollTrigger);


  const slidesLength = projects.length;
  const [slidesRefs, setSlidesRefs] = useState([]);
  const [currSlideIndex, setCurrSlideIndex] = useState(0);

  const el = useRef(null);

  // useEffect(() => {
  //   // add or remove refs
  //   setElRefs((slidesRefs) =>
  //     Array(slidesLength)
  //       .fill()
  //       .map((_, i) => slidesRefs[i] || createRef()),
  //   );
  // }, [slidesLength]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(el.current)
      const container = q('.container');

      gsap.to(el.current, {
        scrollTrigger: {
          trigger: el.current,
          pin: container
        }
      })

    }, [el]);
    return () => ctx.revert(); // cleanup
  }, [])

  return (
    <section className="projects-section" ref={el}>
      <Container>
        <div className="projects-section__slider">
          {projects.map((project, i) => <ProjectSlide isActive={currSlideIndex === i} key={i} {...project} />)}
        </div>

      </Container>
    </section>
  )
}

export default ProjectsSlider