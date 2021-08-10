import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Loader from "react-loader-spinner";

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
                projectId="2gnt31fi"
                dataset="production"
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
