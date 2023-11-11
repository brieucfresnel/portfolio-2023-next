import React from "react"
import "./Navbar.scss"
import Container from "@/components/Container/Container"

export default function Navbar() {
  return (
    <div className="navbar">
      <Container>
        <a className="navbar__brand" href="/">
          Brieuc
        </a>
        <div className="navbar__menu">
          <a className="navbar__link" href="mailto:fresnel.brieuc@gmail.com">
            Contact
          </a>
        </div>
      </Container>
    </div>
  )
}
