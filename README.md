# 🛍 Simple Shopping Cart App

このプロジェクトは、React + TypeScript + Tailwind CSS を使用して構築されたシンプルなショッピングカートアプリです。商品一覧、詳細ページ、カート管理、チェックアウト機能を備えています。

---

## 🚀 使用技術

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Context API](https://reactjs.org/docs/context.html)

---

## 🖼️ アプリの画面例

![ホーム画面](スクリーンショット_24-9-2025_53449_localhost)

## 📁 フォルダ構成

src/ 
├── components/ # UIコンポーネント群
│ ├── ProductList.tsx
│ ├── ProductDetail.tsx
│ ├── Cart.tsx
│ └── Checkout.tsx
├── context/ # グローバル状態管理（Context）
│ └── CartContext.tsx
├── data/ # 商品データと型定義
│ └── data.ts
├── App.tsx # ルーティングとレイアウト
├── index.js # エントリーポイント
└── index.css

## 📦 セットアップ手順

```bash
# リポジトリをクローン
git clone https://github.com/kazu-b157ztomu/shopping-cart-app.git
cd shopping-cart-app

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev


🧪 主な機能
・商品一覧表示

・商品詳細ページ

・カートへの追加・削除・数量変更

・合計金額の計算

・チェックアウトフォーム（バリデーション付き）

・グローバルなカート状態管理（Context API）

📄 ライセンス
MIT License

🙌 作者
Created by kazu-b157ztomu