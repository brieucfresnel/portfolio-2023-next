"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "./Header.scss";
import arrowDown from "@/assets/svg/arrow-down.svg";

export default function Header() {
  const tl = useRef();
  const header = useRef();

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
  });

  return (
    <header className="header" ref={header}>
      <div>
        {/* <p className="header__subtitle">Brieuc Fresnel</p> */}
        <h1 className="header__title">Développeur WordPress & Front</h1>
      </div>

      <div className="header__top-links">
        <a href="#">projets</a>
        <a href="#">contact</a>
      </div>
      <div className="header__introduction">
        <p>
          Je suis Brieuc et je développe des sites vitrines et e-commerce. Ces
          deux dernières années, j’ai travaillé chez{" "}
          <a href="https://studio-dot.fr" target="_blank">
            Studio DOT
          </a>
          , un studio digital toulousain. Là-bas, j’ai fait beaucoup de
          WordPress, un peu d’Astro, et surtout plein de sites sympas. Dans le
          même temps, j’étudiais Nest.js, Docker, React, Vue et d&apos;autres.{" "}
          <br />
          <br />
          En ce moment, je m’intéresse à Next.js, p5 et three.js.
        </p>
      </div>
      <div className="header__arrow-container">
        <svg
          width="30"
          height="44"
          viewBox="0 0 30 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5858 43.4142C14.3668 44.1953 15.6332 44.1953 16.4142 43.4142L29.1421 30.6863C29.9232 29.9052 29.9232 28.6389 29.1421 27.8579C28.3611 27.0768 27.0948 27.0768 26.3137 27.8579L15 39.1716L3.68629 27.8579C2.90524 27.0768 1.63891 27.0768 0.857866 27.8579C0.076817 28.6389 0.0768171 29.9052 0.857866 30.6863L13.5858 43.4142ZM13 8.74227e-08L13 42L17 42L17 -8.74227e-08L13 8.74227e-08Z"
            fill="#FFDCE2"
          />
        </svg>
      </div>
    </header>
  );
}
