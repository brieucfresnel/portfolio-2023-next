import React, { useRef, forwardRef, useEffect, useLayoutEffect } from "react"
import { gsap } from "common/utils/gsap"
import cn from "classnames"

import "./ProjectsListRow.scss"

export default forwardRef(function ProjectsListRow(
  { id, title, team, type, tech, image, year, setCurrentImageData, className },
  ref
) {
  const tl = useRef(null)

  return (
    <a
      href="/"
      ref={ref}
      className={cn(className, "projects-list-row")}
      onMouseOver={() => setCurrentImageData(image)}
    >
      <div className="projects-list-row__bg"></div>
      <div className="projects-list-row__content">
        <h3 className="projects-list-row__cell projects-list-row__title">
          {title}
        </h3>
        <span className="projects-list-row__cell projects-list-row__type">
          {type}
        </span>
        <span className="projects-list-row__cell"></span>
        <span className="projects-list-row__cell projects-list-row__tech">
          {tech.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </span>
        <span className="projects-list-row__cell projects-list-row__team">
          {team}
        </span>
        <span className="projects-list-row__cell projects-list-row__year">
          {year}
        </span>
      </div>
      <div className="projects-list-row__border"></div>
    </a>
  )
})
