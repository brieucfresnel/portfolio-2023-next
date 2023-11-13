import React from "react"
import Image from "next/image"
import Container from "@/components/Container/Container"
import "./Contact.scss"
import iconGithub from "@/assets/icons/github.svg"
import iconLinkedin from "@/assets/icons/linkedin.svg"

function Contact() {
  return (
    <div className="contact">
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
              <Image
                src={iconGithub}
                width={14}
                height={15}
                alt="GitHub"
              ></Image>
            </a>
            <a
              href="https://linkedin.com/in/brieuc-fresnel"
              target="_blank"
              className="contact__social"
            >
              <Image
                src={iconLinkedin}
                width={14}
                height={15}
                alt="LinkedIn"
              ></Image>
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Contact
