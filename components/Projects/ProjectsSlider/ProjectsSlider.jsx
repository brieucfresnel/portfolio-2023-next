'use client';

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Container from '@/components/Container/Container';
import Pill from '@/components/Pill/Pill';

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
        <div className="projects-section__slides">
          <div className="projects-section__inner">
            <div className="projects-section__header">
              <div>
                <h3 className="projects-section__title">{projects[0].title}</h3>
                <div className="projects-section__type">{projects[0].type}</div>
              </div>
              <div className="projects-section__team">
                {projects[0].year} - {projects[0].team}
              </div>
            </div>
            <a href={projects[0].link} className="projects-section__image-wrapper" target="_blank">
              <Image src={projects[0].image.src} alt={projects[0].image.alt} fill></Image>
            </a>
            <div className="projects-section__footer">
              <div className="projects-section__tech">
                {projects[0].tech.map((label, i) => <Pill key={i} label={label} bgColor={'dark'}></Pill>)}
              </div>
              <a className="projects-section__link" href={projects[0].link} target="_blank">{projects[0].link}</a>
            </div>
          </div>
        </div>

      </Container>
    </section>
  )
}

export default ProjectsSlider