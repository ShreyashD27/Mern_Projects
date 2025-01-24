
import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const downloadResume = () => {
    const resumeUrl = "./assets/hero/resume.pdf"; // Make sure the resume file is in the public folder
    window.open(resumeUrl, "_blank");
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Shreyash Divekar</h1>
        <p className={styles.description}>
          I'm a full-stack developer with experience using MERN Stack and JAVA Software development. I have hands-on experience working with both front-end and back-end technologies through internships and personal projects. Committed to continuous learning and applying technical skills to develop effective solutions that meet industry standards. Reach out if you'd like to learn more!
        </p>
        <div className={styles.buttonGroup}>
          <a
            href="#contact"
            className={styles.contactBtn}
          >
            Contact Me
          </a>
          <button
            onClick={downloadResume}
            className={styles.contactBtn}
          >
            Download Resume
          </button>
        </div>
      </div>
      <img
        src={getImageUrl("hero/heroImage1.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};