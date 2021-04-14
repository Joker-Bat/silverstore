import React from "react";

// CTA links
import * as Contact from "./Links";

// Styles
import classes from "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={classes.Footer}>
      <div className={classes.CTA}>
        <a
          href={Contact.GITHUB}
          target="_blank"
          rel="noreferrer"
          className={classes.Github}
        >
          <i className="fab fa-github"></i>Github
        </a>
        <a
          href={Contact.TWITTER}
          target="_black"
          rel="noreferrer"
          className={classes.Twitter}
        >
          <i className="fab fa-twitter"></i>Twitter
        </a>
      </div>
      <div className={classes.Attribution}>
        <p>&copy; {currentYear} SilverStore</p>
        <p>
          Made with <i className="fas fa-heart"></i> by
          <a
            href={Contact.INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className={classes.Me}
          >
            SilverDev
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
