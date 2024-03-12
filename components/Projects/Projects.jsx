import React from "react"
import ProjectsList from "./ProjectsList/ProjectsList"
import ProjectsSlider from "./ProjectsSlider/ProjectsSlider"

import { promises as fs } from "fs"

export default async function Projects() {
  const file = await fs.readFile(
    process.cwd() + "/assets/json/projects.json",
    "utf8"
  )
  let projects = JSON.parse(file)

  projects = projects.sort(function (a, b) {
    return a.year > b.year ? -1 : 1
  })

  return (
    <>
      <ProjectsList projects={projects}></ProjectsList>
      {/* <ProjectsSlider projects={projects}></ProjectsSlider> */}
    </>
  )
}
