"use client"

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react"
import Image from "next/image"
import { gsap, ScrollTrigger } from "common/utils/gsap"
import { chivo } from "@/common/utils/fonts"

import Container from "@/components/Container/Container"
import ProjectsListRow from "@/components/Projects/ProjectsListsRow/ProjectsListRow"
import useMousePosition from "@/hooks/useMousePosition"

import "./ProjectsList.scss"

function ProjectsList({ projects }) {
  const wrapperRef = useRef(null)
  const itemBgRef = useRef(null)
  const listItemsRefs = useRef([])
  const mousePosition = useMousePosition()

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let currentHoveredProject = null

      const hideMouseHovers = () => {
        currentHoveredProject = null

        gsap.to(itemBgRef.current, {
          opacity: 0,
        })
      }
      wrapperRef.current.addEventListener("mouseleave", hideMouseHovers)

      const showMouseHovers = () => {
        gsap.to(itemBgRef.current, {
          opacity: 1,
        })
      }
      wrapperRef.current.addEventListener("mouseenter", showMouseHovers)

      const setupHoveredImageBg = () => {
        listItemsRefs.current.forEach((item) => {
          const c = gsap.utils.selector(item)
          let animation = null
          let isHovering = false

          const clrBorderLight = "#393435"
          const clrDark = "#070707"
          const clrLight = "#ffe8ec"
          const clrBgLight = ""

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
                .to(c(".projects-list-row__bg"), {
                  height: "100%",
                  duration: 0.3,
                  ease: "power2.out",
                })
                .to(item, {
                  borderColor: clrLight,
                })
                .to(
                  c(".projects-list-row__cell"),
                  {
                    color: clrDark,
                    duration: 0.3,
                  },
                  "background"
                )
                .to(
                  c(".projects-list-row__tech > span"),
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
                .to(c(".projects-list-row__bg"), {
                  height: "0",
                  duration: 0.3,
                  ease: "power2.out",
                })
                .to(item, {
                  borderColor: clrBorderLight,
                })
                .to(
                  c(".projects-list-row__cell"),
                  {
                    color: clrLight,
                    duration: 0.3,
                  },
                  "background"
                )
                .to(
                  c(".projects-list-row__tech > span"),
                  {
                    color: clrLight,
                    borderColor: clrLight,
                  },
                  "background"
                )
                .to(c(".projects-list-row__title"), {}, "background")
            }
          }

          item.addEventListener("mouseenter", onMouseEnter)
          item.addEventListener("mouseleave", onMouseLeave)
        })
      }
      setupHoveredImageBg()
    }, [wrapperRef, listItemsRefs])
    return () => ctx.revert() // cleanup
  }, [])

  return (
    <section className="projects-list" ref={wrapperRef}>
      <Container>
        <h2 className={`projects-list__title`}>Références</h2>
        <div className="projects-list__rows">
          <div className="projects-list__item-hover-bg" ref={itemBgRef}></div>
          {projects.map((project, i) => (
            <ProjectsListRow
              ref={(el) => (listItemsRefs.current[i] = el)}
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
