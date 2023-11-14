"use client"

import React, { useRef } from "react"

import Container from "@/components/Container/Container"
import ProjectsListRow from "@/components/Projects/ProjectsListsRow/ProjectsListRow"

import "./ProjectsList.scss"

function ProjectsList({ projects }) {
  const wrapperRef = useRef(null)

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
