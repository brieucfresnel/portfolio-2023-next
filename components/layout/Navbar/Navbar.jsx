import React from "react";
import Image from "next/image";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar__brand" href="/">
          <div></div>
          <Image
            src="/images/brieuc_fresnel.png"
            width="42"
            height="42"
            alt=""
          />
        </a>
        <div className="navbar__menu">
          <a
            className="navbar__menu-link link--external"
            href="https://www.linkedin.com/in/brieuc-fresnel/"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className="navbar__menu-link link--external"
            href="https://github.com/brieucfresnel"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
