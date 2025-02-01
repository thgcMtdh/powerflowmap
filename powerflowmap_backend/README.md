# powerflowmap_backend

「基幹送電線潮流実績可視化サイト」管理用のスクリプト。OCCTOサイトからデータを取得し、サーバー上のデータをFTPで更新する。フロントエンドをデバッグするためのテストサーバーも含んでいる。

## 初期設定

`powerflowmap_backend/` ディレクトリ直下に手動で `.env` ファイルを作成し、潮流データの保存先ディレクトリを以下のように記述する。

```
LOCAL_DATA_DIR=管理用PCのデータ保存先ディレクトリの絶対パス
SERVER_DATA_DIR=サーバー側のデータ保存先ディレクトリの絶対パス
FTP_SERVER=FTP接続用のサーバーアドレス
FTP_USER=FTP接続用のユーザー名
FTP_PASS=FTP接続用のパスワード
```

`LOCAL_DATA_DIR` および `SERVER_DATA_DIR` 配下に、以下のようにエリアごとのフォルダを作成する。ここにダウンロードした潮流データが蓄積されていく。

```
LOCAL_DATA_DIR および SERVER_DATA_DIR/
  ├ tokyo/
  ├ ├ jisseki_tokyo_20240101.csv
  ├ ├ jisseki_tokyo_20240102.csv
  ├ └...
  └ kyushu/
    ├ jisseki_tokyo_20240101.csv
    ├ jisseki_tokyo_20240102.csv
    └...
```

## ファイルの説明

### fetchAndUpdate.sh

- 当日の潮流実績データを取得し、サーバーにアップロードする作業を自動で実施するスクリプト。ユーザーが自分で crontab にこれを登録し、30分ごとに実行する。

### jissekiFetcher.py

- OCCTOのウェブサイトから潮流実績をスクレイピングするPythonスクリプト。
  - 直接CSVを落とすことが出来ないので、スクレイピングを使っている。

### testServer.py

- フロントエンドの開発時に使うデバッグ用のHTTPサーバー。Flaskを使っている。
- `https://localhost:5000/data/tokyo/jisseki_tokyo_20240101.csv` のようにURLを指定すると、`.env` ファイルで記述した `LOCAL_DATA_DIR` の中から潮流実績CSVファイルを返す。
- 開発時にファイルを返すためだけの物なので、別の web server エミュレータが用意できればそちらを使っても構わない。その場合はフロントエンドの vite.config.js 内でプロキシ設定をよしなに書き替えること。

## 開発用サーバーの利用

Python 3.11 (venv を利用) を使います。

#### Python 3.11 のインストール

- [Python環境構築ガイド - python.jp](https://www.python.jp/install/install.html) 等を参考にお使いのOSに合わせて実施

#### 仮想環境の作成と起動

```sh
python3.11 -m venv .venv
source .venv/bin/activate
```

#### パッケージのインストール

```sh
python -m pip install -r requirements.txt
```
