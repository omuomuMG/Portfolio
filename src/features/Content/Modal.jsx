import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import Lottie from "react-lottie";
import { IoMdDownload, IoLogoGithub } from "react-icons/io";
import { TbWorldWww } from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";
import { SiQiita } from "react-icons/si";

const Modal = ({ showFlag, setShowModal, props }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (showFlag) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFlag]);

  const closeModal = () => {
    setShowModal(null);
  };

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + props.demo)
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <>
      {showFlag ? (
        <div className={styles.overlay}>
          <div className={styles.modalContent}>
            <div className={styles.demo}>
              {animationData ? (
                <Lottie options={defaultOptions} />
              ) : (
                <div className={styles.spinner}>
                  <FaSpinner className={styles.spin} size={48} />
                </div>
              )}
            </div>
            <h2 className={styles.sectionTitle}>説明</h2>
            <p className={styles.description}>{props.productDescription}</p>
            <h2 className={styles.sectionTitle}>開発背景</h2>
            <p className={styles.description}>{props.background}</p>
            <h2 className={styles.sectionTitle}>使用技術</h2>
            <div className={styles.techStack}>
              {props.techStack &&
                props.techStack.map((TechIcon, index) => (
                  <span key={index} className={styles.techItem}>
                    <TechIcon className={styles.icon} />
                  </span>
                ))}
            </div>
            <h2 className={styles.sectionTitle}>技術選定理由</h2>
            <p className={styles.description}>{props.techReason}</p>
            {props.statistics && (
              <>
                <h2 className={styles.sectionTitle}>統計情報</h2>
                <p className={styles.description}>{props.statistics}</p>
              </>
            )}
            <h2 className={styles.sectionTitle}>リンク</h2>
            {props.downloadUrl && (
              <p>
                <a
                  href={props.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <IoMdDownload />
                  ダウンロード
                </a>
              </p>
            )}
            {props.githubUrl && (
              <p>
                <a
                  href={props.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <IoLogoGithub />
                  GitHub
                </a>
              </p>
            )}
            {props.siteUrl && (
              <p>
                <a
                  href={props.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <TbWorldWww />
                  サイト
                </a>
              </p>
            )}
            {props.qiitaUrl && (
              <p>
                <a
                  href={props.qiitaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <SiQiita />
                  紹介記事
                </a>
              </p>
            )}
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
