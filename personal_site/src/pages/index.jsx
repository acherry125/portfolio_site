import * as React from "react";
import Layout from "../components/layout";
const IndexPage = () => {
  return (
    <Layout>
      <section id="home" class="tiles-section">
        <a
          href="https://www.linkedin.com/in/alexander-cherry"
          class="showcase-tile linkedin-link"
          title="My LinkedIn"
        >
          <img class="icon" src="/images/linkedin-icon.png" />
          <img
            class="icon hover"
            src="/images/linkedin-icon-blue.png"
            aria-hide
          />
        </a>
        <a
          href="https://github.com/acherry125"
          class="github-link showcase-tile"
          title="My Github"
        >
          <img class="icon" src="/images/github-icon.svg" />
          <img
            class="icon hover"
            src="/images/github-icon-purple.svg"
            aria-hide
          />
        </a>
      </section>
      <section class="portfolio-links main-content">
        <h3>Past (and Present) Work</h3>
        <ul>
          <li>
            <a href="/salt">
              <h4>Salt - A product of American Student Assistance</h4>
            </a>
            <p>
              A student financial aid assistance website I developed as a member
              of the Salt application team at American Student Assistance from
              July 2016 - May 2018.
            </p>
          </li>
          <li>
            <a href="/event-horizon">
              <h4>Event Horizon</h4>
            </a>
            <p>A POC landing page for an event hosting website.</p>
          </li>
          <li>
            <a href="/the-city">
              <h4>The City</h4>
            </a>
            <p>
              A work-in-progress React.js text-adventure game exploring a
              war-torn Boston City Hall.
            </p>
          </li>
          <li>
            <a href="/worship">
              <h4>Worship - The Game</h4>
            </a>
            <p>A Java village-god simulator.</p>
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Alex Cherry</title>;
