"use client"

import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import { gsap, ScrollTrigger, Observer } from "common/utils/gsap"

import Container from "@/components/Container/Container"
import ProjectSlide from "../ProjectSlide/ProjectSlide"

import "./ProjectsSlider.scss"

function ProjectsSlider({ projects }) {
  const slidesLength = projects.length
  const el = useRef(null)
  const observer = useRef(null)
  const slideEls = useRef([])

  const [slides, setSlides] = useState(projects)
  const [currSlideIndex, setCurrSlideIndex] = useState(0)
  const [scrollDir, setScrollDir] = useState("scrolling down")

  useEffect(() => {
    // const threshold = 0
    // let lastScrollY = window.scrollY
    // let ticking = false

    const q = gsap.utils.selector(el.current)
    const currentSlide = q(".projects-slide.active")

    console.log(slideEls)

    const animateOut = () => {}

    const animateIn = () => {}

    const previous = () => {
      gsap.to()
    }

    const next = () => {
      // console.log("next")
      // gsap.to(pro);
    }

    observer.current = new Observer({
      target: window, // can be any element (selector text is fine)
      type: "wheel,touch", // comma-delimited list of what to listen for
      onUp: () => () => previous(),
      onDown: () => next(),
    })

    // const updateScrollDir = () => {
    //   const scrollY = window.scrollY

    //   if (Math.abs(scrollY - lastScrollY) < threshold) {
    //     ticking = false
    //     return
    //   }
    //   setScrollDir(scrollY > lastScrollY ? 1 : -1)
    //   lastScrollY = scrollY > 0 ? scrollY : 0
    //   ticking = false
    // }

    // const onScroll = () => {
    //   if (!ticking) {
    //     window.requestAnimationFrame(updateScrollDir)
    //     ticking = true
    //   }
    // }

    // window.addEventListener("scroll", onScroll)

    // console.log(scrollDir)

    // return () => window.removeEventListener("scroll", onScroll)
  }, [slides.length, currSlideIndex])

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const q = gsap.utils.selector(el.current)
      const container = q(".pin")

      const totalWidth = el.current.getBoundingClientRect().width
      console.log(totalWidth)

      // get current slide and animate it
      // if (isCurrentSlide) {
      //   gsap.to(elRef.current, {
      //     left: "0",
      //   })
      // } else {
      //   gsap.to(elRef.current, {
      //     left: "100%",
      //   })
      // }

      gsap.to(container, {
        scrollTrigger: {
          trigger: el.current,
          pin: el.current,
          end: `+=${totalWidth}`,
        },
      })
    }, [el])
    return () => ctx.revert() // cleanup
  }, [slidesLength])

  return (
    <section className="projects-slider" ref={el}>
      <div className="projects-slider__slider">
        {projects.map((project, i) => {
          const getRef = (el) => slideEls.current.push(el)
          return <ProjectSlide key={i} {...project} innerRef={getRef} />
        })}
      </div>
    </section>
  )
}

export default ProjectsSlider
