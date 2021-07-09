import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";

export default function Workplace() {
  const [workData, setWorkData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "work"]{
            title,
            date,
            place,
            description,
            workType,
            link,
            tags
        }`
      )
      .then((data) => setWorkData(data))
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
          {workData &&
            workData.map((workplace, index) => (
              <article key={index}>
                <h3 className="job-title">
                  <a
                    href={workplace.link}
                    alt={workplace.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {workplace.title}
                  </a>
                </h3>
                <div className="job-details">
                  <span>
                    <strong>Finished on</strong>:{" "}
                    {new Date(workplace.date).toLocaleDateString()}
                  </span>
                  <span>
                    <strong>Company</strong>: {workplace.place}
                  </span>
                  <span>
                    <strong>Type</strong>: {workplace.workplaceType}
                  </span>
                  <p>{workplace.description}</p>
                  <a
                    href={workplace.link}
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
