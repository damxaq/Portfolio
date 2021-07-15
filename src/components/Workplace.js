import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import Loader from "react-loader-spinner";

export default function Workplace() {
  const [workData, setWorkData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "work"]{
            title,
            startDate,
            endDate,
            place,
            description,
            workType,
            link,
            tags
        }`
      )
      .then((data) => {
        const sortedData = data.sort((a, b) =>
          a.startDate > b.startDate ? -1 : b.startDate > a.startDate ? 1 : 0
        );
        setWorkData(sortedData);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="jobs-main">
      <section className="jobs-container">
        <h1 className="route-title">My Jobs</h1>
        <h2 className="route-description">
          My professional experience as software developer
        </h2>
        {workData ? (
          <section>
            {workData.map((workplace, index) => (
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
                    <strong>Started</strong>:{" "}
                    {new Date(workplace.startDate).toLocaleDateString()}
                  </span>
                  <span>
                    <strong>Finished</strong>:{" "}
                    {new Date(workplace.endDate).toLocaleDateString()}
                  </span>
                  <span>
                    <strong>Company</strong>: {workplace.place}
                  </span>
                  <span>
                    <strong>Type</strong>: {workplace.workType}
                  </span>
                  {workplace.tags && (
                    <div className="tags-container">
                      {workplace.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}
                    </div>
                  )}

                  <p
                    dangerouslySetInnerHTML={{
                      __html: workplace.description,
                    }}
                  ></p>
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
        ) : (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#00BFFF" height={150} width={150} />
          </div>
        )}
      </section>
    </main>
  );
}
