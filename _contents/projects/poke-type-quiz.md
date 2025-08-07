---
title: "ポケモン タイプ相性クイズ"
date: "2025-08-03"
image: "/portfolio/poke-type-quiz_image.png"
description: "React, TypeScript, Viteを採用し、品質保証とCI/CDの自動化に注力したインタラクティブなクイズアプリ。Framer Motionによるアニメーションも特徴です。"
github: "https://github.com/shou-dev19/poke-type-quiz"
demo: "https://poke-type-quiz.vercel.app"
architectureImage: "/portfolio/poke-quiz/poke_quiz_arch.png"
deployFlowImage: "/portfolio/poke-quiz/poke_quiz_cicd.png"
---

## 概要

ポケモンのタイプ相性を楽しく学べる、インタラクティブなクイズアプリケーションです。
「かんたん」「ふつう」「むずかしい」の3段階の難易度を選択でき、リアルタイムのアニメーションや視覚的なエフェクトで学習をサポートします。
妻がポケモンのタイプ相性をなかなか覚えてくれないので、暇なときに勉強してもらおうと思い作成しました。

## アピールポイント

### 1. 包括的な品質保証とCI/CDの自動化

- **テスト戦略:** `Vitest`による単体テスト、`React Testing Library`によるコンポーネントテスト、`Playwright`によるE2Eテストを導入し、テストカバレッジ80%以上を達成しました。
- **CI/CDパイプライン:** GitHub Actionsを用いて5つのワークフローを構築。コードのプッシュをトリガーに、静的解析、脆弱性スキャン、テスト、ビルド、デプロイまでを完全に自動化しました。
- **パフォーマンス監視:** `Lighthouse CI`をパイプラインに組み込み、Lighthouseスコア90点以上を常に維持する体制を構築しました。

### 2. モダンなフロントエンド技術の活用

- **高速な開発体験:** ビルドツールに`Vite`を採用し、高速なHMR（ホットモジュールリプレイスメント）を実現しました。
- **宣言的なアニメーション:** `Framer Motion`を用いて、攻撃や結果表示などのアニメーションを宣言的に実装し、ユーザー体験を向上させました。
- **効率的なスタイリング:** `Tailwind CSS`と`shadcn/ui`を導入し、ユーティリティファーストなアプローチで効率的にレスポンシブUIを構築しました。

## 使用技術

- **フロントエンド:** React 18, TypeScript, Vite
- **UI/スタイリング:** Tailwind CSS, shadcn/ui, Radix UI, Framer Motion
- **テスト:** Vitest, React Testing Library, Playwright
- **CI/CD:** GitHub Actions, Vercel
- **静的解析/監査:** ESLint, TypeScript, Snyk, CodeQL
