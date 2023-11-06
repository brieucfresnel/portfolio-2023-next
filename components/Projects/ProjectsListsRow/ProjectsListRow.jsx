
import React, { useRef, useLayoutEffect } from 'react'
import gsap from "gsap";
import SplitType from 'split-type'
import Container from '@/components/Container/Container'

import './ProjectsListRow.scss'

function ProjectsListRow({ id, title, team, type, tech, image, year, setCurrentImageData }) {
  const el = useRef(null);
  const tl = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(el.current);
      // const text = new SplitType(q('.projects-list-row__title'));
      const title = q('a');

    }, [el, tl])

    return () => ctx.revert(); // cleanup
  }, [])

  return (
    <div ref={el} className="projects-list-row" onMouseOver={() => setCurrentImageData(image)}>
      <Container>
        <a href="/">
          <h3 className="projects-list-row__title">{title}</h3>
          <span>{type}</span>
          <div className="projects-list-row__tech">{tech.join(' / ')}</div>
        </a>
      </Container>
    </div>
  )
}

export default ProjectsListRow