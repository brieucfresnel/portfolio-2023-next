
import React, { useEffect } from 'react'
import './ProjectsListRow.scss'

function ProjectsListRow({ id, title, team, type, tech, image, setCurrentImage }) {
  return (
    <div className="projects-list-row" onMouseOver={() => setCurrentImage(image)}>
      <a href="/"><h3 className="projects-list-row__title">{title}</h3></a>
      <div className="projects-list-row__tech">{tech.join(' / ')}</div>
    </div>
  )
}

export default ProjectsListRow