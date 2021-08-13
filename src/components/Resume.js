import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";

// TODO: set env
const PROJECT_ID = "2gnt31fi";
const DATASET = "production";

export default function Resume() {
  const [resumeFile, setResumeFile] = useState(null);

  const getUrlFromId = () => {
    const [_file, id, extension] = resumeFile.split("-");
    return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${id}.${extension}`;
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "resume"] {
            resumeFile
      }`
      )
      .then((data) => {
        setResumeFile(data[0].resumeFile.asset._ref);
      })
      .catch(console.error);
  }, []);

  // TODO: style pointer and fix responsive
  return (
    <>
      {resumeFile ? (
        <a
          href={resumeFile ? getUrlFromId() : "#"}
          className="navlink"
          style={{ cursor: "pointer" }}
        >
          Resume 📥
        </a>
      ) : (
        <p className="navlink">Resume</p>
      )}
    </>
  );
}
