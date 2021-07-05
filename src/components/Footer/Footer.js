import React from "react";
// CTA links
import * as Contact from "./Links";
// Styles
import classes from "./Footer.module.scss";
// Icons
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

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
          <FaGithub />
          Github
        </a>
        <a
          href={Contact.TWITTER}
          target="_black"
          rel="noreferrer"
          className={classes.Twitter}
        >
          <FaTwitter />
          Twitter
        </a>
      </div>
      <div className={classes.Attribution}>
        <p>&copy; {currentYear} SilverStore</p>
        <p>
          Crafted with <FaHeart /> by
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
