import React from 'react'
import Image from 'next/image'
import Pill from '@/components/Pill/Pill'
import './ProjectsSlide.scss'

export default function ProjectSlide({ title, type, year, team, image, tech, link }) {
  return (
    <div className="projects-slide">
      <div className="projects-slide__header">
        <div>
          <h3 className="projects-slide__title">{title}</h3>
          <div className="projects-slide__type">{type}</div>
        </div>
        <div className="projects-slide__team">
          {year} - {team}
        </div>
      </div>
      <a href={link} className="projects-slide__image-wrapper" target="_blank">
        <Image src={image.src} alt={image.alt} fill></Image>
      </a>
      <div className="projects-slide__footer">
        <div className="projects-slide__tech">
          {tech.map((label, i) => <Pill key={i} label={label} bgColor={'dark'}></Pill>)}
        </div>
        <a className="projects-slide__link" href={link} target="_blank">{link}</a>
      </div>
    </div>)
}
