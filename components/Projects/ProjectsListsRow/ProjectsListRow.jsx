import React, { useRef, useLayoutEffect } from "react"
import { gsap } from "common/utils/gsap"
import cn from "classnames"
import { useMediaQuery } from "@/common/utils/media-queries"

import "./ProjectsListRow.scss"

export default function ProjectsListRow({
  title,
  team,
  type,
  tech,
  year,
  className,
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const setupHoverEffect = () => {
        const c = gsap.utils.selector(ref.current)
        const bg = c(".projects-list-row__bg")
        const cells = c(".projects-list-row__cell")
        const techItems = c(".projects-list-row__tech > span")

        let animation = null
        let isHovering = false

        const clrBorderLight = "#393435"
        const clrDark = "#070707"
        const clrLight = "#ffe8ec"

        const onMouseEnter = (e) => {
          isHovering = true

          if (!animation) {
            animation = gsap
              .timeline({
                onComplete: () => {
                  animation = null
                  if (!isHovering) {
                    onMouseLeave()
                  }
                },
              })
              .add("background")
              .to(bg, {
                height: "100%",
                duration: 0.3,
                ease: "power2.out",
              })
              .to(ref.current, {
                borderColor: clrLight,
              })
              .to(
                cells,
                {
                  color: clrDark,
                  duration: 0.3,
                },
                "background"
              )
              .to(
                techItems,
                {
                  borderColor: clrDark,
                  color: clrDark,
                },
                "background"
              )
          }
        }

        const onMouseLeave = (e) => {
          isHovering = false

          if (!animation) {
            animation = gsap
              .timeline({
                onComplete: () => {
                  animation = null
                  if (isHovering) {
                    onMouseEnter()
                  }
                },
              })
              .add("background")
              .to(bg, {
                height: "0",
                duration: 0.3,
                ease: "power2.out",
              })
              .to(ref.current, {
                borderColor: clrBorderLight,
              })
              .to(
                cells,
                {
                  color: clrLight,
                  duration: 0.3,
                },
                "background"
              )
              .to(
                techItems,
                {
                  color: clrLight,
                  borderColor: clrLight,
                },
                "background"
              )
          }
        }

        const addListeners = () => {
          ref.current.addEventListener("mouseleave", onMouseLeave)
          ref.current.addEventListener("mouseenter", onMouseEnter)
        }

        const removeListeners = () => {
          ref.current.removeEventListener("mouseleave", onMouseLeave)
          ref.current.removeEventListener("mouseenter", onMouseEnter)
        }

        addListeners()
      }
      setupHoverEffect()
    }, ref)
    return () => ctx.revert() // cleanup
  }, [])

  return (
    <a href="/" ref={ref} className={cn(className, "projects-list-row")}>
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
}
