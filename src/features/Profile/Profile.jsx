import React from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./Profile.module.css";

function Profile() {
  return (
    <div className={styles.ProfileWrapper}>
      <div className={styles.ProfileCard}>
        <div className={styles.ProfileImageWrapper}>
          <img
            src="https://avatars.githubusercontent.com/u/87554257?v=4"
            alt="Profile"
            className={styles.ProfileImage}
          />
        </div>
        <div className={styles.ProfileInfo}>
          <h1 className={styles.ProfileName}>omuomuMG</h1>
          <p className={styles.ProfileDescription}>言語学習が趣味です。</p>
          <div className={styles.SocialLinks}>
            <a
              href="https://github.com/omuomuMG"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.SocialLink}
            >
              <FaGithub size={40} color="white" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.ProfileContent}>
        <h2 className={styles.SectionTitle}>自己紹介</h2>
        <p className={styles.ProfileText}>
          <h3>お仕事について</h3>
          <span>
            外資系のIT企業でソフトウェアエンジニアとして働いています。
          </span>
          AIエンジニアではないですが、<span>ChatGPTを初めとするLLMの制作</span>
          に関わっており、ソフトウェアを作成し、AIの学習データとして使用しています。
          主にフロントエンドやアルゴリズムの実装を担当しています。普段の業務は全て英語で行なっております。
          <br />
          また、学校法人角川ドワンゴ学園 N code Laboで
          <span>プログラミング講師</span>をしています。
          <h3>趣味について</h3>
          旅行と言語学習が趣味です。旅行では、アジアの文化がとても好きで1ヶ月に1回海外に行きます。トップページの地球儀を飛ぶ飛行機は、実際に私が訪れた国を示しています。現在、中国語と英語を勉強しています。将来の夢は🇯🇵🇨🇳🇺🇸の3ヶ国語とプログラミング言語を使いこなすマルチリンガルになることです。
        </p>
        <h2 className={styles.SectionTitle}>経歴</h2>
        <ul className={styles.SkillsList}>
          <li>2020年~2023年 公文公記念奨学金奨学生</li>
          <li>2023年4月~ 立命館大学 情報理工学部</li>
          <li>
            2024年2月~ 学校法人角川ドワンゴ学園 N code Labo プログラミング講師
          </li>
          <li>2025年1月~ Outlier.ai ソフトウェアエンジニア</li>
        </ul>
        <h2 className={styles.SectionTitle}>資格等</h2>
        <ul className={styles.SkillsList}>
          <li>基本情報技術士試験 合格</li>
          <li>TOEIC L&R 830点</li>
          <li>AtCoder 茶色</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
