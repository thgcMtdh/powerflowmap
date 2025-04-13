# powerflowmap_backend

「基幹送電線潮流実績可視化サイト」のバックエンド。潮流実績データを返すAPIを提供する。実績データがない場合はOCCTOシステムからデータのスクレイピングを行う。将来的には基幹送電線以外のデータも返せるAPIを整備することを目論んでいる。

## API仕様

### 共通仕様

#### エリアコード一覧表

|area|エリア名|
|--- |---|
|  1 |北海道|
|  2 |東北|
|  3 |東京|
|  4 |中部|
|  5 |北陸|
|  6 |関西|
|  7 |中国|
|  8 |四国|
|  9 |九州|
| 10 |沖縄|

### 地内基幹送電線潮流実績

#### 概要

30分毎の地内基幹送電線潮流実績をCSV形式で取得する

#### エンドポイント

```
https://powerflowmap.shikiblog.link/api/chinaiKikanJisseki.php?area=xxx&date=xxx
```
- メソッド: `GET`
- クエリ:
  - `area`: 電力エリア. エリアコード一覧表に書かれた整数値のみ受け付ける
  - `date`: ダウンロードしたい日付を指定する. YYYYmmdd の8桁で入力する. 未来の日付は指定できない。また、データ更新に1～2分のタイムラグがあるため、指定日当日の0:00～0:02は指定できない

#### 実行例

東京エリアの、2025/4/1の地内基幹送電線潮流実績を取得したい

```
https://powerflowmap.shikiblog.link/api/chinaiKikanJisseki.php?area=3&date=20250401
```

#### レスポンス

UTF-8 エンコーディングの CSVファイルを返す


## 開発者向け

### ファイル構成

すべて `api` フォルダ配下にまとめている。ウェブサーバに変更を反映する際は、サーバに `api/chinaiKikanJisseki.php` をアップロードする

```
/ (document root)
├ api/
| ├ chinaiKikanJisseki.php
  └ data/
    └ chinaiKikanJisseki/
      ├ ここにCSVデータが溜まっていく
```

### 環境構築

PHPの開発環境が必要。筆者は Windows 環境で XAMPP + VSCode を導入している
