"use client"

import React, { useState, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Container from "@/components/Container/Container"
import "./Header.scss"
import { Sketch } from "@/components/Sketch/Sketch"
import Pill from "@/components/Pill/Pill"
import chevronDown from "@/assets/icons/chevron-down.svg"
import { gsap, ScrollTrigger } from "@/common/utils/gsap"
import SplitType from "split-type"

export default function Header() {
  const header = useRef()
  const [isSketchPaused, setIsSketchPaused] = useState(true)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // then we can animate them like so...
      const q = gsap.utils.selector(header.current)

      const splitSchoolItems = () => new SplitType(q(".header__school li"))

      window.addEventListener("resize", () => splitSchoolItems())

      new ScrollTrigger({
        trigger: header.current,
        end: "bottom 20%",
        onLeave: () => setIsSketchPaused(true),
        onEnterBack: () => setIsSketchPaused(false),
      })

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
          q(".header__school, .header__cv"),
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
        .to(
          q(".sketch-button"),
          {
            opacity: 1,
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
          <div className="header__subtitle">Développeur web</div>
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
          <Link
            className="header__cv"
            href="/files/FRESNEL_BRIEUC_CV.pdf"
            rel="noopener noreferrer"
            target="_blank"
            locale={false}
          >
            Télécharger mon CV
          </Link>
        </div>
        <div className="header__cta">
          <Image src={chevronDown} width={16} height={16} alt="" />
        </div>
      </Container>
    </header>
  )
}
