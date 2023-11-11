"use client"

import React, { useRef, useLayoutEffect } from "react"
import Image from "next/image"
import Container from "@/components/Container/Container"
import "./Header.scss"
import { chivo } from "@/common/utils/fonts"
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
    <header className={`header`} ref={header}>
      <Container>
        <div className="header__background" id="sketch-container">
          <Sketch />
        </div>
        <div className="header__main">
          <h1 className="header__title">
            Hello ! je suis <b>Brieuc</b>, développeur web spécialiste{" "}
            <b>front-end et WordPress</b>.
          </h1>
          <p className="header__introduction">
            Ces deux dernières années, j’ai travaillé chez Studio DOT, un studio
            digital toulousain. J’y ai appris l’utilisation de GSAP et le goût
            du motion design, et y ai aussi créé et maintenu un{" "}
            <Pill href="https://github.com/brieucfresnel">thème</Pill> et un{" "}
            <Pill href="https://github.com/brieucfresnel">plug-in</Pill> pour
            nos sites WordPress. Avant ça, je faisais des sites vitrines et
            e-commerce chez Redcat Studio. Dans le même temps, j’étudiais le
            développement full-stack à Ynov Toulouse et Digital Campus Paris.
          </p>
        </div>

        <div className="header__aside">
          <p className="header__side-text">
            En ce moment, je m&lsquo;intéresse à p5, three, et au creative
            coding. Je teste aussi différentes libs React comme Framer Motion et
            Fiber.
          </p>
        </div>

        <Image
          className="header__go-down"
          src={chevronDown}
          width={24}
          height={24}
          alt=""
        ></Image>
      </Container>
    </header>
  )
}
