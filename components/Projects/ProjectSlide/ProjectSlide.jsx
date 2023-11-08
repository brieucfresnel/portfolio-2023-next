import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Container from "@/components/Container/Container"
import cn from "classnames"
import { gsap } from "common/utils/gsap"
import Pill from "@/components/Pill/Pill"
import "./ProjectsSlide.scss"

export default function ProjectSlide({
  title,
  type,
  year,
  team,
  image,
  tech,
  link,
  isActive,
  innerRef,
}) {
  const [isCurrentSlide, setIsCurrentSlide] = useState(isActive)

  useEffect(() => {}, [isCurrentSlide])

  return (
    <div className={cn("projects-slide")} ref={innerRef}>
      <Container>
        <div className="projects-slide__header">
          <div>
            <h3 className="projects-slide__title">{title}</h3>
            <div className="projects-slide__type">{type}</div>
          </div>
          <div className="projects-slide__team">
            {team} - {year}
          </div>
        </div>
        <a href={link} className="projects-slide__image-link" target="_blank">
          <div className="projects-slide__image-wrapper">
            <Image src={image.src} alt={image.alt} fill></Image>
          </div>
        </a>
        <div className="projects-slide__footer">
          <div className="projects-slide__tech">
            {tech.map((label, i) => (
              <Pill key={i} label={label} bgColor={"dark"}></Pill>
            ))}
          </div>
          <a className="projects-slide__link" href={link} target="_blank">
            {link}
          </a>
        </div>
      </Container>
    </div>
  )
}
