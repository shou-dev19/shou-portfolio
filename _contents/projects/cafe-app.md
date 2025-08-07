---
title: "Flutter Cafe App"
date: "2024-07-25"
image: "/portfolio/flutter-cafe-app_image.png"
description: "FlutterとAWSサーバーレスアーキテクチャで構築したサンプルカフェアプリです。"
github: "https://github.com/shou-dev19/flutter-cafe-app-ai"
demo: "https://d2nh2abk1vdbtw.cloudfront.net"
architectureImage: "/portfolio/cafe-app/aws_user_flow.png"
deployFlowImage: "/portfolio/cafe-app/ci_cd_workflow.png"
---
# Flutter Cafe App - ポートフォリオ

## 1. プロジェクト概要

このアプリケーションは、Flutterによるフロントエンド開発と、AWS上でのサーバーレスアーキテクチャ構築のスキルを証明するために作成したサンプルカフェアプリです。

### 主な機能

- カフェのメニュー一覧の表示
- カテゴリ（例: コーヒー, 紅茶, フード）によるメニューの絞り込み
- ショッピングカートへの商品の追加・削除
- カート内の合計金額の表示

## 2. 技術スタック

- **フロントエンド:** Flutter (Web)
- **クラウド:** AWS
  - **ホスティング:** Amazon S3
  - **CDN & SSL/TLS:** Amazon CloudFront
  - **CI/CD権限:** AWS IAM (GitHub ActionsとのOIDC連携)
- **インフラ構築:** AWS CLI, Gemini CLI
- **CI/CD:** GitHub Actions
- **テスト:**
  - **ユニット/ウィジェットテスト:** Flutter Test
  - **E2E（エンドツーエンド）テスト:** Cypress

## 3. システムアーキテクチャ

このアプリケーションは、スケーラビリティ、パフォーマンス、コスト効率を重視して設計されたAWSのサーバーレスアーキテクチャ上でホスティングされています。
右記のアーキテクチャ図か[AWS_ARCHITECTURE.md](https://github.com/shou-dev19/flutter-cafe-app-ai/blob/main/docs/AWS_ARCHITECTURE.md)を参照してください。

### CI/CDパイプライン

デプロイプロセスはGitHub Actionsによって完全に自動化されています。

1.  **トリガー:** `main`ブランチへの`push`がワークフローを起動します。
2.  **ビルド:** Flutter Webアプリケーションがビルドされます。
3.  **デプロイ:** ビルドされた静的ファイルがS3バケットに同期されます。
4.  **キャッシュ無効化:** CloudFrontのキャッシュが無効化され、ユーザーが最新のバージョンを確実に受け取れるようにします。

この自動化されたパイプラインにより、迅速で信頼性の高いデプロイが可能です。

## 4. アピールポイントと証明できるスキル

### AWSによるサーバーレスWebホスティング

- 静的ファイルストレージとして**Amazon S3**、CDNとして**Amazon CloudFront**を利用し、スケーラブルなホスティング環境を構築・設定しました。
- CloudFrontのデフォルト証明書を利用して、安全な通信のためのHTTPSを実装しました。
- デフォルトルートオブジェクト（`index.html`）を設定することで、ユーザー体験を向上させました。

### CI/CDパイプラインの完全自動化

- FlutterアプリのビルドからAWSへのデプロイまで、プロセス全体を自動化するGitHub Actionsワークフローを作成しました。
- これにより、最新のDevOpsプラクティスへの理解と、効率的な開発サイクルを構築する能力を証明できます。

### CI/CDのためのセキュアでモダンな認証

- **OpenID Connect (OIDC)** を活用し、GitHub ActionsがAWSの**IAMロール**を安全に引き受けることを許可しました。
- このアプローチにより、有効期間の長いAWSアクセスキーをGitHub Secretsとして保存する必要がなくなり、セキュリティが大幅に向上します。

### CLIツールによるインフラ構築の半自動化

- **AWS CLI**と**Gemini CLI**を活用し、AWSリソース（S3, IAMロールなど）の作成を半自動化しました。
- このアプローチは、コードを通じてクラウドインフラを効率的に管理・プロビジョニングする能力、すなわちInfrastructure as Code (IaC) の基本原則を実践していることを示します。

### 包括的なテスト戦略

- Flutterの**ユニットテスト**と**ウィジェットテスト**を実装し、個々のコンポーネントが正しく機能することを確認しました。
- **CypressによるE2Eテスト**を導入し、エンドユーザー視点での重要なフロー（例: カートへの商品追加、メニューの絞り込み）を検証することで、アプリケーション全体の高い品質を確保しました。