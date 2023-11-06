'use client';

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Container from '@/components/Container/Container';
import Pill from '@/components/Pill/Pill';
import ProjectSlide from '../ProjectSlide/ProjectSlide';

import './ProjectsSlider.scss';

function ProjectsSlider({ projects }) {
  gsap.registerPlugin(ScrollTrigger);

  const el = useRef(null);

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
          {projects.map((project, i) => <ProjectSlide {...project} key={i} />)}
        </div>

      </Container>
    </section>
  )
}

export default ProjectsSlider