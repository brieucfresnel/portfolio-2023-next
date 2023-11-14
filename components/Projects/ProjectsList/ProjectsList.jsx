"use client"

import React, { useLayoutEffect, useRef } from "react"

import Container from "@/components/Container/Container"
import ProjectsListRow from "@/components/Projects/ProjectsListsRow/ProjectsListRow"

import { gsap } from "@/common/utils/gsap"

import "./ProjectsList.scss"

function ProjectsList({ projects }) {
  const wrapperRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(wrapperRef.current)

      gsap.to(q(".projects-list-row"), {
        stagger: 0.1,
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 70%",
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="projects-list" ref={wrapperRef}>
      <Container>
        <h2 className={`projects-list__title`}>Références</h2>
        <div className="projects-list__rows">
          {projects.map((project, i) => (
            <ProjectsListRow
              className="projects-list__row"
              key={i}
              {...project}
            ></ProjectsListRow>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProjectsList
