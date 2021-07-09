import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";

export default function Project() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
            title,
            date,
            place,
            description,
            projectType,
            link,
            tags
        }`
      )
      .then((data) => setProjectData(data))
      .catch(console.error);
  }, []);
  return (
    <main className="jobs-main">
      <section className="jobs-container">
        <h1 className="route-title">My Jobs</h1>
        <h2 className="route-description">
          My professional experience as software developer
        </h2>
        <section>
          {projectData &&
            projectData.map((project, index) => (
              <article key={index}>
                <h3 className="job-title">
                  <a
                    href={project.link}
                    alt={project.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                </h3>
                <div className="job-details">
                  <span>
                    <strong>Finished on</strong>:{" "}
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                  <span>
                    <strong>Company</strong>: {project.place}
                  </span>
                  <span>
                    <strong>Type</strong>: {project.projectType}
                  </span>
                  <p>{project.description}</p>
                  <a
                    href={project.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Visit their website <span>{"➨"}</span>
                  </a>
                </div>
              </article>
            ))}
        </section>
      </section>
    </main>
  );
}
