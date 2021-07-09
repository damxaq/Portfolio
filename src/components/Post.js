import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

export default function Post() {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
            title,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`
      )
      .then((data) => setPostData(data))
      .catch(console.error);
  }, []);

  return (
    <main className="posts-main">
      <section className="posts-container">
        <h1 className="route-title">Projects Page</h1>
        <h2 className="route-description">
          Some of my most recent programming projects
        </h2>
        <div className="articles-wrapper">
          {postData &&
            postData.map((post, index) => (
              <article key={post.slug.current}>
                <Link to={"/post/" + post.slug.current}>
                  <span className="article-span" key={index}>
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt}
                    />
                    <span>
                      <h3>{post.title}</h3>
                    </span>
                  </span>
                </Link>
              </article>
            ))}
        </div>
      </section>
    </main>
  );
}
