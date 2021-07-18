import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import Loader from "react-loader-spinner";

export default function Projects() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
            title,
            slug,
            order,
            mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`
      )
      .then((data) => {
        const sortedData = data.sort((a, b) =>
          a.order > b.order ? 1 : a.order < b.order ? -1 : 0
        );
        setProjectData(sortedData);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="projects-main">
      <section className="projects-container">
        <h1 className="route-title">Projects</h1>
        <h2 className="route-description">
          Some of my recent personal programming projects
        </h2>
        {projectData ? (
          <div className="projects-wrapper">
            {projectData.map((project, index) => (
              <article key={project.slug.current}>
                <Link to={"/post/" + project.slug.current}>
                  <span className="project-span" key={index}>
                    <img
                      src={project.mainImage.asset.url}
                      alt={project.mainImage.alt}
                    />
                    <span>
                      <h3>{project.title}</h3>
                    </span>
                  </span>
                </Link>
              </article>
            ))}
            {/* <div
              style={{
                width: "100%",
                height: "0px",
                position: "relative",
                paddingBottom: "56.250%",
              }}
            >
              <iframe
                // src="https://streamable.com/ghtmb2"
                src="https://giant.gfycat.com/AgedPleasedArabianhorse.webm"
                width="100%"
                height="100%"
                allowFullScreen
                style={{ width: "100%", height: "100%", position: "absolute" }}
              ></iframe>
            </div> */}
          </div>
        ) : (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#00BFFF" height={150} width={150} />
          </div>
        )}
      </section>
    </main>
  );
}
