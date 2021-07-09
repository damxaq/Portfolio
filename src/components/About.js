import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import mongolia from "../mongolia.jpg";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

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
    <main className="about-main">
      <img src={mongolia} alt="Mongolia" />
      {author ? (
        <div className="about-container">
          <section>
            <img
              src={urlFor(author.authorImage).url()}
              className="my-photo"
              alt={author.name}
            />
            <div className="about-card">
              <h1>
                Hey there. I'm <span>{author.name}</span>
              </h1>
              <div className="about-block-content">
                <BlockContent
                  blocks={author.bio}
                  projectId="2gnt31fi"
                  dataset="production"
                />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
