import React from "react"
import Container from "../Container/Container"
import "./Footer.scss"

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__main">
          <div className="footer__text">Vous cherchez un développeur ?</div>
          <a className="footer__link" href="mailto:fresnel.brieuc@gmail.com">
            fresnel.brieuc@gmail.com
          </a>
        </div>
        <div className="footer__bot">
          <div className="footer__copyright"></div>
        </div>
      </Container>
    </footer>
  )
}
