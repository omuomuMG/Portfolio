import React, { useEffect, useState } from "react";
import Glob from "./Top";
import styles from "./TopPage.module.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Typewriter } from "react-simple-typewriter";

const TopPage: React.FC = () => {
  const [init, setInit] = useState(false);
  const [globLoaded, setGlobLoaded] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    const handleWheel = (event: WheelEvent) => {
      const scrollTo = window.innerHeight;

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
      {(!globLoaded || !init) && (
        <div className={styles.loading}>
          {" "}
          <img
            src="https://avatars.githubusercontent.com/u/87554257?v=4"
            className={styles.loadingImage}
          />
        </div>
      )}
      {init && (
        <Particles
          id="tsparticles"
          className={styles.Particles}
          options={{
            autoPlay: true,
            fullScreen: {
              enable: true,
              zIndex: 0,
            },
            background: {
              color: {
                value: "transparent",
              },
            },
            detectRetina: true,
            fpsLimit: 120,
            interactivity: {
              detectsOn: "window",
              events: {
                onClick: {
                  enable: true,
                  mode: "repulse",
                },
                onHover: {
                  enable: true,
                  mode: "bubble",
                },
              },
              modes: {
                bubble: {
                  distance: 250,
                  duration: 2,
                  opacity: 0,
                  size: 0,
                },
                repulse: {
                  distance: 400,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 100,
                enable: false,
                opacity: 1,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: false,
                speed: { min: 0.1, max: 1 },
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 1920,
                  height: 1080,
                },
                value: 160,
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  enable: true,
                  speed: 1,
                  startValue: "random",
                },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            pauseOnBlur: true,
            pauseOnOutsideViewport: true,
          }}
        />
      )}
      <div className={styles.GlobWapper}>
        <Glob onLoaded={() => setGlobLoaded(true)} />
      </div>
      {init && globLoaded && (
        <div className={styles.WelcomeMessageWapper}>
          <h1>
            <Typewriter
              words={["This is omuomuMG"]}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <h1>
            <Typewriter
              words={["こんにちは！"]}
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <h1>
            <Typewriter
              words={["Hi! There!"]}
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <h1>
            <Typewriter
              words={["你好！"]}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <p>
            <Typewriter
              words={[
                "Outlier.aiでソフトウェアエンジニアをしています",
                "学校法人角川学園 N Code Laboでプログラミング講師をしています",
                "英語と中国語を勉強しています。",
                "Ankiのソフトウェアを開発しています。",
                "1ヶ月に1回海外に行きます",
                "",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default TopPage;
