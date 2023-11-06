import React from 'react'
import ProjectsList from './ProjectsList/ProjectsList';
import ProjectsSection from './ProjectsSection/ProjectsSection';

import { promises as fs } from 'fs';

export default async function Projects() {
  const file = await fs.readFile(process.cwd() + '/assets/json/projects.json', 'utf8');
  const projects = JSON.parse(file);

  return (
    <>
      <ProjectsList projects={projects}></ProjectsList>
      <ProjectsSection projects={projects}></ProjectsSection>
    </>
  )
}
