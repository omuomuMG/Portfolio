import React, { useEffect } from "react";
import Glob from "./Top";
import styles from "./TopPage.module.css";

const TopPage: React.FC = () => {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const scrollTo = window.innerHeight;
      const threshold = scrollTo / 2; // スクロール判定のしきい値

      // 下へのスクロール
      if (window.scrollY === 0 && event.deltaY > 0) {
        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
        event.preventDefault();
      }
      // 上へのスクロール
      else if (
        window.scrollY > 0 &&
        window.scrollY < scrollTo &&
        event.deltaY < 0
      ) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        event.preventDefault();
      }
    };

    const handleScroll = () => {
      const scrollTo = window.innerHeight;
      // スクロール位置が中途半端な場合、近い方へスナップ
      if (window.scrollY > 0 && window.scrollY < scrollTo) {
        if (window.scrollY < scrollTo / 2) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          window.scrollTo({
            top: scrollTo,
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scrollend", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scrollend", handleScroll);
    };
  }, []);

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
