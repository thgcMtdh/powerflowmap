# powerflowmap_ui

「基幹送電線潮流実績可視化サイト」のフロントエンド。潮流の取得、計算、描画を行う。

[grid-api](https://github.com/thgcMtdh/grid-api.git) から基幹送電線潮流実績CSVファイルを取得し、SVGを動的に描画、可視化している。

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### 開発用バックエンドとの接続

ローカルで開発用のバックエンドを立てている場合、 vite.config.js の proxy 設定内にあるポート番号を、開発用バックエンドのポートに書き換える
