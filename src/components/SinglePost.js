import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Loader from "react-loader-spinner";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
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
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  console.log(singlePost);

  return (
    <main className="single-post-main">
      {singlePost ? (
        <>
          <h1>{singlePost.title}</h1>
          <article className="single-post-container">
            <header>
              <img
                src={urlFor(singlePost.mainImage).url()}
                alt={singlePost.title}
                className="post-image"
              />
            </header>
            <div className="post-block-content">
              <BlockContent
                blocks={singlePost.body}
                projectId="2gnt31fi"
                dataset="production"
              />
            </div>
            <div className="post-video">
              <iframe
                src={singlePost.video}
                width="100%"
                height="100%"
                allowfullscreen
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
