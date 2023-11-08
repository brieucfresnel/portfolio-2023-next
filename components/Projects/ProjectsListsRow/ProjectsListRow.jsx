import React, { useRef, useLayoutEffect } from "react"
import { gsap } from "common/utils/gsap"
import Container from "@/components/Container/Container"

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
      className="projects-list-row"
      onMouseOver={() => setCurrentImageData(image)}
    >
      <div className="projects-list-row__main">
        <h3 className="projects-list-row__title">{title}</h3>
        <span className="projects-list-row__type">{type}</span>
      </div>
      <div className="projects-list-row__aside">
        <span className="projects-list-row__tech">{tech.join(" / ")}</span>
        <span className="projects-list-row__team">{team}</span>
        <span className="projects-list-row__year">{year}</span>
      </div>
    </a>
  )
}

export default ProjectsListRow
