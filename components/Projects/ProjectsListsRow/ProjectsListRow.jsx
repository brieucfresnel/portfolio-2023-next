import React, { useRef, useLayoutEffect } from "react"
import { gsap } from "common/utils/gsap"
import cn from "classnames"

import "./ProjectsListRow.scss"

function ProjectsListRow({
  id,
  title,
  team,
  type,
  tech,
  image,
  year,
  setCurrentImageData,
  className,
}) {
  const el = useRef(null)
  const tl = useRef(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(el.current)
      // const text = new SplitType(q('.projects-list-row__title'));
      const title = q("a")
    }, [el, tl])

    return () => ctx.revert() // cleanup
  }, [])

  return (
    <a
      href="/"
      ref={el}
      className={cn(className, "projects-list-row")}
      onMouseOver={() => setCurrentImageData(image)}
    >
      <h3 className="projects-list-row__title">{title}</h3>
      <span className="projects-list-row__type">{type}</span>
      <span></span>
      <span className="projects-list-row__tech">
        {tech.map((tech, i) => (
          <span key={i}>{tech}</span>
        ))}
      </span>
      <span className="projects-list-row__team">{team}</span>
      <span className="projects-list-row__year">{year}</span>
    </a>
  )
}

export default ProjectsListRow
