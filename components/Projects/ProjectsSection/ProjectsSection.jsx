'use client';

import React, { useRef, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Container from '@/components/Container/Container';
import Pill from '@/components/Pill/Pill';

import './ProjectsSection.scss';

function ProjectsSection({ projects }) {
  gsap.registerPlugin(ScrollTrigger);

  const el = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProject, setCurrentProject] = useState(projects[currentIndex]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(el.current);
      const container = q('.container')

      gsap.to(container, {
        scrollTrigger: {
          // start: "top top",
          // end: "bottom bottom",
          pin: el.current,
          markers: true
        }
      })

    }, [el]);
    return () => ctx.revert(); // cleanup
  }, [])

  return (
    <section className="projects-section" ref={el}>
      {currentProject &&
        (
          <Container>
            <div className="projects-section__inner">
              <div className="projects-section__header">
                <div>
                  <h3 className="projects-section__title">{currentProject.title}</h3>
                  <div className="projects-section__type">{currentProject.type}</div>
                </div>
                <div className="projects-section__team">
                  {currentProject.year} - {currentProject.team}
                </div>
              </div>
              <a href={currentProject.link} className="projects-section__image-wrapper" target="_blank">
                <Image src={currentProject.image.src} alt={currentProject.image.alt} fill></Image>
              </a>
              <div className="projects-section__footer">
                <div className="projects-section__tech">
                  {currentProject.tech.map((label, i) => <Pill key={i} label={label} bgColor={'dark'}></Pill>)}
                </div>
                <a className="projects-section__link" href={currentProject.link} target="_blank">{currentProject.link}</a>
              </div>

            </div>
          </Container>
        )
      }
    </section>
  )
}

export default ProjectsSection