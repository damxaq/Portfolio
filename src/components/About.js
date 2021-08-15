import React, { useEffect, useState } from "react";
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

export default function About() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
      name,
      bio,
      "authorImage": image.asset->url
    }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  // Setting urls from block content to open in new tab
  useEffect(() => {
    if (author) {
      const urls = document
        .getElementsByClassName("about-block-content")[0]
        .getElementsByTagName("a");

      for (const url of urls) {
        url.setAttribute("target", "_blank");
      }
    }
  }, [author]);

  return (
    <main className="about-main main-padding">
      {author ? (
        <div className="about-container container">
          <section>
            <div className="about-header">
              <img
                src={urlFor(author.authorImage).url()}
                className="my-photo"
                alt={author.name}
              />
              <div className="about-card">
                <h1>Hello there.</h1>
                <h1>
                  My name is <span>{author.name}.</span>
                </h1>
              </div>
            </div>

            <div className="about-block-content">
              <BlockContent
                blocks={author.bio}
                projectId={PROJECT_ID}
                dataset={DATASET}
              />
            </div>
          </section>
        </div>
      ) : (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#00BFFF" height={150} width={150} />
        </div>
      )}
    </main>
  );
}
