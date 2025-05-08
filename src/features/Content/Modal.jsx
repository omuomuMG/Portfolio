import React from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const closeModal = () => {
    props.setShowModal(false);
  };

  return (
    <>
      {props.showFlag ? (
        <div className={styles.overlay}>
          <div className={styles.modalContent}>
            <h1 className={styles.title}>Anki Farm Tycoon</h1>
            <h2 className={styles.sectionTitle}>説明</h2>
            <p className={styles.description}>{props.description}</p>
            <h2 className={styles.sectionTitle}>使用技術</h2>
            <div className={styles.techStack}>
              {props.icons &&
                props.icons.map((Icon, index) => (
                  <div key={index} className={styles.iconWrapper}>
                    <Icon className={styles.icon} />
                  </div>
                ))}
            </div>
            <h2 className={styles.sectionTitle}>統計情報</h2>
            <p>{props.statistics}</p>
            <h2 className={styles.sectionTitle}>リンク</h2>
            <p>
              <a
                href={props.downloadUrl}
                target="_blank"
                className={styles.link}
              >
                ダウンロード
              </a>
            </p>
            <p>
              <a href={props.githubUrl} target="_blank" className={styles.link}>
                GitHub
              </a>
            </p>
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
