import React from "react"
import Image from "next/image"
import Container from "../Container/Container"
import "./Footer.scss"
import chevronUp from "@/assets/icons/chevron-up.svg"

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__copyright">
          © Brieuc Fresnel {new Date().getFullYear()}
        </div>
        <Image
          className="footer__scrolltop"
          src={chevronUp}
          width={16}
          height={16}
          alt=""
        />
      </Container>
    </footer>
  )
}
