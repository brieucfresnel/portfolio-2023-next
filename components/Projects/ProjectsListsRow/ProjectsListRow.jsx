import React, { useRef, useLayoutEffect, useCallback } from "react"
import Image from "next/image"
import { gsap } from "common/utils/gsap"
import cn from "classnames"
import { useMediaQuery } from "@/common/utils/media-queries"
import cornerDownLeft from "@/assets/icons/corner-down-left.svg"
import cornerDownRight from "@/assets/icons/corner-down-right.svg"

import "./ProjectsListRow.scss"

export default function ProjectsListRow({
  title,
  team,
  type,
  tech,
  year,
  link,
  className,
}) {
  const ref = useRef(null)

  const isDesktopScreen = useMediaQuery("md")

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const c = gsap.utils.selector(ref.current)

      let animation = null
      let isHovering = false

      const clrBorderLight = "#393435"
      const clrDark = "#070707"
      const clrLight = "#ffe8ec"

      const setupHoverEffect = () => {
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
              .add("main")
              .to(ref.current, {
                boxShadow:
                  "0px 1px 0 0 #ffe8ec inset, 0px -1px 0 0 #ffe8ec inset",
              })
              .to(
                c(".projects-list-row__title, .projects-list-row__type"),
                {
                  x: "50px",
                  duration: 0.3,
                },
                "main"
              )
              .to(
                c(".projects-list-row__icon--left"),
                {
                  x: "15px",
                  yPercent: -50,
                  duration: 0.3,
                  opacity: 1,
                },
                "main"
              )
            // .to(
            //   c(".projects-list-row__icon--right"),
            //   { x: 0, yPercent: -50, opacity: 1 },
            //   "main"
            // )
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
              .add("main")
              .to(ref.current, {
                boxShadow:
                  "0px 1px 0 0 #393435 inset, 0px -1px 0 0 #393435 inset",
              })
              .to(
                c(".projects-list-row__title, .projects-list-row__type"),
                {
                  x: 0,
                },
                "main"
              )
              .to(
                c(".projects-list-row__icon--left"),
                {
                  x: "-100%",
                  opacity: 0,
                },
                "main"
              )
            // .to(
            //   c(".projects-list-row__icon--right"),

            //   { x: "100%", y: "-50%", opacity: 0 },
            //   "main"
            // )
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

        if (isDesktopScreen) {
          addListeners()
        } else {
          removeListeners()
        }
      }
      setupHoverEffect()
    }, ref)
    return () => ctx.revert() // cleanup
  }, [isDesktopScreen])

  return (
    <a
      href={link ? link : "#"}
      target={link ? "_blank" : ""}
      ref={ref}
      className={cn(
        className,
        "projects-list-row",
        link ? "projects-list-row--has-link" : ""
      )}
    >
      <Image
        className="projects-list-row__icon projects-list-row__icon--left"
        src={cornerDownRight}
        width={24}
        height={24}
        alt=""
      />
      <div className="projects-list-row__content">
        <div className="projects-list-row__main">
          <h3 className="projects-list-row__cell projects-list-row__title">
            {title}
          </h3>
          <span className="projects-list-row__cell projects-list-row__type">
            {type}
          </span>
        </div>
        <div className="projects-list-row__aside">
          <span className="projects-list-row__cell projects-list-row__team">
            {team}
          </span>
          <span className="projects-list-row__cell projects-list-row__year">
            {year}
          </span>
          <span className="projects-list-row__cell projects-list-row__tech">
            {tech.map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </span>
        </div>
      </div>
      {/* <Image
        className="projects-list-row__icon projects-list-row__icon--right"
        src={cornerDownLeft}
        width={24}
        height={24}
        alt=""
      /> */}
    </a>
  )
}
