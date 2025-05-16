export interface ContentSummary {
    id: number;
    title?: string;
    contentInfo?: string;
    imageUrl?: string;
}

export interface ContentDetail extends ContentSummary {
    productDescription?: string;
    highlights?: string;
    techReason?: string;
    statistics?: string;
    techStack?: string[];
    downloadUrl?: string;
    githubUrl?: string;
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
        contentInfo: "ワンクリックで翻訳をする",
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
        productDescription: "「Anki-Farm-Tycoon」は、世界中で人気のフラッシュカードアプリAnkiの拡張機能として個人開発したプロダクトです。語学学習を続ける上でAnkiは非常に効率的なツールですが、学習が単調で退屈になりやすく、継続が難しいという課題がありました。そこで「学習そのものを楽しくし、継続性を高めたい」と考え、ゲーム要素（ゲーミフィケーション）を取り入れた拡張機能として開発しました。\n\nAnki-Farm-Tycoonでは、フラッシュカードに正解するたびに農場の動物が成長したり、生産物が増えたり、資産を増やして「億万長者」を目指すという要素を盛り込んでいます。学習の進捗が可視化されることで、ユーザーのモチベーション維持にもつながっています。\n\n使用技術は、PythonとPyQtです。設計のポイントはオブジェクト指向を徹底し、動物や農場、生産物といった要素をクラスで抽象化しました。これにより、今後の機能追加やユーザー要望への対応が容易になっています。また、UIはPyQtで直感的で楽しいユーザー体験を意識して作っています。\n\nリリース後は世界中のユーザーからGitHub Issueやダウンロードページ経由で多くの意見や要望をいただき、迅速に反映しています。1,000ダウンロード以上を達成し、英語学習者を中心に広く利用されています。\n\n今後もユーザーフィードバックを活かしながら、学習をより楽しく継続しやすくするソフトウェアを開発していきたいと考えています。",
        highlights: "ユーザインターフェースを頑張りました",
        techReason: "AnkiでサポートされているのがPythonとPyQtだから",
        statistics: "1200+ ダウンロード",
        techStack: ["Python", "PyQt", "CSS"],
        downloadUrl: "https://ankiweb.net/shared/info/20342773",
        githubUrl: "https://github.com/omuomuMG/Anki-Farm-Tycoon",
    },
    {
        id: 2,
        productDescription: "Ankiのアドオンの英単語の発音記号を自動的に出力するツールです。具体的には、入力された英単語に対して、オープンソースのCMU発音辞書を利用して発音情報を取得し、それを国際音声記号（IPA）に変換して表示します。これにより、ユーザーは英単語とその正確な発音記号を同時に学習でき、より効率的に語彙力を高めることができます。\nAnkiは言語学習者の間で非常に人気のあるアプリですが、発音記号を簡単に確認できる拡張機能はこれまで存在していませんでした。そこで私は、世界中の英語学習者の役に立ちたいという思いからこのプロジェクトを立ち上げました。技術の選定理由としては、Ankiのアドオン開発で推薦されているPython, PyQtを軸に実装をしました。サードパーティライブラリの利用は基本的にできないため、ライブラリなどの力を借りずに限られた環境で開発を行うようにしました。\n現在、この拡張機能は100件以上ダウンロードされており、多くの学習者に利用されています。ユーザーから寄せられたフィードバックを積極的に取り入れ、継続的に改善を行っている点も、このプロジェクトの強みのひとつです。",
        highlights: "発音記号を自動生成する独自ロジックを実装",
        techReason: "Ankiアドオン開発の推奨技術であるPython, PyQtを採用",
        statistics: "100+ ダウンロード",
        techStack: ["Python", "PyQt", "CSS"],
        downloadUrl: "https://ankiweb.net/shared/info/2075109613?cb=1735716386693",
        githubUrl: "https://github.com/omuomuMG/Pronounce-Symbol-Generator",
    },
    {
        id: 3,
        productDescription: "翻訳をワンクリックで行うことができるAnkiのアドオンです。DeepLとGoogle翻訳のAPIを利用して、選択したテキストを即座に翻訳します。これにより、学習中の単語やフレーズをすぐに理解でき、効率的な学習が可能になります。\n\nこのアドオンは特に語学学習者にとって便利で、Ankiのフラッシュカードを使用している際に、わからない単語やフレーズが出てきた場合にすぐに翻訳結果を得ることができます。これにより、学習の流れを中断することなく、スムーズに進めることができます。\n\n使用技術はPythonとPyQtで、シンプルで直感的なUIを提供しています。サードパーティライブラリとしては、DeepLライブラリ、google-api-python-clientライブラリ、dateutilを使用しています。Ankiでは、サードパーティのライブラリのサポートがないです。そのため最低限のライブラリを使い、ライブラリと共に配布しています。",
        highlights: "DeepLとGoogle翻訳APIを両方サポート",
        techReason: "多言語対応とAPI連携のためPython, PyQtを採用",
        statistics: "Comming Soon",
        techStack: ["Python", "PyQt", "CSS"],
        downloadUrl: "https://ankiweb.net/shared/info/259448931",
        githubUrl: "https://github.com/omuomuMG/DeepL-and-Google-Translator",
    },
    {
        id: 4,
        productDescription: "今日の思いを川柳に込めて投稿できるWebアプリです。ユーザーは日々の出来事や感じたことを川柳として投稿し、他のユーザーと共有できます。Next.jsとReact、TypeScriptを用いて開発されており、直感的なUIとリアルタイムな投稿機能が特徴です。",
        highlights: "リアルタイム投稿・表示機能を実装",
        techReason: "モダンなWeb開発のためNext.js, React, TypeScriptを採用",
        statistics: "",
        techStack: ["Next.js", "React", "TypeScript"],
        githubUrl: "https://github.com/omuomuMG/Senryu",
    },
];
