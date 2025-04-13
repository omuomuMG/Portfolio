import React from "react";
import Glob from "./Top";
import styles from "./TopPage.module.css";

const TopPage: React.FC = () => {
  return (
    <div className={styles.TopPageWapper}>
      <div className={styles.GlobWapper}>
        <Glob />
      </div>
      <div className={styles.WelcomeMessageWapper}>
        <h1>This is omuomuMG !</h1>
        <h1>こんにちは！</h1>
        <h1>你好！</h1>
        <h1>Hi! There!</h1>
      </div>
    </div>
  );
};

export default TopPage;
