import { IconType } from "react-icons";
import { FaPython as python, FaCss3Alt as css, FaReact as react } from "react-icons/fa";
import { SiQt as qt, SiNextdotjs as next, SiTypescript as typescript } from "react-icons/si";
import { IoLogoFirebase as firebase } from "react-icons/io5";

export interface ContentSummary {
    id: number;
    title?: string;
    contentInfo?: string;
    imageUrl?: string;
}

export interface ContentDetail extends ContentSummary {
    productDescription?: string;
    background?: string;
    techReason?: string;
    statistics?: string;
    techStack?: IconType[];
    downloadUrl?: string;
    githubUrl?: string;
    siteUrl?: string;
}


export const contentSummary: ContentSummary[] = [
    {
        id: 1,
        title: "Anki Farm Tycoon",
        contentInfo: "学習をゲーム化するソフトウェア",
        imageUrl: "https://github.com/user-attachments/assets/479565f4-5544-4d39-990b-680020d5b24e",
    },
    {
        id: 2,
        title: "Prononciation Symbol Generator",
        contentInfo: "発音記号を生成するソフトウェア",
        imageUrl: "https://github.com/user-attachments/assets/515717dc-bd37-4d88-af7f-788386b3cb45",
    },
    {
        id: 3,
        title: "DeepL and Google Translator",
        contentInfo: "ワンクリックで164種の言語に翻訳",
        imageUrl: "https://github.com/user-attachments/assets/d97d4cfa-682f-4bf7-9884-f68bb311affa",
    },
    {
        id: 4,
        title: "Senryu",
        contentInfo: "今日の思いを川柳に込めて",
        imageUrl: "https://github.com/user-attachments/assets/ed67393c-5d2e-4c74-927a-8bd95c4e853d",
    },
];

export const contentDetail: ContentDetail[] = [
    {
        id: 1,
        productDescription: "「Anki Farm Tycoon」は、世界中で人気のフラッシュカードアプリAnkiの拡張機能として個人開発したゲームです。ユーザーは小さな牧場の経営者となり、億万長者を目指します。フラッシュカードに回答することで動物を育て、その動物たちから得られるミルクや卵、さらに出荷による収入で資金を蓄えていきます。その資金で従業員を雇い、土地を広げながら、大きな牧場へと成長させていきましょう！！！！リリース後は、GitHubやダウンロードページを通じて世界中のユーザーから多くのフィードバックをいただき、それらを迅速に反映してきました。現在では1,000ダウンロードを超え、特に英語学習者を中心に広く活用されています。今後もユーザーの声を大切にしながら、より楽しく学習を継続できるソフトウェアの開発に取り組んでいきます。",
        background: "語学学習を続ける上でAnkiは非常に効率的なツールですが、学習が単調で退屈になりやすく、継続が難しいという課題がありました。そこで「学習そのものを楽しくし、継続性を高めたい」と考え、ゲーム要素（ゲーミフィケーション）を取り入れた拡張機能として開発しました。\n\nAnki-Farm-Tycoonでは、フラッシュカードに正解するたびに農場の動物が成長したり、生産物・資産の増加など学習の進捗が可視化されることで、ユーザーのモチベーション維持にもつながっています。",
        techReason: "Ankiのアドオン開発において推薦されているPython, PyQtを用いて開発しました。",
        statistics: "1200+ ダウンロード",
        techStack: [python, qt, css],
        downloadUrl: "https://ankiweb.net/shared/info/20342773",
        githubUrl: "https://github.com/omuomuMG/Anki-Farm-Tycoon",
    },
    {
        id: 2,
        productDescription: "Ankiのアドオンの英単語の発音記号を自動的に出力するツールです。具体的には、入力された英単語に対して、オープンソースのCMU発音辞書を利用して発音情報を取得し、それを国際音声記号（IPA）に変換して表示します。これにより、ユーザーは英単語とその正確な発音記号を同時に学習でき、より効率的に語彙力を高めることができます。",
        background: "Ankiは言語学習者の間で非常に人気のあるアプリですが、発音記号を簡単に確認できる拡張機能はこれまで存在していませんでした。そこで私は、世界中の英語学習者の役に立ちたいという思いからこのプロジェクトを立ち上げました。\n現在、このソフトウェアは170ダウンロード以上されており、多くの学習者に利用されています。ユーザーから寄せられたフィードバックを積極的に取り入れ、継続的な改善も続けています。",
        techReason: "技術の選定理由としては、Ankiのアドオン開発で推薦されているPython, PyQtを軸に実装をしました。プロジェクトはオフライン利用可能かつオープンソースで公開したいという思いがあったため、条件に合ったCMU Pronouncing Dictionaryを使用しました。",
        statistics: "170+ ダウンロード",
        techStack: [python, qt, css],
        downloadUrl: "https://ankiweb.net/shared/info/2075109613?cb=1735716386693",
        githubUrl: "https://github.com/omuomuMG/Pronounce-Symbol-Generator",
    },
    {
        id: 3,
        productDescription: "翻訳をワンクリックで行うことができるAnkiのアドオンです。DeepLとGoogle翻訳のAPIを利用して、選択したテキストを即座に翻訳します。また、このアプリのAPI使用量も記録することができます。これにより、学習中の単語やフレーズをすぐに理解でき、効率的な学習が可能になります。また、ユーザはAPIの使用量を確認しながらソフトウェアを使えるので、ユーザはストレスを感じることなくができます。このアドオンは特に語学学習者にとって便利で、Ankiのフラッシュカードを使用している際に、わからない単語やフレーズが出てきた場合にすぐに翻訳結果を得ることができます。これにより、学習の流れを中断することなく、スムーズに進めることができます。",
        background: "私は未知の単語に遭遇した際、いちいちネット検索することにストレスを感じていました。フラッシュカードへの単語登録と意味の検索を同時に行えれば学習効率が上がると考え、この開発に着手しました。",
        techReason: "使用技術はPythonとPyQtで、シンプルなUIを提供しています。サードパーティライブラリとしては、DeepLライブラリ、google-api-python-clientライブラリ、dateutilを使用しています。Ankiでは、サードパーティのライブラリのサポートがないです。そのため最低限のライブラリを使い、ライブラリと共に配布しています。",
        statistics: "Comming Soon",
        techStack: [python, qt, css],
        downloadUrl: "https://ankiweb.net/shared/info/259448931",
        githubUrl: "https://github.com/omuomuMG/DeepL-and-Google-Translator",
    },
    {
        id: 4,
        productDescription: "今日の思いを川柳に込めて投稿できるWebアプリです。ユーザーは日々の出来事や感じたことを川柳として投稿し、記録できます。Next.jsとReact、TypeScriptを用いて開発されており、直感的なUIとリアルタイムな投稿機能が特徴です。",
        background: "Webアプリの学習のアウトプットのために作成しました。",
        techReason: "モダンなWeb開発のためNext.js, React, TypeScriptを採用しました。ログインやデータベースをまとめて管理するためにFirebseを採用しました。",
        statistics: "",
        techStack: [react, next, typescript, firebase],
        githubUrl: "https://github.com/omuomuMG/Senryu",
        siteUrl: "https://senryu-bice.vercel.app/"
    },
];
