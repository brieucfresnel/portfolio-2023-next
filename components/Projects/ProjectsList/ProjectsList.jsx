"use client"

import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import { gsap } from "common/utils/gsap"

import Container from "@/components/Container/Container"
import ProjectsListRow from "@/components/Projects/ProjectsListsRow/ProjectsListRow"
import useMousePosition from "@/hooks/useMousePosition"

import "./ProjectsList.scss"

function ProjectsList({ projects }) {
  const wrapperRef = useRef(null)
  const imageRef = useRef(null)
  const mousePosition = useMousePosition()
  const [currentImageData, setCurrentImageData] = useState(projects[0]?.image)

  useEffect(() => {
    const moveImage = () => {
      if (!(mousePosition.x && mousePosition.y)) return
      gsap.to(imageRef.current, {
        top: mousePosition.y,
        left: `calc(${mousePosition.x}px + 3vw)`,
      })
    }
    moveImage()
  }, [mousePosition])

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(imageRef.current, { y: "-50%" })

      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 30%",
            toggleActions: "play reverse play reverse",
            // markers: true
          },
        }
      )
    }, [imageRef, wrapperRef])
    return () => ctx.revert() // cleanup
  }, [])

  return (
    <section className="projects-list" ref={wrapperRef}>
      <Container>
        <div className="projects-list__image-wrapper">
          <Image
            className="projects-list__image"
            src={currentImageData?.src}
            alt={currentImageData?.alt}
            fill={true}
            ref={imageRef}
            sizes={""}
          ></Image>
        </div>
        <h2 className="projects-list__title">Références</h2>

        <div className="projects-list__rows">
          <div className="projects-list__row projects-list__row--header">
            <span>Client</span>
            <span>Type</span>
            <span></span>
            <span>Tech</span>
            <span>By</span>
            <span>Year</span>
          </div>

          {projects.sort().map((project, i) => (
            <ProjectsListRow
              className="projects-list__row"
              key={i}
              {...project}
              setCurrentImageData={setCurrentImageData}
            ></ProjectsListRow>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProjectsList
