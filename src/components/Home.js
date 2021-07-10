import React from "react";
import image from "../damian.jpg";

export default function Home() {
  return (
    <main className="home">
      <section>
        <h1>HI, I'M DAMIAN CELICO</h1>
        <h2>Full-Stack Software Developer</h2>
        <img src={image} alt="Damian Celico" className="home-image" />
        <h3>
          I am a software developer with 3 years of commercial experience and I
          deal with programming as a hobby for around 10 years. <br /> I am most
          passionate about coding in React and <br />
          always wish to learn new awesome stuff.
          <br /> Welcome to my Portfolio:{")"}
        </h3>
      </section>
    </main>
  );
}
