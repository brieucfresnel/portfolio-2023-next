"use client"
import React, { useRef, useLayoutEffect } from "react"
import "./Navbar.scss"
import Container from "@/components/Container/Container"
import { useLenis } from "../LenisScroller"
import { gsap } from "@/common/utils/gsap"

export default function Navbar() {
  const ref = useRef(null)
  const lenis = useLenis()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: "0",
      })
    })

    return () => ctx.revert() // cleanup
  }, [])

  return (
    <div className="navbar" ref={ref}>
      <Container>
        <a className="navbar__brand" href="/">
          Brieuc
        </a>
        <div className="navbar__menu">
          <a
            className="navbar__link"
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              lenis.scrollTo("#contact")
            }}
          >
            Contact
          </a>
        </div>
      </Container>
    </div>
  )
}
