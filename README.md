# Courses

GitHub Pages で公開しているプログラミング講座サイトです。

**公開 URL: https://zackey2414.github.io/courses/**

## 概要

Python 既習者を対象に、新しい言語を体系的に学べる講座を公開しています。各講座は 入門 / 初級 / 中級 / 上級 の 4 レベル構成で、解説 + 演習問題で構成されています。

## 収録コース

### 🔥 Mojo

Python の使いやすさと C++ 級の高速性を両立する次世代言語。AI/ML 開発向け。

| レベル | 目的 | ページ |
| --- | --- | --- |
| 入門 | 全体像と基本文法の把握 | [mojo/](https://zackey2414.github.io/courses/mojo/) |
| 初級 | CLI アプリを作れるようになる | [mojo/beginner.html](https://zackey2414.github.io/courses/mojo/beginner.html) |
| 中級 | 実務レベルの最適化・設計 | [mojo/intermediate.html](https://zackey2414.github.io/courses/mojo/intermediate.html) |
| 上級 | メタプログラミング・GPU・ライブラリ実装 | [mojo/advanced.html](https://zackey2414.github.io/courses/mojo/advanced.html) |

## 構成

```
courses/
├── index.html          # ランディングページ（言語一覧）
├── assets/style.css    # ランディング用 CSS
└── mojo/               # Mojo コース（各レベル 1 HTML）
    ├── index.html      # 入門
    ├── beginner.html   # 初級
    ├── intermediate.html
    └── advanced.html
```

各講座ページは依存なしの単一 HTML で完結しています（React は CDN 経由）。ローカルで開くにはブラウザでそのまま HTML ファイルを開くだけで動きます。

## 方針

- **対象**: Python 既習者。他言語との差分を中心に解説。
- **レベル分け**: 入門 → 初級 → 上級まで、各レベル 50 時間以上相当の情報量を目安。
- **品質**: 教材作成前に公式ドキュメントを確認し、バージョンをフッターに明記。
- **デザイン**: 紫系グラデーション基調、Noto Sans JP + JetBrains Mono。

## ローカルで動かす

```sh
python3 -m http.server 8000
# → http://localhost:8000/
```

## 貢献

フィードバック・誤記指摘は Issue / PR どちらでも歓迎です。
