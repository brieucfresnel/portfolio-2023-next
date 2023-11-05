
'use client';

import React, { useState, useEffect } from 'react';
import Container from '@/components/Container/Container';
import ProjectsListRow from '@/components/ProjectsListsRow/ProjectsListRow';

import './ProjectsList.scss';

function ProjectsList() {
  // const file = await fs.readFile(process.cwd() + '/assets/json/projects.json', 'utf8');
  // const projects = JSON.parse(file);

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [currentHoveredProject, setCurrentHoveredProject] = useState(null)

  useEffect(() => {
    console.log(currentHoveredProject);
  }, [currentHoveredProject])

  useEffect(() => {
    fetch('/json/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data))
      .finally(() => setIsLoading(false))
  }, []
  )

  if (isLoading) return <>Loading...</>

  return (
    <section className="projects-list">
      <Container>
        <div className="projects-lists__image-wrapper">
        </div>
        <h2 className="projects-list__title">Références</h2>
        {projects.map((project, i) => <ProjectsListRow key={i} {...project} setCurrentHoveredProject={setCurrentHoveredProject}></ProjectsListRow>)}
      </Container>
    </section>

  )
}

export default ProjectsList