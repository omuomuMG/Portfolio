import React from "react";
import styles from "./Content.module.css";
import Modal from "./Modal";
import { contentDetail, contentSummary } from "./contents";
import type { ContentSummary } from "./contents";

const Content: React.FC = () => {
  const [selectedContent, setSelectedContent] =
    React.useState<ContentSummary | null>(null);

  const handleContentClick = (content: ContentSummary) => {
    setSelectedContent(content);
  };

  const closeModal = () => {
    setSelectedContent(null);
  };
  const selectedDetail = selectedContent
    ? contentDetail.find((detail) => detail.id === selectedContent.id)
    : null;

  return (
    <div className={styles.ContentWrapper}>
      <h1>My Projects</h1>
      <div className={styles.contentGrid}>
        {contentSummary.map((content: ContentSummary) => (
          <div
            key={content.id}
            className={styles.ContentCard}
            onClick={() => handleContentClick(content)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                content.logo ? `${process.env.PUBLIC_URL}${content.logo}` : ""
              }
              alt={content.title}
            />
            <h2>{content.title}</h2>
            <p>{content.contentInfo}</p>
            <div className={styles.techStack}>
              {content.techStack &&
                content.techStack.map((TechIcon, index) => (
                  <span key={index} className={styles.techItem}>
                    {React.createElement(
                      TechIcon as React.FC<{ className?: string }>,
                      {
                        className: styles.icon,
                      }
                    )}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
      {selectedDetail && (
        <Modal
          showFlag={true}
          setShowModal={closeModal}
          props={selectedDetail}
        />
      )}
    </div>
  );
};

export default Content;
