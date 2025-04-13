import React from "react";
import styles from "./Content.module.css";
import Modal from "./Modal";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}
const contents: ContentItem[] = [
  {
    id: 1,
    title: "Anki Farm Tycoon",
    description: "学習をゲーム化するソフトウェア",
    imageUrl:
      "https://github.com/user-attachments/assets/479565f4-5544-4d39-990b-680020d5b24e",
  },
];

const Content: React.FC = () => {
  const [selectedContent, setSelectedContent] =
    React.useState<ContentItem | null>(null);

  const handleContentClick = (content: ContentItem) => {
    setSelectedContent(content);
  };

  const closeModal = () => {
    setSelectedContent(null);
  };

  return (
    <div className={styles.ContentWrapper}>
      <h1>Content</h1>
      {contents.map((content) => (
        <div
          key={content.id}
          className={styles.ContentCard}
          onClick={() => handleContentClick(content)}
          style={{ cursor: "pointer" }}
        >
          <img src={content.imageUrl} alt={content.title} />
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
      ))}
      {selectedContent && (
        <Modal
          showFlag={true}
          setShowModal={closeModal}
          content={selectedContent.description}
        />
      )}
    </div>
  );
};

export default Content;
