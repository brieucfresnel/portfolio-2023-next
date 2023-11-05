'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Container from '@/components/Container/Container';
import ProjectsListRow from '@/components/Projects/ProjectsListsRow/ProjectsListRow';
import useMousePosition from '@/hooks/useMousePosition';

import './ProjectsList.scss';


function ProjectsList({ projects }) {
  gsap.registerPlugin(ScrollTrigger);

  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  const mousePosition = useMousePosition();

  const [currentImage, setCurrentImage] = useState(projects[0]?.image);

  useEffect(() => {
    const moveImage = () => {
      if (!(mousePosition.x && mousePosition.y)) return;

      gsap.to(imageRef.current, {
        left: mousePosition.x,
        top: mousePosition.y
      });
    }
    moveImage();
  }, [mousePosition])

  useLayoutEffect(() => {
    if (!window.matchMedia('').matches) {

    }
    let ctx = gsap.context(() => {
      // Translate image
      gsap.set(imageRef.current, { y: "-50%" });

      // Set triggers
      gsap.fromTo(imageRef.current, {
        opacity: 0
      }, {
        opacity: 0.85,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 50%",
          toggleActions: "play reverse play reverse",
          markers: true
        }
      })
    }, [imageRef, wrapperRef]);
    return () => ctx.revert(); // cleanup
  }, [])

  return (
    <section className="projects-list" ref={wrapperRef}>
      <Container>
        <div className="projects-list__image-wrapper">
          <Image className="projects-list__image" src={currentImage?.src} alt={currentImage?.alt} fill={true} ref={imageRef} sizes={''}></Image>
        </div>
        <h2 className="projects-list__title">Références</h2>
        {projects.map((project, i) => <ProjectsListRow key={i} {...project} setCurrentImage={setCurrentImage}></ProjectsListRow>)}
      </Container>
    </section>
  )
}

export default ProjectsList