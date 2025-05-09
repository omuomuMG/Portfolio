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
          大体1ヶ月に1回海外にいきます。トップページの地球儀の上を飛んでいる飛行機は、今までに実際に訪れた場所です。現在、中国語と英語を勉強しています。将来の夢は🇯🇵🇨🇳🇺🇸の3ヶ国語とプログラミング言語を使いこなすマルチリンガルになることです。
          <br />
          Projectにあるリリースしたソフトウェアは1000人以上のユーザーに使ってもらっています。将来的にこれらをOSSのプロジェクトとして世界中の人たちを巻き込んでいきたいです。
        </p>
        <h2 className={styles.SectionTitle}>経歴・資格</h2>
        <ul className={styles.SkillsList}>
          <li>2023年4月~ 立命館大学 情報理工学部</li>
          <li>
            2024年2月~ 学校法人角川ドワンゴ学園 N code Labo プログラミング講師
          </li>
          <li>2025年1月~ Outlier.ai ソフトウェアエンジニア</li>
          <li>基本情報技術士試験 合格</li>
          <li>TOEIC L&R 830点</li>
          <li>AtCoder 茶色</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
