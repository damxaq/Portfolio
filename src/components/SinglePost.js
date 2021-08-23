import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Loader from "react-loader-spinner";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const DATASET = process.env.REACT_APP_DATASET;

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function SinglePost() {
  const [project, setProject] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
      title,
      _id,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body,
      github,
      url,
      video,
    }`
      )
      .then((data) => setProject(data[0]))
      .catch(console.error);
  }, [slug]);

  return (
    <main className="single-post-main main-padding">
      {project && project.video ? (
        <>
          <h1>{project.title}</h1>
          <article className="single-post-container container">
            <header>
              <img
                src={urlFor(project.mainImage).url()}
                alt={project.title}
                className="post-image"
              />
            </header>
            <div className="post-details">
              <div className="post-links">
                <span>
                  See the project:{" "}
                  <a href={project.url} target="_blank" rel="noreferrer">
                    {project.title}
                  </a>
                </span>
                <span>
                  Check on Github:{" "}
                  <a href={project.github} target="_blank" rel="noreferrer">
                    {`${project.title} - Github`}
                  </a>
                </span>
              </div>
              <BlockContent
                className="post-block-content"
                blocks={project.body}
                projectId={PROJECT_ID}
                dataset={DATASET}
              />
            </div>
            <div className="post-video">
              <iframe
                title={project.title}
                src={"https://streamable.com/e/" + project.video}
                width="100%"
                height="100%"
                allowFullScreen
              ></iframe>
            </div>
          </article>
        </>
      ) : (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#00BFFF" height={150} width={150} />
        </div>
      )}
    </main>
  );
}
