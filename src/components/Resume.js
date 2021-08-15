import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const DATASET = process.env.REACT_APP_DATASET;

export default function Resume() {
  const [resumeFile, setResumeFile] = useState(null);
  const [downloadReady, setDownloadReady] = useState(true);

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

  useEffect(() => {
    const timeout = setTimeout(() => setDownloadReady(true), 20000);
    return () => {
      clearTimeout(timeout);
    };
  }, [downloadReady]);

  return (
    <>
      {resumeFile && downloadReady ? (
        <a
          href={resumeFile ? getUrlFromId() : "#"}
          className="navlink"
          onClick={() => {
            setDownloadReady(false);
          }}
        >
          Resume 📥
        </a>
      ) : (
        <p className="navlink">Resume</p>
      )}
    </>
  );
}
