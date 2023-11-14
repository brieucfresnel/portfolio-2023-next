"use client"
import React from "react"
import "./Navbar.scss"
import Container from "@/components/Container/Container"
import { useLenis } from "../LenisScroller"

export default function Navbar() {
  const lenis = useLenis()

  return (
    <div className="navbar">
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
