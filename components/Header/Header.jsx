"use client"

import React, { useRef, useLayoutEffect } from "react"
import Image from "next/image"
import Container from "@/components/Container/Container"
import "./Header.scss"
import { Sketch } from "./Sketch"
import Pill from "../Pill/Pill"
import chevronDown from "@/assets/icons/chevron-down.svg"

export default function Header() {
  const tl = useRef()
  const header = useRef()

  useLayoutEffect(() => {
    // const ctx = gsap.context(() => {
    //   // then we can animate them like so...
    //   tl.current = gsap
    //     .timeline()
    //     .to(".header__bg-color", {
    //       scaleY: 1,
    //       duration: 0.7,
    //       ease: "power3.inOut",
    //     })
    //     .to(".header__inner", {
    //       opacity: 1,
    //       duration: 0.3,
    //       ease: "power3.out",
    //     })
    //     .to(".header__background", {
    //       opacity: 1,
    //     })
    //     .to(
    //       ".header__background",
    //       {
    //         translateX: "-100%",
    //         duration: 15,
    //         ease: "linear",
    //         repeat: -1,
    //         repeatDelay: 0,
    //       },
    //       "-=1"
    //     );
    // });
    // // Refs allow you to access DOM nodes
  })

  return (
    <header className={`header bg-noise`} ref={header}>
      <Container>
        <div className="header__background" id="sketch-container">
          <Sketch />
        </div>
        <div className="header__main">
          <h1 className="header__title">Brieuc Fresnel</h1>
          <div className="header__subtitle">
            Développeur web front-end & WordPress junior
          </div>
          <p className="header__introduction">
            Mes études et mes expériences professionnelles m&apos;ont conduites
            à travailler en agence (Studio DOT / Redcat Studio) comme en
            free-lance.
          </p>
          <br />
          <div className="header__pills">
            <Pill size={"sm"}>#WordPress</Pill>
            <Pill size={"sm"}>#ACF</Pill>
            <Pill size={"sm"}>#React</Pill>
            <Pill size={"sm"}>#GSAP</Pill>
          </div>
          <ul className="header__school">
            <li>Master Développement Full-Stack @ YNOV Toulouse</li>
            <li>Bachelor Développement Web @ Digital Campus Paris</li>
          </ul>
        </div>

        <div className="header__aside">
          <p className="header__side-text">
            En ce moment, je m&lsquo;intéresse à p5, three, et au creative
            coding. Je teste aussi différents frameworks fullstack comme Next,
            Remix et Nuxt.
          </p>
        </div>

        <div className="header__cta">
          <Image src={chevronDown} width={16} height={16} alt="" />
          {/* Références */}
        </div>
      </Container>
    </header>
  )
}
