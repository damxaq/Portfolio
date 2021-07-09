import React from "react";
import image from "../mongolia.jpg";

export default function Home() {
  return (
    <main className="home">
      <img src={image} alt="Mongolia" />
      <section>
        <h1>Hi, I'm Damian Celico</h1>
      </section>
    </main>
  );
}
