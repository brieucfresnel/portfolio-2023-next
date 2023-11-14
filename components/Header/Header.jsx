"use client"

import React, { useState, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import Container from "@/components/Container/Container"
import "./Header.scss"
import { Sketch } from "./Sketch"
import Pill from "../Pill/Pill"
import chevronDown from "@/assets/icons/chevron-down.svg"
import { gsap } from "@/common/utils/gsap"

export default function Header() {
  const header = useRef()
  const [isSketchPaused, setIsSketchPaused] = useState(true)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // then we can animate them like so...
      const q = gsap.utils.selector(header.current)

      gsap
        .timeline({
          delay: 0.3,
        })
        .add("title")
        .to(
          q(".header__title"),
          {
            opacity: 1,
            ease: "power3.in",
          },
          "title"
        )
        .to(
          q(".header__subtitle"),
          {
            opacity: 1,
            ease: "power3.in",
          },
          ">-0.4"
        )
        .add("content")
        .to(
          q(".header__introduction"),
          {
            opacity: 1,
            ease: "power3.in",
          },
          "content"
        )
        .to(
          q(".header__pills"),
          {
            opacity: 1,
            ease: "power3.in",
          },
          "content"
        )
        .to(
          q(".header__school"),
          {
            opacity: 1,
            ease: "power3.in",
            onComplete: () => {
              setIsSketchPaused(false)
            },
          },
          "content"
        )
        .add("end", " >-0.3")
        .to(
          q(".header__side-text, .header__cta"),
          {
            y: 0,
            opacity: 1,
            ease: "power3.in",
          },
          "end"
        )
    })
    return () => ctx.revert()
  }, [])

  return (
    <header className={`header bg-noise`} ref={header}>
      <Container>
        <div className="header__background" id="sketch-container">
          <Sketch isSketchPaused={isSketchPaused} />
        </div>
        <div className="header__main">
          <h1 className="header__title">Brieuc Fresnel</h1>
          <div className="header__subtitle">
            Développeur web front-end & WordPress junior
          </div>
          <p className="header__introduction">
            Mes études et mes expériences professionnelles m&apos;ont conduit à
            travailler en agence (Studio DOT / Redcat Studio) comme en
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
        </div>
      </Container>
    </header>
  )
}
