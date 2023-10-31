"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "./Header.scss";

export default function Header() {
  const tl = useRef();
  const header = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // then we can animate them like so...

      tl.current = gsap
        .timeline()
        .to(".header__bg-color", {
          scaleY: 1,
          duration: 0.7,
          ease: "power3.inOut",
        })
        .to(".header__inner", {
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        })
        .to(".header__background", {
          opacity: 1,
        })
        .to(
          ".header__background",
          {
            translateX: "-100%",
            duration: 15,
            ease: "linear",
            repeat: -1,
            repeatDelay: 0,
          },
          "-=1"
        );
    });
    // Refs allow you to access DOM nodes
  });

  return (
    <header className="header" ref={header}>
      <div className="header__bg-color"></div>

      <div className="header__background header__background--1 opacity-0"></div>
      <div className="header__background header__background--2 opacity-0"></div>

      <div className="header__inner opacity-0">
        <h1 className="header__title">Brieuc Fresnel</h1>
        <div className="header__text">
          Développeur WordPress en agence depuis trois ans et avec une forte
          appétence pour l’écosystème JS. Ces deux dernières années, j’ai
          travaillé pour
          <a
            className="link link--external"
            href="https://studio-dot.fr"
            target="_blank"
          >
            Studio DOT
          </a>
          , une agence de communication toulousaine.
        </div>
        <div className="header__buttons">
          <a
            href="/files/FRESNEL_Brieuc_CV.pdf"
            className="button button--primary link link--external"
            target="_blank"
          >
            Télécharger mon CV
          </a>
          <a
            href="mailto:fresnel.brieuc@gmail.com"
            className="button button--secondary link link--external"
            target="_blank"
          >
            M&apos;envoyer un message
          </a>
        </div>
      </div>
    </header>
  );
}
