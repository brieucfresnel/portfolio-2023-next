import React from "react"
import Container from "@/components/Container/Container"
import "./Contact.scss"
import IconGithub from "../Icons/IconGithub"
import IconLinkedin from "../Icons/IconLinkedin"

function Contact() {
  return (
    <div id="contact" className="contact">
      <Container>
        <div className="contact__main">
          <div className="contact__tag">Open to work</div>
          <a className="contact__email" href="mailto:fresnel.brieuc@gmail.com">
            fresnel.brieuc@gmail.com
          </a>
          <div className="contact__socials">
            <a
              href="https://github.com/brieucfresnel"
              target="_blank"
              className="contact__social"
            >
              <IconGithub />
            </a>
            <a
              href="https://linkedin.com/in/brieuc-fresnel"
              target="_blank"
              className="contact__social"
            >
              <IconLinkedin />
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Contact
