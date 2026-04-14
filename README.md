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

### ⚙️ C言語

すべての現代言語の土台。ポインタ・メモリ管理・システムプログラミングを習得。

| レベル | 目的 | ページ |
| --- | --- | --- |
| 入門 | コンパイル・変数・ポインタ入門・構造体・ファイルI/O | [c/](https://zackey2414.github.io/courses/c/) |
| 初級 | タスク管理CLIを段階実装（malloc・連結リスト・関数ポインタ） | [c/beginner.html](https://zackey2414.github.io/courses/c/beginner.html) |
| 中級 | BST・ハッシュマップ・POSIX・pthreads・ソケット通信 | [c/intermediate.html](https://zackey2414.github.io/courses/c/intermediate.html) |
| 上級 | 字句解析・カーネルモジュール・GC実装・ELFバイナリ | [c/advanced.html](https://zackey2414.github.io/courses/c/advanced.html) |

### ⚡ C++

オブジェクト指向・テンプレート・STL・マルチスレッドを体系的に習得。

| レベル | 目的 | ページ |
| --- | --- | --- |
| 入門 | クラス・継承・テンプレート・STL・スマートポインタの基礎 | [cpp/](https://zackey2414.github.io/courses/cpp/) |
| 初級 | TodoアプリをSTL・ファイルI/O・演算子オーバーロードで段階実装 | [cpp/beginner.html](https://zackey2414.github.io/courses/cpp/beginner.html) |
| 中級 | TMP・マルチスレッド・デザインパターン・ソケット・パフォーマンスチューニング | [cpp/intermediate.html](https://zackey2414.github.io/courses/cpp/intermediate.html) |
| 上級 | コンパイラ・GC実装・C++20コルーチン・コンセプト・SIMD・ABI設計 | [cpp/advanced.html](https://zackey2414.github.io/courses/cpp/advanced.html) |

### 🦀 Rust

メモリ安全性とゼロコスト抽象化を両立する次世代システム言語。

| レベル | 目的 | ページ |
| --- | --- | --- |
| 入門 | 所有権・借用・Option/Result・enum/match・trait・コレクション | [rust/](https://zackey2414.github.io/courses/rust/) |
| 初級 | clap・serde・thiserror・anyhowでCLIタスクマネージャを段階実装 | [rust/beginner.html](https://zackey2414.github.io/courses/rust/beginner.html) |
| 中級 | async/tokio・axum・sqlx・マクロ・unsafe・WebAssembly | [rust/intermediate.html](https://zackey2414.github.io/courses/rust/intermediate.html) |
| 上級 | proc-macro・Future内部実装・no_std・SIMD・GAT・typestateパターン | [rust/advanced.html](https://zackey2414.github.io/courses/rust/advanced.html) |

### 🐹 Go

シンプルな文法・高速コンパイル・強力な並行処理を備えたGoogleのシステム言語。

| レベル | 目的 | ページ |
| --- | --- | --- |
| 入門 | goroutine・channel・interface・エラーハンドリング・モジュール・ジェネリクスの基礎 | [go/](https://zackey2414.github.io/courses/go/) |
| 初級 | cobra・viper・encoding/jsonでCLIタスクマネージャを段階実装 | [go/beginner.html](https://zackey2414.github.io/courses/go/beginner.html) |
| 中級 | go-chi・pgx・gRPC・Prometheus・OpenTelemetry・Docker・Kubernetes | [go/intermediate.html](https://zackey2414.github.io/courses/go/intermediate.html) |
| 上級 | GMPスケジューラ・GC内部・cgo・Wasm・PGO・kubebuilder・Raft | [go/advanced.html](https://zackey2414.github.io/courses/go/advanced.html) |

### ☕ Java

Webからモバイル・エンタープライズまで幅広く使われる静的型付けOOP言語。

| レベル | 目的 | ページ |
| --- | --- | --- |
| 入門 | JVM・OOP・ジェネリクス・Stream API・ファイルI/O・ビルドツールの基礎 | [java/](https://zackey2414.github.io/courses/java/) |
| 初級 | Maven・picocli・JacksonでCLIタスクマネージャを段階実装 | [java/beginner.html](https://zackey2414.github.io/courses/java/beginner.html) |
| 中級 | Spring Boot・JPA・REST API・セキュリティ・テスト | [java/intermediate.html](https://zackey2414.github.io/courses/java/intermediate.html) |
| 上級 | JVM内部・リアクティブ・GraalVM・パフォーマンス・ライブラリ設計 | [java/advanced.html](https://zackey2414.github.io/courses/java/advanced.html) |

## 構成

```
courses/
├── index.html          # ランディングページ（言語一覧）
├── assets/style.css    # ランディング用 CSS
├── mojo/               # Mojo コース（各レベル 1 HTML）
├── c/                  # C言語コース
├── cpp/                # C++ コース
├── rust/               # Rust コース
├── go/                 # Go コース
└── java/               # Java コース（作成中）
```

各講座ページは依存なしの単一 HTML で完結しています（React は CDN 経由）。ローカルで開くにはブラウザでそのまま HTML ファイルを開くだけで動きます。

## 方針

- **対象**: Python 既習者。他言語との差分を中心に解説。
- **レベル分け**: 入門 → 初級 → 中級 → 上級まで、各レベル 50 時間以上相当の情報量を目安。
- **品質**: 教材作成前に公式ドキュメントを確認し、バージョンをフッターに明記。
- **デザイン**: mojo/C のフォーマットを基準とした単一HTMLページ（Babel不使用、plain React）。

## ローカルで動かす

```sh
python3 -m http.server 8000
# → http://localhost:8000/
```

## 留意

このサイトはあくまで個人（zackey2414）学習用です。内容の正確性は保証できませんが、間違いを発見されたらぜひissueなどでご指摘ください。
このサイトおよび教材はClaude Code Sonnet 4.6 で作成されています。
