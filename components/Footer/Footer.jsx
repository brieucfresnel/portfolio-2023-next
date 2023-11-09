import React from "react"
import Container from "../Container/Container"
import "./Footer.scss"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <Container>
          <div className="footer__text">Vous cherchez un développeur ?</div>
          <a className="footer__link" href="mailto:fresnel.brieuc@gmail.com">
            fresnel.brieuc@gmail.com
          </a>
        </Container>
      </div>

      <div className="footer__bot">
        <Container>
          <div className="footer__copyright">
            © Brieuc Fresnel {new Date().getFullYear()}
          </div>
          <div className="footer__back-to-top back-to-top"></div>
        </Container>
      </div>
    </footer>
  )
}
