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

import Container from "@/components/Container/Container"
import ProjectsListRow from "@/components/Projects/ProjectsListsRow/ProjectsListRow"
import useMousePosition from "@/hooks/useMousePosition"

import "./ProjectsList.scss"

function ProjectsList({ projects }) {
  const wrapperRef = useRef(null)
  const imageRef = useRef(null)
  const itemBgRef = useRef(null)
  const listItemsRefs = useRef([])
  const mousePosition = useMousePosition()
  const [currentImageData, setCurrentImageData] = useState(projects[0]?.image)
  // const [currentHoveredProject, setCurrentHoveredProject] = useState(null)

  useEffect(() => {
    const moveImage = () => {
      if (!(mousePosition.x && mousePosition.y)) return

      gsap.to(imageRef.current, {
        top: mousePosition.y,
        left: `calc(${mousePosition.x}px + 3vw)`,
      })
    }
    moveImage()
  }, [mousePosition])

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(wrapperRef.current)
      const rowsContainer = q(".projects-list__rows")

      let lastHoveredProject = null
      let currentHoveredProject = null

      const hideMouseHovers = () => {
        currentHoveredProject = null

        gsap.to([imageRef.current, itemBgRef.current], {
          opacity: 0,
        })
      }

      const showMouseHovers = () => {
        console.log("show mouse hovers")
        gsap.to([imageRef.current, itemBgRef.current], {
          opacity: 1,
        })
      }

      wrapperRef.current.addEventListener("mouseenter", showMouseHovers)
      wrapperRef.current.addEventListener("mouseleave", hideMouseHovers)

      const setupImage = () => {
        gsap.set(imageRef.current, { y: "-50%" })
      }
      setupImage()

      const setupHoveredImageBg = () => {
        listItemsRefs.current.forEach((item) => {
          const onMouseHover = (e) => {
            lastHoveredProject = currentHoveredProject
            currentHoveredProject = item
            const c = gsap.utils.selector(e.target)

            gsap
              .timeline()
              .to(c(".projects-list-row__bg"), {
                height: "100%",
                duration: 0.3,
                ease: "power2.out",
              })
              .to(
                c(".projects-list-row__cell"),
                {
                  color: "#070707",
                  duration: 0.5,
                },
                "- 3"
              )
              .to(c(".projects-list-row__tech > span"), {
                borderColor: "#070707",
              })
          }
          const onMouseOut = (e) => {
            const c = gsap.utils.selector(e.target)

            gsap
              .timeline()
              .to(c(".projects-list-row__bg"), {
                height: "0",
                duration: 0.3,
                ease: "power2.out",
              })
              .to(c(".projects-list-row__cell"), {
                color: "#ffe8ec",
                duration: 0.5,
              })
              .to(c(".projects-list-row__tech > span"), {
                borderColor: "#ffe8ec",
              })
          }

          item.addEventListener("mouseenter", onMouseHover)
          item.addEventListener("mouseleave", onMouseOut)
        })
      }
      setupHoveredImageBg()
    }, [imageRef, wrapperRef, listItemsRefs])
    return () => ctx.revert() // cleanup
  }, [])

  return (
    <section className="projects-list" ref={wrapperRef}>
      <Container>
        <div className="projects-list__image-wrapper">
          <Image
            className="projects-list__image"
            src={currentImageData?.src}
            alt={currentImageData?.alt}
            fill={true}
            ref={imageRef}
            sizes={""}
          ></Image>
        </div>
        <h2 className="projects-list__title">Références</h2>
        <div className="projects-list__row projects-list__row--header">
          <span>Client</span>
          <span>Type</span>
          <span></span>
          <span>Tech</span>
          <span>By</span>
          <span>Year</span>
        </div>
        <div className="projects-list__rows">
          <div className="projects-list__item-hover-bg" ref={itemBgRef}></div>

          {projects.map((project, i) => (
            <ProjectsListRow
              ref={(el) => (listItemsRefs.current[i] = el)}
              className="projects-list__row"
              key={i}
              {...project}
              setCurrentImageData={setCurrentImageData}
            ></ProjectsListRow>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProjectsList
