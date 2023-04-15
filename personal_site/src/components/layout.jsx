import React from "react";
import "../index.css";

const Layout = ({ children }) => {
  return (
    <>
      <header class="panel-header">
        <img class="logo" src="/images/glasses.svg" />
        <h2>Front End Web Developer</h2>
        <h3>Let's make good things.</h3>
      </header>
      <main>{children}</main>
      <footer>
        <div class="row">
          <h3>
            <a href="mailto:acherry125@gmail.com" title="My email">
              acherry125@gmail.com
            </a>
          </h3>
          <p>
            <small>© 2022 Alexander Cherry</small>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
