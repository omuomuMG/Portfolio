import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ showFlag, setShowModal, props }) => {
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

  return (
    <>
      {showFlag ? (
        <div className={styles.overlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.sectionTitle}>説明</h2>
            <p className={styles.description}>{props.productDescription}</p>
            <h2 className={styles.sectionTitle}>特徴</h2>
            <p>{props.highlights}</p>
            <h2 className={styles.sectionTitle}>技術選定理由</h2>
            <p>{props.techReason}</p>
            <h2 className={styles.sectionTitle}>使用技術</h2>
            <div className={styles.techStack}>
              {props.techStack &&
                props.techStack.map((tech, index) => (
                  <span key={index} className={styles.techItem}>
                    {tech}
                  </span>
                ))}
            </div>
            <h2 className={styles.sectionTitle}>統計情報</h2>
            <p>{props.statistics}</p>
            <h2 className={styles.sectionTitle}>リンク</h2>
            {props.downloadUrl && (
              <p>
                <a
                  href={props.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
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
                  GitHub
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